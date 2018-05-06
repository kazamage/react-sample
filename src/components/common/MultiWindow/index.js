import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import GoldenLayout from 'golden-layout';
import _ from 'lodash';
import { saveLocalStorage, loadLocalStorage, removeLocalStorage, delayRun } from '@/utils';
import 'golden-layout/src/css/goldenlayout-base.css';
// import 'golden-layout/src/css/goldenlayout-dark-theme.css';
// import 'golden-layout/src/css/goldenlayout-light-theme.css';
import 'golden-layout/src/css/goldenlayout-soda-theme.css';
// import 'golden-layout/src/css/goldenlayout-translucent-theme.css';
import './index.css';

const isInitialised = manager => {
  return manager.isInitialised;
};

const isInitialisedWithPopout = manager => {
  return isInitialised(manager) &&
    manager.openPopouts.every(popout => popout.isInitialised);
};

const isEmptyConfig = config => {
  if (config == null) {
    return true;
  }
  const { content, openPopouts } = config;
  return _.isEmpty(content) && _.isEmpty(openPopouts);
};

const getComponents = manager => {
  if (manager == null || !isInitialised(manager)) {
    return [];
  }
  const [contentItem] = manager.root.contentItems;
  if (contentItem == null) {
    return [];
  }
  return contentItem.getItemsByType('component');
};

const findComponents = (manager, name) => {
  const components = getComponents(manager);
  return components.filter(component => component.config.component === name);
};

const getPopouts = manager => {
  if (manager == null || !isInitialisedWithPopout(manager)) {
    return [];
  }
  return manager.openPopouts;
};

const findPopouts = (manager, name) => {
  const popouts = getPopouts(manager);
  return popouts.filter(popout => {
    const [content] = popout.toConfig().content;
    return content.component === name;
  });
};

export default class MultiWindow extends PureComponent {

  componentDidMount() {
    const {
      config: initConfig,
      storageKey,
      eventEmitter,
      onChangeStorageKey,
    } = this.props;
    const storedConfig = this.load(storageKey);
    let config;
    if (isEmptyConfig(storedConfig)) {
      config = initConfig;
    } else {
      config = storedConfig;
    }
    delayRun(() => {
      this.create(config, storageKey);
      if (onChangeStorageKey) {
        this.getOpenWindowsAsync()
          .then(windowItems => {
            onChangeStorageKey(windowItems);
          });
      }
      if (eventEmitter) {
        eventEmitter.on('resize', this.updateSize);
      }
      window.addEventListener('resize', this.updateSize);
    });
  }

  componentWillUnmount() {
    const { eventEmitter } = this.props;
    window.removeEventListener('resize', this.updateSize);
    if (eventEmitter) {
      eventEmitter.off('resize', this.updateSize);
    }
    this.manager.destroy();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { storageKey, onChangeStorageKey } = this.props;
    if (storageKey !== prevProps.storageKey) {
      const storedConfig = this.load(storageKey);
      let config;
      if (isEmptyConfig(storedConfig)) {
        this.remove(storageKey);
        config = {
          ...this.props.config,
          ...{ content: [{ type: 'row', content: [] }] },
        };
      } else {
        config = storedConfig;
      }
      delayRun(() => {
        this.manager.destroy();
        this.create(config, storageKey);
        if (onChangeStorageKey) {
          this.getOpenWindowsAsync()
            .then(windowItems => {
              onChangeStorageKey(windowItems);
            });
        }
      });
    }
  }

  render() {
    const { theme = '' } = this.props;
    const className = `mw-wrapper ${theme}`.trim();
    return (
      <div className={className}>
        <div className="mw-main" ref={node => this.node = node} />
      </div>
    );
  }

  updateSize = () => this.manager.updateSize()

  getOpenWindowsAsync = () => {
    return delayRun(() => {
      const windows = getComponents(this.manager).map(component => component.config);
      return windows.concat(getPopouts(this.manager).map(popout => {
        const [content] = popout.toConfig().content;
        return content;
      }));
    });
  }

  create = (config, storageKey) => {
    const {
      components,
      wrapper = component => component,
    } = this.props;
    this.manager = new GoldenLayout(config, this.node);
    components.forEach(({ name, component }) => {
      this.manager.registerComponent(name, wrapper(component));
    });
    this.manager.on('stateChanged', item => {
      if (item != null) {
        this.saveLazy(this.props.storageKey);
      };
    });
    this.manager.on('itemCreated', item => {
      if (item.type === 'component') {
        const { onItemCreated } = this.props;
        if (onItemCreated) {
          onItemCreated(item.config);
        }
      }
    });
    this.manager.on('itemDestroyed', item => {
      if (item.type === 'component') {
        const {
          storageKey: currentStorageKey,
          onItemDestroyed,
        } = this.props;
        if (currentStorageKey === storageKey) {
          this.saveLazy(currentStorageKey);
        }
        if (onItemDestroyed) {
          onItemDestroyed(item.config);
        }
      }
    });
    this.manager.on('windowOpened', item => {
      const { onWindowOpened } = this.props;
      if (onWindowOpened) {
        const [content] = item.toConfig().content;
        onWindowOpened(content);
      }
    });
    this.manager.on('windowClosed', item => {
      const {
        storageKey: currentStorageKey,
        onWindowClosed
      } = this.props;
      if (currentStorageKey === storageKey) {
        this.saveLazy(currentStorageKey);
      }
      const [content] = item.toConfig().content;
      if (onWindowClosed) {
        onWindowClosed(content);
      }
    });
    this.manager.init();
  }

  add = (name, title = name, props = {}) => {
    const { root } = this.manager;
    if (_.isEmpty(root.contentItems)) {
      root.addChild({ type: 'row', content: [] });
    }
    root.contentItems[0].addChild({
      type: 'react-component',
      component: name,
      title: title,
      props,
    });
  }

  toggle = (name, title = name, props = {}) => {
    const popouts = findPopouts(this.manager, name);
    if (!_.isEmpty(popouts)) {
      popouts.forEach(popout => popout.close());
    }
    const components = findComponents(this.manager, name);
    if (_.isEmpty(components) && _.isEmpty(popouts)) {
      this.add(name, title, props);
    } else {
      components.forEach(component => component.remove());
    }
  }

  closeAll = () => {
    this.manager.openPopouts.forEach(popout => popout.close());
    const [contentItem] = this.manager.root.contentItems;
    if (contentItem) {
      const components = contentItem.getItemsByType('component');
      components.forEach(component => component.remove());
    }
  }

  reorder = type => {
    const [oldElement] = this.manager.root.contentItems;
    if (oldElement == null) {
      return;
    }
    const newElement = this.manager.createContentItem({
      type,
      content: [],
    });
    const stacks = oldElement.getItemsByType('stack');
    if (_.isEmpty(stacks)) {
      const components = oldElement.getItemsByType('component');
      components.forEach(component => {
        const stack = this.manager.createContentItem({
          type: 'stack',
          content: [],
        });
        stack.addChild(component);
        stack.isInitialised = true;
        newElement.addChild(stack);
      });
    } else {
      stacks.forEach(stack => newElement.addChild(stack));
    }
    newElement.isInitialised = true;
    this.manager.root.replaceChild(oldElement, newElement);
  }

  reorderRow = () => this.reorder('column')

  reorderCol = () => this.reorder('row')

  load = key => loadLocalStorage(key)

  remove = key => removeLocalStorage(key)

  save = key => saveLocalStorage(key, () => this.manager.toConfig())

  saveLazy = key => {
    delayRun(() => {
      if (isInitialisedWithPopout(this.manager)) {
        this.save(key);
      } else {
        delayRun(_key => this.saveLazy(_key), [key], 200);
      }
    });
  }

}

export const wrapComponent = (Component, store) => {
  class Wrapped extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component {...this.props} />
        </Provider>
      );
    }
  }
  return Wrapped;
};

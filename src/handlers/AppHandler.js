import actions from '@/actions/app';
import BaseHandler from './BaseHandler';

export default class AppHandler extends BaseHandler {

  onDidMountContent = multiWindow => {
    this.dispatch(actions.init(multiWindow));
  }

  handleToggleMenu = collapsed => {
    this.dispatch(actions.toggleMenu(collapsed));
    setTimeout(() => {
      this.eventEmitter.emit('resize');
    }, 500);
  }

  handleToggleMenuItem = ({ item, key, selectedKeys }) => {
    const { component, title, args = {} } = item.props;
    this.state.multiWindow.toggle(component, title, args);
  }

  handleSelectMenuItem = windowItem => {
    this.dispatch(actions.selectMenuItem(windowItem.component));
  }

  handleSelectMenuItems = windowItems => {
    const selectedMenuItems = windowItems.map(item => item.component);
    this.dispatch(actions.selectMenuItems(selectedMenuItems));
  }

  handleDeselectMenuItem = windowItem => {
    this.state.multiWindow.getOpenWindowsAsync()
      .then(windowItems => {
        const { component } = windowItem;
        const components = windowItems.map(item => item.component);
        if (!new Set(components).has(component)) {
          this.dispatch(actions.deselectMenuItem(component));
        }
      });
  }

}

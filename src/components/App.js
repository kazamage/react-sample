import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { Layout, Menu, Modal, Tag, Tooltip } from 'antd';
// import RGL, { WidthProvider } from "react-grid-layout";
import Loadable from 'react-loading-overlay';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PlusSquare from 'react-feather/dist/icons/plus-square';
import Trash2 from 'react-feather/dist/icons/trash-2';
import GridIcon from 'react-feather/dist/icons/grid';
import X from 'react-feather/dist/icons/x';
import MultiWindow from './MultiWindow';
import Home from '@/containers/Home';
import Grid from '@/containers/Grid';
import Spreadsheet from '@/containers/Spreadsheet';
import CandleStickChart from '@/containers/CandleStickChart';
import PieChart from '@/containers/charts/PieChart';
import LineChart from '@/containers/charts/LineChart';
import BarChart from '@/containers/charts/BarChart';
import AreaChart from '@/containers/charts/AreaChart';
import '@/style/App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const { SubMenu } = Menu;
// const ReactGridLayout = WidthProvider(RGL);

const iconWidth = 20;

const Header = props => {
  const {
    multiWindow,
    currentWorkspace,
    defaultWorkspace,
    workspaces,
    onAddWorkspace,
    onSelectWorkspace,
    onRemoveWorkspace,
    onRemoveWorkspaces,
  } = props;
  return (
    <Layout.Header className="header">
      <div className="title">React Sample</div>
      <div className="header-items">
        <div className="workspace-group">
          <Tag
            className={classNames({
              active: currentWorkspace === defaultWorkspace.name,
            })}
            onClick={() => onSelectWorkspace(defaultWorkspace)}
          >
            {defaultWorkspace.name}
          </Tag>
          {workspaces.map(workspace => {
            return (
              <Tag
                key={workspace.index}
                closable={true}
                className={classNames({
                  active: currentWorkspace === workspace.name,
                })}
                onClick={() => onSelectWorkspace(workspace)}
                onClose={() => onRemoveWorkspace(workspace)}
              >
                {workspace.name}
              </Tag>
            );
          })}
        </div>
        <div className="link-group">
          <div>
            <Tooltip title="Add new workspace">
              <a onClick={onAddWorkspace}>
                <PlusSquare size={iconWidth} />
              </a>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Clear all workspace">
              <a onClick={onRemoveWorkspaces}>
                <Trash2 size={iconWidth} />
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="link-group">
          <div>
            <Tooltip title="Reorder row">
              <a onClick={() => multiWindow.reorderRow()}>
                <GridIcon size={iconWidth} />
              </a>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Reorder column">
              <a onClick={() => multiWindow.reorderCol()}>
                <GridIcon size={iconWidth} />
              </a>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Close all window">
              <a onClick={() => multiWindow.closeAll()}>
                <X size={iconWidth} />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </Layout.Header >
  );
};

const SideMenu = props => {
  const {
    selectedItems,
    menuCollapsed,
    onToggleMenu,
    onSelectMenuItem,
    onDeselectMenuItem,
  } = props;
  return (
    <Layout.Sider
      collapsible
      collapsed={menuCollapsed}
      onCollapse={onToggleMenu}
    >
      <Menu
        theme="dark"
        mode="inline"
        multiple={true}
        selectedKeys={selectedItems}
        onSelect={onSelectMenuItem}
        onDeselect={onDeselectMenuItem}
      >
        <Menu.Item key="Home" title="Home" component="Home">
          <FontAwesomeIcon icon="home" className="anticon" />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key="Grid" title="Grid" component="Grid">
          <FontAwesomeIcon icon="th" className="anticon" />
          <span>Grid</span>
        </Menu.Item>
        <Menu.Item key="Spreadsheet" title="Spreadsheet" component="Spreadsheet">
          <FontAwesomeIcon icon="table" className="anticon" />
          <span>Spreadsheet</span>
        </Menu.Item>
        <Menu.Item key="CandleStickChart" title="Candle Stick Chart" component="CandleStickChart">
          <FontAwesomeIcon icon="chart-line" className="anticon" />
          <span>Candle Stick Chart</span>
        </Menu.Item>
        <SubMenu
          key="Chats"
          title={
            <Fragment>
              <FontAwesomeIcon icon="chart-bar" className="anticon" />
              <span>Charts</span>
            </Fragment>}
        >
          <Menu.Item key="PieChart" title="Pie Chart" component="PieChart">
            <FontAwesomeIcon icon="chart-pie" className="anticon" />
            <span>Pie Chart</span>
          </Menu.Item>
          <Menu.Item key="LineChart" title="Line Chart" component="LineChart">
            <FontAwesomeIcon icon="chart-line" className="anticon" />
            <span>Line Chart</span>
          </Menu.Item>
          <Menu.Item key="BarChart" title="Bar Chart" component="BarChart">
            <FontAwesomeIcon icon={["far", "chart-bar"]} className="anticon" />
            <span>Bar Chart</span>
          </Menu.Item>
          <Menu.Item key="AreaChart" title="Area Chart" component="AreaChart">
            <FontAwesomeIcon icon="chart-area" className="anticon" />
            <span>Area Chart</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Sider>
  );
};

class Content extends Component {

  // constructor(props) {
  //   super(props);
  //   this.layout = [
  //     { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  //     { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //     { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  //   ];
  // }

  componentDidMount() {
    this.props.onDidMount(this.multiWindow);
  }

  render() {
    const { storageKey } = this.props.workspaces.find(workspace => {
      return workspace.name === this.props.currentWorkspace
    });
    return (
      // <Layout.Content style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      //   <ReactGridLayout className="layout" layout={this.layout} cols={12} rowHeight={30} width={1200}>
      //     <div key="a">a</div>
      //     <div key="b">b</div>
      //     <div key="c">c</div>
      //   </ReactGridLayout>
      // </Layout.Content>
      <MultiWindow
        theme="soda"
        storageKey={storageKey}
        wrapper={this.props.wrapper}
        eventEmitter={this.props.eventEmitter}
        onWindowOpened={this.props.onWindowOpened}
        onWindowClosed={this.props.onWindowClosed}
        onItemCreated={this.props.onItemCreated}
        onItemDestroyed={this.props.onItemDestroyed}
        onChangeStorageKey={this.props.onChangeStorageKey}
        ref={multiWindow => this.multiWindow = multiWindow}
        config={{ content: [{ type: 'row', cotent: [] }] }}
        components={[
          { name: 'Home', component: Home },
          { name: 'Grid', component: Grid },
          { name: 'Spreadsheet', component: Spreadsheet },
          { name: 'CandleStickChart', component: CandleStickChart },
          { name: 'PieChart', component: PieChart },
          { name: 'LineChart', component: LineChart },
          { name: 'BarChart', component: BarChart },
          { name: 'AreaChart', component: AreaChart },
        ]}
      />
    );
  }

}

const App = props => {
  const {
    modal,
    workspaces,
    currentWorkspace,
    defaultWorkspace,
    handleToggleMenuItem,
    handleSelectMenuItem,
    handleDeselectMenuItem,
  } = props;
  const { body: modalBody, ...modalRest } = modal;

  return (
    <Loadable
      spinner
      animate={false}
      active={props.loading}
      text='Loading...'
      zIndex={1010}
      className="loading-overlay"
    >
      <Layout>
        <Header
          multiWindow={props.multiWindow}
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
          defaultWorkspace={defaultWorkspace}
          onAddWorkspace={props.handleAddWorkspace}
          onSelectWorkspace={props.handleSelectWorkspace}
          onRemoveWorkspace={props.handleRemoveWorkspace}
          onRemoveWorkspaces={props.handleRemoveWorkspaces}
        />
        <Layout>
          <SideMenu
            selectedItems={props.selectedItems}
            menuCollapsed={props.menuCollapsed}
            onToggleMenu={props.handleToggleMenu}
            onSelectMenuItem={handleToggleMenuItem}
            onDeselectMenuItem={handleToggleMenuItem}
          />
          <Layout>
            <Content
              eventEmitter={props.eventEmitter}
              currentWorkspace={currentWorkspace}
              wrapper={props.wrappedComponentWithStore}
              workspaces={[defaultWorkspace].concat(workspaces)}
              onDidMount={props.onDidMountContent}
              onWindowOpened={handleSelectMenuItem}
              onWindowClosed={handleDeselectMenuItem}
              onItemCreated={handleSelectMenuItem}
              onItemDestroyed={handleDeselectMenuItem}
              onChangeStorageKey={props.handleSelectMenuItems}
            />
          </Layout>
        </Layout>
      </Layout>
      <Modal {...modalRest}>{modalBody}</Modal>
    </Loadable>
  );
};

export default App;

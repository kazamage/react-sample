import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory';
import { LocaleProvider } from 'antd';
import { jaJP } from 'antd/lib/locale-provider/ja_JP';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import store from './store';
import actions from './actions';
import App from './containers/App';
import { WORKSPACE_INFO_KEY, loadLocalStorage } from './utils';
import './style/index.css';
import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(solid, regular, brands);

const history = createHistory();

const workspaceInfo = loadLocalStorage(WORKSPACE_INFO_KEY) || {};
store.dispatch(actions.init(workspaceInfo));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={jaJP}>
        <App />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

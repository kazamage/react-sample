import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import EventEmitter from '@/components/common/EventEmitter';
import actions from '@/actions';
import { APP_KEY } from '@/utils';
import app from './app';
import home from './home';
import grid from './grid';
import spreadsheet from './spreadsheet';
import candlestickchart from './candlestickchart';
import piechart from './charts/piechart'
import barchart from './charts/barchart';
import linechart from './charts/linechart';
import areachart from './charts/areachart';

const initialState = {
  loading: false,
  disabled: false,
  modal: {
    visible: false,
    title: null,
    body: null,
  },
  eventEmitter: new EventEmitter(),
  defaultWorkspace: {
    name: 'default',
    storageKey: `${APP_KEY}.workspace-default`,
    index: 0
  },
};

const rootReducer = combineReducers({
  root: handleActions({
    [actions.init]: (state, action) => {
      const {
        currentWorkspace = 'default',
        workspaces = [],
      } = action.payload;
      return Object.assign({}, state, {
        currentWorkspace,
        workspaces,
      });
    },
    [actions.mask]: (state, action) => {
      return Object.assign({}, state, {
        loading: true,
        disabled: true,
      });
    },
    [actions.unmask]: (state, action) => {
      return Object.assign({}, state, {
        loading: false,
        disabled: false,
      });
    },
    [actions.showModal]: (state, action) => {
      return Object.assign({}, state, {
        modal: {
          ...action.payload,
          ...{ visible: true },
        },
      });
    },
    [actions.hideModal]: (state, action) => {
      return Object.assign({}, state, {
        modal: _.cloneDeep(initialState.modal),
      });
    },
    [actions.addWorkspace]: (state, action) => {
      const indexies = new Set(
        state.workspaces.map(workspace => workspace.index)
      );
      const found = [...Array(indexies.size)]
        .map((_, i) => i + 1)
        .find(i => !indexies.has(i));
      let index;
      if (found) {
        index = found;
      } else if (indexies.size === 0) {
        index = 1;
      } else {
        index = Math.max(...indexies) + 1;
      }
      const newWorkspace = {
        name: `workspace-${index}`,
        storageKey: `${APP_KEY}.workspace-${index}`,
        index,
      };
      const workspaces = _.sortBy(
        [newWorkspace].concat(state.workspaces),
        workspace => workspace.index
      );
      return Object.assign({}, state, {
        workspaces,
      });
    },
    [actions.selectWorkspace]: (state, action) => {
      const found = [state.defaultWorkspace].concat(state.workspaces)
        .find(workspace => workspace.name === action.payload.name);
      return Object.assign({}, state, {
        currentWorkspace: found == null ? 'default' : found.name,
      });
    },
    [actions.removeWorkspace]: (state, action) => {
      const workspaces = _.sortBy(
        state.workspaces.filter(workspace => workspace.name !== action.payload.name),
        workspace => workspace.index
      );
      const found = workspaces.find(workspace => workspace.name === state.currentWorkspace);
      let currentWorkspace;
      if (found) {
        currentWorkspace = state.currentWorkspace;
      } else {
        currentWorkspace = 'default';
      }
      return Object.assign({}, state, {
        workspaces,
        currentWorkspace,
      });
    },
    [actions.removeWorkspaces]: (state, action) => {
      return Object.assign({}, state, {
        workspaces: [],
        currentWorkspace: 'default',
      });
    },
    [LOCATION_CHANGE]: (state, action) => {
      return Object.assign({}, state, {
        currentPath: action.payload.pathname,
      });
    },
  }, initialState),
  app,
  home,
  grid,
  spreadsheet,
  candlestickchart,
  piechart,
  linechart,
  barchart,
  areachart,
});

export default rootReducer;

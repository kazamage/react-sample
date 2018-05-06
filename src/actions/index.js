import { createAction } from 'redux-actions';

export default {
  init: createAction('@@root/INIT'),
  mask: createAction('@@root/MASK'),
  unmask: createAction('@@root/UNMASK'),
  showModal: createAction('@@root/SHOW_MODAL'),
  hideModal: createAction('@@root/HIDE_MODAL'),
  addWorkspace: createAction('@@root/ADD_WORKSPACE'),
  selectWorkspace: createAction('@@root/SELECT_WORKSPACE'),
  removeWorkspace: createAction('@@root/REMOVE_WORKSPACE'),
  removeWorkspaces: createAction('@@root/REMOVE_WORKSPACES'),
};

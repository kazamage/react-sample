import { notification, message } from 'antd';
import { wrapComponent } from '@/components/MultiWindow';
import store from '@/store';
import actions from '@/actions';
import { MAX_WORKSPACE, WORKSPACE_INFO_KEY, saveLocalStorage } from '@/utils';

export default class BaseHandler {

  constructor(dispatch, namespaces) {
    this.dispatch = dispatch;
    this.namespaces = namespaces;
  }

  get state() {
    const state = this.namespaces.reduce(
      (accum, namespace) => {
        return {
          ...accum,
          ...store.getState()[namespace],
        };
      }, {});
    return state;
  }

  get eventEmitter() {
    return this.state.eventEmitter;
  }

  get actions() {
    return actions;
  }

  message = () => {
    return message;
  }

  wrappedComponentWithStore = component => {
    return wrapComponent(component, store);
  }

  startLoading() {
    this.dispatch(this.actions.mask());
  }

  loadingComplete() {
    this.dispatch(this.actions.unmask());
  }

  success = (message, title = 'Success') => {
    notification['success']({
      message: title,
      description: message,
    });
  }

  info = (message, title = 'Information') => {
    notification['info']({
      message: title,
      description: message,
    });
  }

  warning = (message, title = 'Warning') => {
    notification['warning']({
      message: title,
      description: message,
    });
  }

  error = (message, title = 'Error') => {
    notification['error']({
      message: title,
      description: message,
    });
  }

  showModal = ({ title, body, onOk = this.hideModal, onCancel = this.hideModal }) => {
    this.dispatch(this.actions.showModal({ title, body, onOk, onCancel }));
  }

  hideModal = () => {
    this.dispatch(this.actions.hideModal());
  }

  saveWorkspaceInfo = () => {
    const { currentWorkspace, workspaces } = this.state;
    saveLocalStorage(WORKSPACE_INFO_KEY, () => ({ currentWorkspace, workspaces }));
  }

  handleAddWorkspace = () => {
    if (this.state.workspaces.length + 1 >= MAX_WORKSPACE) {
      this.message().warning(`Up to ${MAX_WORKSPACE} workspaces are allowed.`);
      return;
    }
    this.dispatch(this.actions.addWorkspace());
    this.saveWorkspaceInfo();
  }

  handleSelectWorkspace = workspace => {
    if (this.state.currentWorkspace !== workspace.name) {
      this.dispatch(this.actions.selectWorkspace(workspace));
      this.saveWorkspaceInfo();
    }
  }

  handleRemoveWorkspace = workspace => {
    this.state.multiWindow.remove(workspace.storageKey)
    this.dispatch(this.actions.removeWorkspace(workspace));
    this.saveWorkspaceInfo();
  }

  handleRemoveWorkspaces = () => {
    this.state.workspaces.forEach(workspace => {
      this.state.multiWindow.remove(workspace.storageKey)
    });
    this.dispatch(this.actions.removeWorkspaces());
    this.saveWorkspaceInfo();
  }

}

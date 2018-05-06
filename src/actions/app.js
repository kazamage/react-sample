import { createAction } from 'redux-actions';

export default {
  init: createAction('@@app/INIT'),
  toggleMenu: createAction('@@app/TOGGLE_MENU'),
  selectMenuItem: createAction('@@app/SELECT_MENU_ITEM'),
  selectMenuItems: createAction('@@app/SELECT_MENU_ITEMS'),
  deselectMenuItem: createAction('@@app/DESELECT_MENU_ITEM'),
};

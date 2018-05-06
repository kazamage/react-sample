import { createAction } from 'redux-actions';

export default {
  init: createAction('@@spreadsheet/INIT'),
  destroy: createAction('@@spreadsheet/DESTROY'),
};

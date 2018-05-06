import { createAction } from 'redux-actions';

export default {
  init: createAction('@@barchart/INIT'),
  destroy: createAction('@@barchart/DESTROY'),
};

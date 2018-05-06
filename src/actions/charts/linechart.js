import { createAction } from 'redux-actions';

export default {
  init: createAction('@@linechart/INIT'),
  destroy: createAction('@@linechart/DESTROY'),
};

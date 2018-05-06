import { createAction } from 'redux-actions';

export default {
  init: createAction('@@piechart/INIT'),
  destroy: createAction('@@piechart/DESTROY'),
};

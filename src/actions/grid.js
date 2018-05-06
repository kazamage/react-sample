import { createAction } from 'redux-actions';

export default {
  init: createAction('@@grid/INIT'),
  destroy: createAction('@@grid/DESTROY'),
};

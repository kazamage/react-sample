import { createAction } from 'redux-actions';

export default {
  init: createAction('@@home/INIT'),
  destroy: createAction('@@home/DESTROY'),
};

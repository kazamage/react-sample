import { createAction } from 'redux-actions';

export default {
  init: createAction('@@areachart/INIT'),
  destroy: createAction('@@areachart/DESTROY'),
};

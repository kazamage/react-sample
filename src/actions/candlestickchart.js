import { createAction } from 'redux-actions';

export default {
  init: createAction('@@candlestickchart/INIT'),
  destroy: createAction('@@candlestickchart/DESTROY'),
};

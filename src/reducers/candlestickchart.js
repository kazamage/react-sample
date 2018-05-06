import * as _ from 'lodash';
import { handleActions } from 'redux-actions';
import actions from '@/actions/candlestickchart';

const initialState = {
  data: [],
};

export default handleActions({
  [actions.init]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload,
    });
  },
  [actions.destroy]: (state, action) => {
    return _.cloneDeep(initialState);
  },
}, initialState);

import * as _ from 'lodash';
import { handleActions } from 'redux-actions';
import actions from '@/actions/grid';

const initialState = {
};

export default handleActions({
  [actions.init]: (state, action) => {
    return { ...state };
  },
  [actions.destroy]: (state, action) => {
    return _.cloneDeep(initialState);
  },
}, initialState);

import * as _ from 'lodash';
import { handleActions } from 'redux-actions';
import actions from '@/actions/charts/piechart';

const initialState = {
  data: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],
};

export default handleActions({
  [actions.init]: (state, action) => {
    return { ...state };
  },
  [actions.destroy]: (state, action) => {
    return _.cloneDeep(initialState);
  },
}, initialState);

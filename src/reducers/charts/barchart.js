import * as _ from 'lodash';
import { handleActions } from 'redux-actions';
import actions from '@/actions/charts/barchart';

const initialState = {
  data: [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page H', uv: 2090, pv: 8800, amt: 2230 },
    { name: 'Page I', uv: 1990, pv: 5500, amt: 2410 },
    { name: 'Page J', uv: 2490, pv: 2200, amt: 2800 },
    { name: 'Page K', uv: 3190, pv: 3480, amt: 1900 },
    { name: 'Page L', uv: 3220, pv: 7000, amt: 2500 },
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

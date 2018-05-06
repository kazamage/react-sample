import { connect } from 'react-redux';
import CandleStickChart from '@/components/CandleStickChart';
import CandleStickChartHandler from '@/handlers/CandleStickChartHandler';

export default connect(
  ({ root, candlestickchart }) => ({ ...root, ...candlestickchart }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new CandleStickChartHandler(dispatchProps.dispatch, ['root', 'candlestickchart']),
    );
  }
)(CandleStickChart);

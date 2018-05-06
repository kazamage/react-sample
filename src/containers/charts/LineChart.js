import { connect } from 'react-redux';
import LineChart from '@/components/charts/LineChart';
import LineChartHandler from '@/handlers/charts/LineChartHandler';

export default connect(
  ({ root, linechart }) => ({ ...root, ...linechart }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new LineChartHandler(dispatchProps.dispatch, ['root', 'linechart']),
    );
  }
)(LineChart);

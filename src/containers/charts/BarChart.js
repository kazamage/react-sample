import { connect } from 'react-redux';
import BarChart from '@/components/charts/BarChart';
import BarChartHandler from '@/handlers/charts/BarChartHandler';

export default connect(
  ({ root, barchart }) => ({ ...root, ...barchart }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new BarChartHandler(dispatchProps.dispatch, ['root', 'barchart']),
    );
  }
)(BarChart);

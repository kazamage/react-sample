import { connect } from 'react-redux';
import AreaChart from '@/components/charts/AreaChart';
import AreaChartHandler from '@/handlers/charts/AreaChartHandler';

export default connect(
  ({ root, areachart }) => ({ ...root, ...areachart }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new AreaChartHandler(dispatchProps.dispatch, ['root', 'areachart']),
    );
  }
)(AreaChart);

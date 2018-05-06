import { connect } from 'react-redux';
import PieChart from '@/components/charts/PieChart';
import PieChartHandler from '@/handlers/charts/PieChartHandler';

export default connect(
  ({ root, piechart }) => ({ ...root, ...piechart }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new PieChartHandler(dispatchProps.dispatch, ['root', 'piechart']),
    );
  }
)(PieChart);

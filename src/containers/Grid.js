import { connect } from 'react-redux';
import Grid from '@/components/Grid';
import GridHandler from '@/handlers/GridHandler';

export default connect(
  ({ root, grid }) => ({ ...root, ...grid }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new GridHandler(dispatchProps.dispatch, ['root', 'grid']),
    );
  }
)(Grid);

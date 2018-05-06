import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '@/components/App';
import AppHandler from '@/handlers/AppHandler';

export default withRouter(
  connect(
    ({ root, app }) => ({ ...root, ...app }),
    dispatch => ({ dispatch }),
    (stateProps, dispatchProps, ownProps) => {
      return Object.assign({}, ownProps, stateProps,
        new AppHandler(dispatchProps.dispatch, ['root', 'app']),
      );
    }
  )(App)
);

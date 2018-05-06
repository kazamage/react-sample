import { connect } from 'react-redux';
import Home from '@/components/Home';
import HomeHandler from '@/handlers/HomeHandler';

export default connect(
  ({ root, home }) => ({ ...root, ...home }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new HomeHandler(dispatchProps.dispatch, ['root', 'home']),
    );
  }
)(Home);

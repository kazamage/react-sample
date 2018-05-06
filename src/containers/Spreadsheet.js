import { connect } from 'react-redux';
import Spreadsheet from '@/components/Spreadsheet';
import SpreadsheetHandler from '@/handlers/SpreadsheetHandler';

export default connect(
  ({ root, spreadsheet }) => ({ ...root, ...spreadsheet }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps,
      new SpreadsheetHandler(dispatchProps.dispatch, ['root', 'spreadsheet']),
    );
  }
)(Spreadsheet);

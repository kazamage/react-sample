import actions from '@/actions/spreadsheet';
import BaseHandler from './BaseHandler';

export default class SpreadsheetHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

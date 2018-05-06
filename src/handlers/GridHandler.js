import actions from '@/actions/grid';
import BaseHandler from './BaseHandler';

export default class GridHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

import actions from '@/actions/home';
import BaseHandler from './BaseHandler';

export default class HomeHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

import actions from '@/actions/charts/barchart';
import BaseHandler from '@/handlers/BaseHandler';

export default class BarChartHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

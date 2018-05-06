import actions from '@/actions/charts/piechart';
import BaseHandler from '@/handlers/BaseHandler';

export default class PieChartHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

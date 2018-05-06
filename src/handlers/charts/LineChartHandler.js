import actions from '@/actions/charts/linechart';
import BaseHandler from '@/handlers/BaseHandler';

export default class LineChartHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

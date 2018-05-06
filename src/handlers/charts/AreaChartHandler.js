import actions from '@/actions/charts/areachart';
import BaseHandler from '@/handlers/BaseHandler';

export default class AreaChartHandler extends BaseHandler {

  onDidMount = () => {
    this.dispatch(actions.init());
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

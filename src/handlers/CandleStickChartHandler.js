import { tsvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';
import actions from '@/actions/candlestickchart';
import BaseHandler from '@/handlers/BaseHandler';

const parseData = parse => {
  return d => {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
};

const parseDate = timeParse('%Y-%m-%d');

const getData = () => {
  const promiseMSFT = fetch('//rrag.github.io/react-stockcharts/data/MSFT.tsv')
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)))
  return promiseMSFT;
};

export default class CandleStickChartHandler extends BaseHandler {

  onDidMount = () => {
    getData().then(data => {
      this.dispatch(actions.init(data));
    });
  }

  onWillUnmount = () => {
    this.dispatch(actions.destroy());
  }

}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import _ from 'lodash';

const isPercent = value => (
  _.isString(value) && value.indexOf('%') === value.length - 1
);

class ResponsiveContainer extends Component {
  static displayName = 'ResponsiveContainer';
  static propTypes = {
    aspect: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    debounce: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
    debounce: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      containerWidth: -1,
      containerHeight: -1,
    };

    this.handleResize = props.debounce > 0 ?
      _.debounce(this.updateDimensionsImmediate, props.debounce) :
      this.updateDimensionsImmediate;
  }

  /* eslint-disable  react/no-did-mount-set-state */
  componentDidMount() {
    this.mounted = true;

    const size = this.getContainerSize();

    if (size) {
      this.setState(size);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getContainerSize() {
    if (!this.container) { return null; }

    return {
      containerWidth: this.container.clientWidth,
      containerHeight: this.container.clientHeight,
    };
  }

  updateDimensionsImmediate = () => {
    if (!this.mounted) { return; }

    const newSize = this.getContainerSize();

    if (newSize) {
      const { containerWidth: oldWidth, containerHeight: oldHeight } = this.state;
      const { containerWidth, containerHeight } = newSize;

      if (containerWidth !== oldWidth || containerHeight !== oldHeight) {
        this.setState({ containerWidth, containerHeight });
      }
    }
  };

  renderChart() {
    const { containerWidth, containerHeight } = this.state;

    if (containerWidth < 0 || containerHeight < 0) { return null; }

    const { aspect, width, height, maxHeight, children } = this.props;

    if (!isPercent(width) && !isPercent(height)) {
      console.warn(`The width(${width}) and height(${height}) are both fixed numbers, maybe you don't need to use a ResponsiveContainer.`);
    }

    if (aspect != null && aspect <= 0) {
      console.warn(`The aspect(${aspect}) must be greater than zero.`);
    }

    const calculatedWidth = isPercent(width) ? containerWidth : width;
    let calculatedHeight = isPercent(height) ? containerHeight : height;

    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      calculatedHeight = calculatedWidth / aspect;
      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && (calculatedHeight > maxHeight)) {
        calculatedHeight = maxHeight;
      }
    }

    return React.cloneElement(children, {
      width: calculatedWidth,
      height: calculatedHeight,
    });

  }

  render() {
    const { minWidth, minHeight, width, height, maxHeight, id, className } = this.props;
    const style = { width, height, minWidth, minHeight, maxHeight };

    return (
      <div
        id={id}
        className={classNames('recharts-responsive-container', className)}
        style={style}
        ref={(node) => { this.container = node; }}
      >
        {this.renderChart()}
        <ReactResizeDetector ref={el => this.el = el} handleWidth handleHeight onResize={this.handleResize} />
      </div>
    );
  }
}

export default ResponsiveContainer;
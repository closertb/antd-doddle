import React from 'react';
import CodePreview from './CodePreview';
// import * as utils from '../utils';

const DEFAULT_HEIGHT = '550px';
const mobileStyle = {
  width: '375px',
  height: '550px'
};


export default class DemoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intoViewport: true
    };
  }
  getIframe() {
    const { url, mobile, height } = this.props;
    let width = '100%';
    let finHeight = height;
    if (mobile) {
      width = mobileStyle.width;
      finHeight = height || mobileStyle.height;
    }
    finHeight = finHeight || DEFAULT_HEIGHT;
    return (
      <div className="demo-preview-frame">
        <iframe
          title="base"
          srr={url}
          width={width}
          height={finHeight}
          frameBorder="0"
        />
      </div>
    );
  }
  render() {
    const { children, title, content, code, isWide } = this.props;
    const { intoViewport } = this.state;
    return (
      <div className="demo-item">
        <h3 className="demo-title">{title}</h3>
        <div className="demo-desc">{content}</div>
        <div className="demo-preview">
          {isWide && intoViewport ? children : null}
        </div>
        <div className="demo-code">
          <CodePreview title={title}>{code}</CodePreview>
        </div>
      </div>
    );
  }
}

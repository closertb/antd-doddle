import React from 'react';
import ReactDom from 'react-dom';
import * as utils from '../utils';
import DemoItem from './DemoItem';

export default class DemoArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isWide: true };
    this.getDemoComponent = this.getDemoComponent.bind(this);
  }
  getDemoComponent(pageData) {
    if (!pageData.demo) {
      return null;
    }
    const { isWide } = this.state;
    const { utils: { toReactComponent } } = this.props;
    return Object.keys(pageData.demo)
      .map(key => pageData.demo[key])
      .filter(item => !item.meta.hidden)
      .sort((a, b) => a.meta.order - b.meta.order)
      .map((item, i) => {
        const content = toReactComponent(['div'].concat(item.content));

        const shouldPreviewDemo = isWide && !item.meta.url;
        const demoProps = {
          key: i,
          title: item.meta.title,
          content,
          url: item.meta.url,
          mobile: item.meta.mobile,
          code: toReactComponent(item.highlightedCode),
          isWide
        };
        return (
          <DemoItem {...demoProps}>
            {shouldPreviewDemo ? item.preview(React, ReactDom) : null}
          </DemoItem>
        );
      });
  }
  // eslint-disable-next-line class-methods-use-this
  renderSample() {
    return (
      <div className="page-content frame">
        <div className="frame-header">
          what
        </div>
      </div>
    );
  }
  render() {
    const { pageData: page = {}, utils: { toReactComponent } } = this.props;
    const pageData = page.meta ? page : utils.getUniquePageData(page);
    const { meta = {}, content, changelog, api, toc } = pageData;
    const { title, toc: tc } = meta;
    const demoComponent = this.getDemoComponent(pageData);
    const disableToc = tc === false;
    return (
      <div>
        <h1>{title}</h1>
        <div className="page-content markdown">
          {toReactComponent(content)}
        </div>
        {demoComponent &&
          <div className="demo-wrapper">{demoComponent}</div>
        }
        {api &&
        <div className="page-api markdown">
          {toReactComponent(api)}
          {changelog && <div className="page-content markdown">
            {toReactComponent(changelog)}
          </div>}
        </div>}
        {(!toc || toc.length <= 1 || disableToc) ? null : (
          <section className="toc">
            {toReactComponent(toc)}
          </section>
        )}
      </div>);
  }
}

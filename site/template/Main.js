import React from 'react';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';
import DemoArticle from './Content/DemoArticle';
import { normalizeData } from './utils';


export default (props) => {
  const { data } = props;
  // 数据格式化
  normalizeData(data);
  const { themeConfig: config, location: { pathname } } = props;
  const rootPath = process.env.NODE_ENV === 'development' ? '' : config.root;
  // default root path is '/', so the default length is 1, so set the offset to 2
  if (pathname.length < (rootPath.length + 2)) {
    window.location.href = rootPath + config.home;
    return <div>redirect to home</div>;
  }
  return (
    <DocumentTitle title={config.title || 'siteName'}>
      <Layout {...props} data={data} selectedKey={pathname}>
        <DemoArticle {...props} />
      </Layout>
    </DocumentTitle>
  );
};

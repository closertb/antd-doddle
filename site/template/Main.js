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
  return (
    <DocumentTitle title={config.title || 'siteName'}>
      <Layout {...props} data={data} selectedKey={pathname}>
        <DemoArticle {...props} />
      </Layout>
    </DocumentTitle>
  );
};

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideBar';
import '../../static/style';

export default ({ data, themeConfig, children, selectedKey }) => {
  const { siteKey, github, friendLinks } = themeConfig;
  return (
    <div>
      <Header name={siteKey} />
      <div style={{ float: 'left', width: '230px', height: '100%' }}>
        <SideMenu themeConfig={themeConfig} data={data} selectedKey={selectedKey} />
      </div>
      <div style={{ padding: '20px 30px 0 50px', overflow: 'hidden' }} className="document yue">
        {children}
        <Footer friendLink={friendLinks} github={github} />
      </div>
    </div>
  );
};

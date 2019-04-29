import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'; // HashRouter as Router,
import { Layout, Menu, Icon } from 'antd';
import menus from '../configs/menus';
import ExampleTable from './ExampleTable';
import LearnTest from './LearnTest';

const { Header, Sider, Content } = Layout;
export default class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }

  render() {
    const { collapsed } = this.state;
    const hashArr = window.location.hash.split('/');
    const selectedHash = hashArr.length > 1 ? hashArr[1] : 'learnTest';
    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">Know some about React</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedHash]}>
            {Object.keys(menus).map(key => (
              <Menu.Item key={key}>
                <Link to={menus[key].path}>
                  <Icon type={menus[key].icon || 'user'} />
                  <span>{menus[key].name}</span>
                </Link>
              </Menu.Item>))
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact path={menus.renderProps.path} component={ExampleTable} />
              <Route exact path={menus.learnTest.path} component={LearnTest} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

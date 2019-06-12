import React from 'react';
import { Link } from 'bisheng/router';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const DEFUALT_SORTER_TYPE = 'specify';

function characterSorter(a, b) {
  return a.key > b.key;
}

function numberSorter(a, b) {
  return a.meta.order - b.meta.order;
}

const OrderSorter = {
  native: characterSorter,
  specify: numberSorter
};

function getComponentsMenuLink(meta, key) {
  const link = '/'.concat(key);
  return (<Link to={link}>{meta.title}</Link>);
}

function getComponentsMenuItem(menus, sortType = DEFUALT_SORTER_TYPE) {
  const sorter = OrderSorter[sortType];
  return menus.sort(sorter).map(item => (<MenuItem key={item.key}>{getComponentsMenuLink(item.meta, item.key)}</MenuItem>));
}

function getComponentsMenuGroups(data, componentOrder, sortType) {
  const menuGroups = componentOrder.map(category => ({
    category,
    menus: []
  }));
  Object.keys(data).forEach((key) => {
    const curCategory = data[key].meta.category;
    const idx = componentOrder.indexOf(curCategory);

    if (idx !== -1) {
      const menuData = data[key];
      menuData.key = menuData.meta.filename.slice(0, menuData.meta.filename.lastIndexOf('/'));
      menuGroups[idx].menus.push(menuData);
    }
  });

  return menuGroups.map((item) => {
    const { category } = item;
    return (<MenuItemGroup key={category} title={category}>{getComponentsMenuItem(category, sortType)}</MenuItemGroup>);
  });
}

function getComponentsMenuList(data, sortType) {
  const menus = Object.keys(data).map(key => ({
    key: data[key].meta.filename.slice(0, data[key].meta.filename.lastIndexOf('/')),
    ...data[key]
  }));

  return getComponentsMenuItem(menus, sortType);
}

function getArticlesMenu(data) {
  const menuList = Object.keys(data).map(key => ({
    key: data[key].meta.filename.slice(0, data[key].meta.filename.indexOf('.md')),
    ...data[key]
  }));

  return menuList.sort((a, b) => a.meta.order - b.meta.order).map(item => (<MenuItem key={item.key}><Link to={`/${item.key}`}>{item.meta.title}</Link></MenuItem>)
  );
}

export default function ComponentsMenu(props) {
  const { mode = 'inline', data = {}, selectedKey, defaultOpenKeys = ['component'], themeConfig } = props;
  const { compCategoryOrder, compSorterType } = themeConfig;
  const componentDatas = data.packages || data.components || data.src;
  const docs = data.docs || data.guide;
  return (
    // eslint-disable-next-line max-len
    <Menu mode={mode} inlineIndent={40} className="aside-container menu-site" selectedKeys={[selectedKey]} defaultOpenKeys={defaultOpenKeys}>
      {getArticlesMenu(docs)}
      <SubMenu title="组件" key="component">
        {compCategoryOrder ?
          getComponentsMenuGroups(componentDatas, compCategoryOrder, compSorterType) :
          getComponentsMenuList(componentDatas, compSorterType)
        }
      </SubMenu>
    </Menu>
  );
}

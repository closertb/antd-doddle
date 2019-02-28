import React from 'react';
import { Popconfirm } from 'antd';
import { EnhanceTable, WithSearch } from '../../../src/index'; // ../../components
import Search from './SearchBar';
import { searchFields, fields } from './fields';
import Dialog from './HModal';
import Set from './Set';
import Detail from './Detail';

const forkDatas = [{
  id: 1,
  userName: 'Dom',
  userId: 'closertb',
  status: 0,
  applyTime: 1550973288220
}, {
  id: 2,
  userName: 'Simon',
  userId: 'simona',
  status: 1,
  applyTime: 1550973288220
}];
function enhanceComponent(component) {
  return component;
}
export default class ExampleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: 'add',
      detail: {},
      child: Set,
      confirmLoading: false
    };
    this.handleOperate = this.handleOperate.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  getExtraFields() {
    return [
      {
        key: 'operate',
        name: '操作',
        width: 180,
        fixed: 'right',
        render: (text, detail) => (
          <div>
            <a onClick={() => { this.handleOperate('update', detail); }}>修改</a>
            <Popconfirm title="确认删除？" onConfirm={() => { this.handleOperate('delete', detail); }}>
              <a className="ml-10">删除</a>
            </Popconfirm>
          </div>)
      }
    ];
  }
  handleOk() {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ confirmLoading: false });
    }, 2000);
  }
  handleOperate(type, detail) {
    switch (type) {
      case 'add':
        this.setState({
          type,
          title: '新增用户',
          detail: {},
          visible: Symbol(''),
          child: Set
        });
        break;
      case 'update':
        this.setState({
          type,
          title: '编辑用户',
          detail,
          visible: Symbol(''),
          child: Set
        });
        break;
      case 'delete':
        break;
      case 'detail':
        this.setState({
          type,
          title: '编辑用户',
          detail,
          visible: Symbol(''),
          child: Detail
        });
        break;
      default:
        break;
    }
  }
  render() {
    const { search, actions = { onSearch: (param) => { console.log('fork', param); } } } = this.props;
    const { title, visible, type, detail, child, confirmLoading } = this.state;
    const forkProps = {
      fields,
      actions,
      search,
      rowKey: 'id',
      datas: forkDatas,
      extraFields: this.getExtraFields()
    };
    const searchBarProps = {
      search,
      actions,
    };
    const modalProps = {
      title,
      visible,
      type,
      detail,
      child,
      onOk: this.handleOk,
      confirmLoading,
    };
    const ChildComponent = enhanceComponent(child);
    return (
      <div>
        <WithSearch {...searchBarProps}>
          {props => <Search {...props} searchFields={searchFields} operate={this.handleOperate} />}
        </WithSearch>
        <EnhanceTable {...forkProps} rowKey="id" extraFields={this.getExtraFields()} />
        <Dialog {...modalProps}>
          {props => <ChildComponent {...props} />}
        </Dialog>
      </div>
    );
  }
}

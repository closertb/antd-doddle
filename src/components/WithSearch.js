import React from 'react';
import { Form } from 'antd';
import { formItemLayout } from '../utils';
import formRender from './FormRender';
import './index.less';

class WithSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { form: { getFieldDecorator } } = props;
    this.formRender = formRender({ getFieldDecorator });
    this.handleSearch = this.handleSearch.bind(this);
    this.getFormData = this.getFormData.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { form, search } = this.props;
    if ('search' in nextProps && nextProps.search !== search) {
      form.resetFields();
    }
  }
  getFormData(paramFormat) {
    const { form } = this.props;
    let data = {};
    form.validateFields((err, values) => {
      data = typeof paramFormat === 'function' ? paramFormat(values) : values;
    });
    return data;
  }
  handleSearch() {
    const { form, actions, paramFormat, pageName = 'pageNo' } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      const res = typeof paramFormat === 'function' ? paramFormat(values) : values;
      actions.onSearch({
        ...res,
        [pageName]: 1
      });
    });
  }

  render() {
    const { children, actions, form, search } = this.props;
    const childrenProps = {
      getFormData: this.getFormData,
      search,
      form,
      formItemLayout,
      getFieldDecorator: form.getFieldDecorator,
      formRender: this.formRender,
      onSearch: this.handleSearch,
      actions,
    };
    return (
      <div className="search-form">
        {children(childrenProps)}
      </div>
    );
  }
}

export default Form.create()(WithSearch);

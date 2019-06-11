import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { formItemLayout } from '../utils';
import formRender from '../FormRender';
import './index.less';

function DefaultRender(props) {
  const { fields, formRender, search, handleSearch, handleReset, extraBtns, onReset } = props;
  return (
    <>
      <Row>
        {fields.map(field => (
          <Col span={8} key={field.key}>
            {formRender({ field, data: search })}
          </Col>
        ))}
      </Row>
      <div className="btn-group">
        <Button type="primary" onClick={handleSearch}>查询</Button>
        {onReset && <Button onClick={handleReset}>重置</Button> /* 仅在设置onReset情况下，开启重置按钮 */}
        {extraBtns && extraBtns()}
      </div>
    </>
  );
}
class WithSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { form: { getFieldDecorator } } = props;
    this.formRender = formRender({ getFieldDecorator, containerName: 'search-form' });
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getFormData = this.getFormData.bind(this);
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
    const { form, actions, onSearch, paramFormat, pageName = 'pageNo' } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      const res = typeof paramFormat === 'function' ? paramFormat(values) : values;
      (onSearch || actions.onSearch)({
        ...res,
        [pageName]: 1
      });
    });
  }
  handleReset() {
    const { onReset, form } = this.props;
    form.resetFields();
    onReset && onReset();
  }

  render() {
    const { children, actions, form, fields, search, extraBtns, onReset } = this.props;
    const childrenProps = {
      search,
      form,
      fields,
      actions,
      onReset,
      extraBtns,
      formItemLayout,
      onSearch: this.handleSearch,
      getFormData: this.getFormData,
      formRender: this.formRender,
      handleSearch: this.handleSearch,
      handleReset: this.handleReset,
    };
    return (
      <div className="search-form">
        {children ? children(childrenProps) : DefaultRender(childrenProps)}
      </div>
    );
  }
}

export default Form.create()(WithSearch);

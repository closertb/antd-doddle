import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { Pagination } from '../utils/common';
import { formItemLayout, FieldProps, SearchProps } from '../utils';
import formR from '../FormRender';
import './index.less';
 
function DefaultRender(props) {
  const { fields, formRender, search, handleSearch, handleReset, extraBtns, onReset, dynamicParams } = props;
  return (
    <>
      <Row>
        {fields.map(field => (
          <Col span={8} key={field.key}>
            {formRender({ field, data: search, ...dynamicParams })}
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

interface WithSearchProps {
  form: any,
  onSearch: Function,
  fields?: FieldProps [],
  search?: SearchProps,
  onReset?: Function,
  paramFormat?: Function,
  pageName?: string,
  dynamicParams?: object,
  children?: (props: WithSearchProps) => React.ReactElement,
  extraBtns?: Function,
  [propName: string]: any
}

class WithSearch extends React.PureComponent<WithSearchProps> {
  formRender: React.ReactNode
  constructor(props) {
    super(props);
    this.state = {};
    const { form: { getFieldDecorator } } = props;
    this.formRender = formR({ getFieldDecorator, containerName: 'search-form' });
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
    const { form, onSearch, paramFormat, pageName = Pagination.PN } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      const res = typeof paramFormat === 'function' ? paramFormat(values) : values;
      onSearch({
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
    const { children, form, fields, search, extraBtns, onReset, dynamicParams = {} } = this.props;
    const childrenProps = {
      search,
      form,
      fields,
      onReset,
      extraBtns,
      formItemLayout,
      dynamicParams,
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


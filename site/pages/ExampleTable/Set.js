import React from 'react';
import { Spin } from 'antd';
import { editFields } from './fields';
import { formRender } from '../../../src/index';

let FormRender;
export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { form: { getFieldDecorator } } = props;
    this.state = {};
    FormRender = formRender({ getFieldDecorator });
  }
  render() {
    const { detail: data, confirmLoading } = this.props;
    return (
      <Spin spinning={confirmLoading}>
        {editFields.map(field => <FormRender key={field.key} {...{ field, data }} />)}
      </Spin>
    );
  }
}

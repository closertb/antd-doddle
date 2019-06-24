import { Form } from 'antd';
export default function withForm(target) {
  return Form.create()(target);
}
---
title: FormGroup 表单配置组件
---

FormGroup组件: 是鉴于当前Function Component的盛行，老组件FormRender的使用需要声明局部变量，然后在Constructor中初始化。这样写虽然方便，但其实不太符合React风格；故此，对FormRender老组件进行了使用上的优化，功能还是一致；请看使用对比：

```js
// 新的FormRender
import React, { useCallback } from 'react';
import { FormGroup } from "antd-doddle";

const { FormRender } = FormGroup;

function Edit(props) {
  const handleSubmit  = useCallback(() => {
    // 省略
  })
  const { detail: data = { userName: 'doddle', mail: 'closertb@163.com' }, form: { getFieldDecorator } } = props;
  // 组件声明，绑定getFieldDecorator
  const formProps = { getFieldDecorator, required: true, withWrap: true };
  return (
    <div>
      <Row>
        <FormGroup {...formProps}>
          {editFields.map(field=> <FormRender key={field.key} {...{ field, data }} />)}
        </FormGroup>
      </Row>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  );
}

export default Form.create()(Edit);

// 老的FormRender
import React from 'react';
import { formRender } from "antd-doddle";

let FormRender; // 用于生成绑定了装饰器getFieldDecorator的组件
class Edit extends React.Component {
  constructor(props){
    super(props);
    const { form: { getFieldDecorator } } = props;
    // 组件声明，绑定getFieldDecorator
    FormRender = formRender({ getFieldDecorator, require: true, withWrap: true });
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    // 省略
  }
  render() {
    const { detail: data = {} } = this.props;
    return (
      <Form>
        <Row>
          {editFields.map(field=> <FormRender key={field.key} {...{ field, data }} />)}
        </Row>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={this.handleSubmit}>提交</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(Edit)
```

## 代码演示

## API

### FormRender 输入

参见FormRender；

### RenderType 扩充
由于业务的发展，除了上面提供的type以外，有可能你还有一些常用的表单组件，为此，我们提供了一个extendRenderTypes来扩充type

```javascript
import { extendRenderTypes } from 'antd-doddle';
import ComplexUpload from '../components/ComplexUpload'; // 自己封装的一个上传图片组件

extendRenderTypes({
  speImg: ({ field }) => { // 入参为props
    return (<ComplexUpload {...field} />);
  }
});
```

## Change Log

### 2019-05-13

 - feat: 新增FormGroup组件，优化FormRender使用体验 

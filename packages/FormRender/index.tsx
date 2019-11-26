import { formItemLayout as layout } from '../utils';
import { extendSymbol, WrapperDefault } from '../FormGroup/default';
import { ConstuctorProps } from '../FormGroup/interface';
import FormRender from '../FormGroup/FormRender';

// 用于接受一个从接口获取到的枚举数组
export default function (constProps: ConstuctorProps) {
  const { formItemLayout = layout, containerName, getFieldDecorator,
    require, Wrapper = WrapperDefault, withWrap = false, dynamicParams } = constProps;

  const extendProps = {
    extend: extendSymbol,
    formItemLayout,
    containerName,
    getFieldDecorator,
    dynamicParams,
    require,
    Wrapper,
    withWrap
  };

  return FormRender.bind(null, extendProps);
}

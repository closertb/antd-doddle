import { formItemLayout as layout } from '../utils';
import { extendSymbol, WrapperDefault } from '../FormGroup/default';
import FormRender from '../FormGroup/FormRender'; // 用于接受一个从接口获取到的枚举数组

export default function (constProps) {
  var _constProps$formItemL = constProps.formItemLayout,
      formItemLayout = _constProps$formItemL === void 0 ? layout : _constProps$formItemL,
      containerName = constProps.containerName,
      getFieldDecorator = constProps.getFieldDecorator,
      require = constProps.require,
      _constProps$Wrapper = constProps.Wrapper,
      Wrapper = _constProps$Wrapper === void 0 ? WrapperDefault : _constProps$Wrapper,
      _constProps$withWrap = constProps.withWrap,
      withWrap = _constProps$withWrap === void 0 ? false : _constProps$withWrap,
      dynamicParams = constProps.dynamicParams;
  var extendProps = {
    extend: extendSymbol,
    formItemLayout: formItemLayout,
    containerName: containerName,
    getFieldDecorator: getFieldDecorator,
    dynamicParams: dynamicParams,
    require: require,
    Wrapper: Wrapper,
    withWrap: withWrap
  };
  return FormRender.bind(null, extendProps);
}
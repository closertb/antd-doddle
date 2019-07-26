export { default as WithSearch } from './WithSearch';
export { default as OriginSearch } from './OriginSearch';
export { default as DynamicForm } from './DynamicForm';
// 兼容历史性bug： 单词拼错
export { default as DaynamicForm } from './DynamicForm';
export { default as InputWithUnit } from './InputWithUnit';
export { default as formRender } from './FormRender';
export { default as RenderDetail } from './RenderDetail';
export { default as EnhanceTable } from './EnhanceTable';
export { default as HModal } from './HModal';
export { default as FileUpload } from './FileUpload';

// 三个extends方法
export { combineTypes as extendFieldTypes } from './EnhanceTable/table/fieldTypes';
export { extendRenderTypes } from './FormRender/renderType';

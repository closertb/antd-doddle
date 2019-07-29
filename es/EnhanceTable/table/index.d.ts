import { FieldProps } from '../../utils';
declare function getFieldValue(value: any, field?: FieldProps): any;
interface OutProps {
    pick?: Function;
    excludes?: Function;
    enhance?: Function;
    values?: Function;
}
declare function createColumns(fields: FieldProps[], fieldKeys?: [], extraFields?: FieldProps[]): OutProps & {
    pick: (_fieldKeys: any) => OutProps;
    excludes: (_fieldKeys: any) => OutProps;
    enhance: (_extraColumns: any) => OutProps;
    values: () => any[];
};
declare const _default: {
    combineTypes: (types: any) => any;
    getFieldValue: typeof getFieldValue;
    createColumns: typeof createColumns;
};
export default _default;

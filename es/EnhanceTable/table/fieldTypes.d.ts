declare const fieldTypes: {
    normal: (value: any) => any;
    date: (value: any) => string;
    datetime: (value: any) => string;
    decimal: (value: any) => string;
    enum: (value: any, { enums }: {
        enums: any;
    }) => any;
};
export declare const combineTypes: (types: any) => any;
export default fieldTypes;

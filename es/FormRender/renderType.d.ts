/// <reference types="react" />
export declare const isUndefind: (value: any, defaultValue: any) => any;
declare const renderType: {
    origin: ({ field, props, data }: {
        field: any;
        props: any;
        data: any;
    }) => JSX.Element;
    image: ({ field, props }: {
        field: any;
        props: any;
    }) => JSX.Element;
    imageUpload: ({ field, props }: {
        field: any;
        props: any;
    }) => JSX.Element;
    selfDefine: ({ field, props, data }: {
        field: any;
        props: any;
        data: any;
    }) => any;
    withUnit: ({ field }: {
        field: any;
    }) => JSX.Element;
};
export declare const extendRenderTypes: (types?: {}) => {
    origin: ({ field, props, data }: {
        field: any;
        props: any;
        data: any;
    }) => JSX.Element;
    image: ({ field, props }: {
        field: any;
        props: any;
    }) => JSX.Element;
    imageUpload: ({ field, props }: {
        field: any;
        props: any;
    }) => JSX.Element;
    selfDefine: ({ field, props, data }: {
        field: any;
        props: any;
        data: any;
    }) => any;
    withUnit: ({ field }: {
        field: any;
    }) => JSX.Element;
};
export default renderType;

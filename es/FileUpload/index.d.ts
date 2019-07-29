import React from 'react';
import './index.less';
interface FileUploadProps {
    onChange?: Function;
    upload: Function;
    listType?: any;
    info?: string;
    value?: any;
    fileSize?: number;
    tips?: string;
    reg?: RegExp;
    simple?: string;
    disabled?: boolean;
    maxSize?: number;
}
interface StateProps {
    initUrl: string;
    imageUrl: string;
    ids: string[];
    previewVisible: boolean;
    fileList?: any;
}
export default class FileUpload extends React.PureComponent<FileUploadProps> {
    state: StateProps;
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        initUrl: any;
        ids: any[];
        fileList: {
            uid: any;
            name: any;
            status: string;
            url: any;
            specialId: any;
        }[];
    };
    beforeUpload: (file: any) => Promise<unknown>;
    customRequest: (option: any) => void;
    handleChange: ({ file, fileList }: {
        file: any;
        fileList: any;
    }) => void;
    handlePreview: (file: any) => void;
    handleSimplePreview: (url: any) => () => void;
    handleCancel: () => void;
    handleRemove: (file: any) => boolean;
    render(): JSX.Element;
}
export {};

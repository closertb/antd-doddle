import React from 'react';
import { Modal, Upload, Icon, Button } from 'antd';
import './index.less';
const kb = 1024 * 1024;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
const getNameFromUrl = imgUrl => imgUrl.match(/[0-9,a-z,.]{9,}(?=\?)/)[0];
function showInfoModal(content) {
    Modal.info({
        title: '提示',
        content
    });
}
const uploadButton = (type = 'picture-card') => type === 'picture-card' ? (React.createElement("div", null,
    React.createElement(Icon, { type: "plus" }),
    React.createElement("div", { className: "ant-upload-text" }, "\u4E0A\u4F20"))) : (React.createElement(Button, null,
    React.createElement(Icon, { type: "upload" }),
    "\u9009\u62E9\u6587\u4EF6"));
export default class FileUpload extends React.PureComponent {
    constructor(props) {
        super(props);
        this.beforeUpload = (file) => {
            const { listType = 'picture-card', reg = /(jpe?g|JPE?G|png|PNG)$/, tips = '请选择jpg,png类型的图片格式', fileSize: size = 5 } = this.props;
            const fileType = file.name;
            const fileSize = file.size;
            return new Promise((resolve, reject) => {
                if (!reg.test(fileType)) {
                    showInfoModal(tips);
                    reject();
                    return;
                }
                if (fileSize > size * kb) {
                    showInfoModal(`文件的大小不能超 ${size}M`);
                    reject();
                    return;
                }
                if (listType === 'picture-card') {
                    const img = new Image();
                    img.onload = () => {
                        resolve();
                    };
                    img.onerror = reject;
                    img.src = URL.createObjectURL(file);
                }
                else {
                    resolve();
                }
            });
        };
        this.customRequest = (option) => {
            const { upload } = this.props;
            const { file, onSuccess } = option;
            upload({ file }).then((res) => {
                const { content } = res;
                onSuccess({ content });
            }).catch(() => {
                console.log('some error');
            });
        };
        this.handleChange = ({ file, fileList }) => {
            const { ids } = this.state;
            const { onChange } = this.props;
            if (file.status === 'done') {
                const { storeId } = file.response.content;
                const storeIds = ids.concat(storeId);
                this.setState({
                    ids: storeIds,
                });
                getBase64(file.originFileObj, imageUrl => file.thumbUrl = imageUrl);
                onChange && onChange(storeIds.join(','), file.name);
            }
            this.setState({ fileList });
        };
        this.handlePreview = (file) => {
            const { listType = 'picture-card' } = this.props;
            if (listType !== 'picture-card') {
                return;
            }
            this.setState({ imageUrl: file.url || file.thumbUrl, previewVisible: true });
        };
        this.handleSimplePreview = url => () => {
            this.setState({ imageUrl: url, previewVisible: true });
        };
        this.handleCancel = () => {
            this.setState({ previewVisible: false });
        };
        this.handleRemove = (file) => {
            const { ids } = this.state;
            let index;
            // 回显的图片的删除逻辑
            if (file.specialId) {
                index = ids.indexOf(file.uid);
            }
            else if (!file.response || !file.response.content) {
                // 上传中图片的删除逻辑
                return true;
            }
            else {
                const { storeId } = file.response.content;
                index = ids.indexOf(storeId);
            }
            if (index === -1) {
                return true;
            }
            const { onChange } = this.props;
            ids.splice(index, 1);
            onChange && onChange(ids.length ? ids.join(',') : undefined);
            this.setState({
                ids
            });
            return true;
        };
        const { url, name, value } = props;
        this.state = {
            initUrl: url,
            imageUrl: '',
            ids: url ? [value] : [],
            previewVisible: false,
            fileList: url ? [{
                    uid: value,
                    name,
                    status: 'done',
                    specialId: value,
                    url,
                }] : []
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // 用于组件初始化时没有接收到原始url，且下一周期原始url更新；
        if (!prevState.initUrl && nextProps.url) {
            const { url, name, value } = nextProps;
            return {
                initUrl: url,
                ids: [value],
                fileList: [{
                        uid: value,
                        name: name || getNameFromUrl(url),
                        status: 'done',
                        url,
                        specialId: value,
                    }]
            };
        }
        return null;
    }
    render() {
        const { maxSize = 1, listType = 'picture-card', children, simple, info, disabled } = this.props;
        const child = children || uploadButton(listType);
        const { imageUrl, fileList, previewVisible } = this.state;
        return (React.createElement("div", { className: "doddle-image-upload" },
            React.createElement("div", { className: fileList.length ? 'imgArea has-child' : 'imgArea' },
                React.createElement(Upload, { listType: listType, fileList: fileList, disabled: disabled, beforeUpload: this.beforeUpload, onPreview: this.handlePreview, customRequest: this.customRequest, onChange: this.handleChange, onRemove: this.handleRemove }, fileList.length >= maxSize ? null : child),
                simple && fileList.length === 0 &&
                    /* eslint-disable-next-line */
                    React.createElement("img", { src: simple, alt: "\u6837\u4F8B", onClick: this.handleSimplePreview(simple), className: "show-simple" })),
            info && fileList.length === 0 &&
                React.createElement("div", { className: "show-info" }, info),
            React.createElement(Modal, { visible: previewVisible, footer: null, onCancel: this.handleCancel },
                React.createElement("img", { alt: "", style: { width: '100%' }, src: imageUrl }))));
    }
}

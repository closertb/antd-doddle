import React from 'react';
import { Modal, Upload, Icon, Button } from 'antd';
import { RcFile } from 'antd/lib/upload/';
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

const uploadButton = (type  = 'picture-card') => type === 'picture-card' ? (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">上传</div>
  </div>
) : (
  <Button>
    <Icon type="upload" />
    选择文件
  </Button>
);

interface FileUploadProps {
  onChange?: Function,
  upload: Function,
  listType?: any,
  info?: string,
  value?: any
  fileSize?: number,
  tips?: string,
  reg?: RegExp,
  simple?: string,
  disabled?: boolean,
  maxSize?: number
}

interface FileProps {
  uid?: string,
  name?: string,
  status?: string,
  specialId?: string,
  url?: string,
  [propName: string]: any
}

interface StateProps {
  initUrl: string,
  imageUrl: string,
  ids: string [],
  previewVisible: boolean,
  fileList?: any
}
export default class FileUpload extends React.PureComponent<FileUploadProps> {
  state: StateProps
  constructor(props) {
    super(props);
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
  beforeUpload = (file: RcFile) : Promise<void> => {
    const { listType = 'picture-card', reg = /(jpe?g|JPE?G|png|PNG)$/,
      tips = '请选择jpg,png类型的图片格式', fileSize: size = 5 } = this.props;
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
      } else {
        resolve();
      }
    });
  };

  customRequest = (option) => {
    const { upload } = this.props;
    const { file, onSuccess } = option;
    upload({ file }).then((res) => {
      const { content } = res;
      onSuccess({ content });
    }).catch(() => {
      console.log('some error');
    });
  };

  handleChange = ({ file, fileList }) => {
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

  handlePreview = (file) => {
    const { listType = 'picture-card' } = this.props;
    if (listType !== 'picture-card') {
      return;
    }
    this.setState({ imageUrl: file.url || file.thumbUrl, previewVisible: true });
  };
  handleSimplePreview = url => () => {
    this.setState({ imageUrl: url, previewVisible: true });
  };
  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handleRemove = (file) => {
    const { ids } = this.state;
    let index;
    // 回显的图片的删除逻辑
    if (file.specialId) {
      index = ids.indexOf(file.uid);
    } else if (!file.response || !file.response.content) {
      // 上传中图片的删除逻辑
      return true;
    } else {
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

  render() {
    const { maxSize = 1, listType = 'picture-card', children, simple, info, disabled } = this.props;
    const child = children || uploadButton(listType);
    const { imageUrl, fileList, previewVisible } = this.state;
    return (
      <div className="doddle-image-upload">
        <div className={fileList.length ? 'imgArea has-child' : 'imgArea'}>
          <Upload
            listType={listType}
            fileList={fileList}
            disabled={disabled}
            beforeUpload={this.beforeUpload}
            onPreview={this.handlePreview}
            customRequest={this.customRequest}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
          >
            {fileList.length >= maxSize ? null : child}
          </Upload>
          {simple && fileList.length === 0 &&
          /* eslint-disable-next-line */
            <img src={simple} alt="样例" onClick={this.handleSimplePreview(simple)} className="show-simple" />
          }
        </div>
        {info && fileList.length === 0 &&
          <div className="show-info">{info}</div>
        }
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="" style={{ width: '100%' }} src={imageUrl} />
        </Modal>
      </div>
    );
  }
}

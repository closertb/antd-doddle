import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import bind from 'bind-decorator';

class UploadImg extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  @bind
  handleCancel() {
    this.setState({ previewVisible: false });
  }

  @bind
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  @bind
  handleChange({ fileList, file = {} }) {
    const { onChange } = this.props;
    const response = file.response;
    if (file.status === 'done' && response) {
      fileList.forEach((item) => {
        if (item.uid === file.uid) {
          if (response.status === 'OK') {
            item.url = response.content;
          } else {
            item.status = 'error';
          }
        }
      });
    }

    onChange && onChange(fileList, file);
  }

  @bind
  handleRemove(file) {
    const { onRemove } = this.props;
    onRemove && onRemove(file);
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const { value: fileList = [], config = {}, disabled, service } = this.props;
    const { maxCount = Infinity, ...resetConfig } = config;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept="image/*"
          action={service}
          listType="picture-card"
          fileList={fileList}
          headers={{ 'X-Requested-With': null }}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          beforeUpload={(file, fileList) => {
            if (!(/.+\.(jpg|jpeg|png)$/).test(file.name)) {
              const index = fileList.indexOf(file);
              index !== -1 && fileList.splice(index, 1);
              Modal.warning({
                title: `文件'${file.name}'是非JPG,PNG格式图片`,
              });
              return false;
            }
            return true;
          }}
          {...resetConfig}
        >
          {!disabled && fileList.length < maxCount && uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImg;


// 说明 props {onChange,disabled,value,config:{maxNum,uploadUrl}}


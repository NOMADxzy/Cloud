import {Upload, Button, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import React from 'react';

class MyUpload extends React.Component {
    state = {
        fileList: [],
    };

    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }

        this.setState({fileList});
    };

    render() {
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text',
            },
            data: {name: "xu"},
            action: 'http://localhost:9000/upload',
            onChange: this.handleChange,
            multiple: true,
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button icon={<UploadOutlined/>} type={"primary"}>上传</Button>
            </Upload>
        );
    }
}

export default MyUpload;
// ReactDOM.render(<MyUpload />, mountNode);
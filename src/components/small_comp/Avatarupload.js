import {Upload, message, Button, Progress} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import React from "react";

class Avatarupload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (info) => {
        if (info.file.status !== 'uploading') {
            this.props.changesrc(info.file.response.substr(1))
        }
    }

    render() {
        const props = {
            name: 'file',
            action: 'http://localhost:9000/upload_avt',
            headers: {
                authorization: 'authorization-text',
            },
            onChange: this.handleChange,
        };
        return (
            <div id={"avt_upload"}>
                <Upload {...props} id={'upload_avt'}>
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>,
            </div>
        )
    }
}

export default Avatarupload;

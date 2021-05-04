import {Button, message, notification} from 'antd';
import React from 'react';
import {Progress} from 'antd'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import AudioItem from './AudioItem'

const HOST = 'http://8.141.72.17:9000';
class LinkNotify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // props.onRef(this);
    }

    openNotification = (data) => {
        const key = `open${Date.now()}`;
        const btn = (
            <CopyToClipboard text={'链接：' + data.link + '，提取码：' + data.code} onCopy={this.onCopy}>
                <Button type={'primary'} onClick={() => notification.close(key)}>复制链接</Button>
            </CopyToClipboard>
        );
        notification.open({
            message: '链接已生成',
            description: data.link + '\n提取码：' + data.code,
            btn,
            key,
            // onClose: (link)=>this.copyText(link),
        });
    };
    ShareFile = (item) => {
        axios.post(HOST + '/make_a_share_file', {
            UUID: this.props.item.UUID,
            UID: this.props.UID,
            Create_date: this.props.item.Mtime
        })
            .then((res) => {
                this.openNotification(res.data);
            })
    };

    render() {
        return (
            <a onClick={this.ShareFile}>分享</a>
        )
    }
}

export default LinkNotify;
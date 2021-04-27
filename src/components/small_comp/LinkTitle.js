import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button, Popover} from 'antd'

class LinkTitle extends React.Component {
    state = {
        value: '',
        copied: false,
    };

    render() {
        const content = (<div>
            <p>链接：{this.props.item.Link}</p>
            <p>提取码：{this.props.item.Code}</p>
        </div>);
        return (
            <div id={"link_title"}>
                <Popover content={content}>
                    <button type="primary">显示链接</button>
                </Popover>
                <small>{this.props.item.Save_Times}次保存</small>
            </div>
        );
    }
}

export default LinkTitle;
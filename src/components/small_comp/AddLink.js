import React from 'react';
import '../../assets/css/addlink.css'
import {Form, Input, Button, Checkbox, message, Card, Modal} from 'antd';
import axios from 'axios';
import Jpg from "../../assets/images/FileType/jpg.jpg"
import Mp4 from "../../assets/images/FileType/mp4.jpg"
import Mp3 from "../../assets/images/FileType/mp3.png"
import Doc from "../../assets/images/FileType/doc.jpg"
import Loading from './Loading'

const {Meta} = Card;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';
class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            UUID: '',
            view: 'add',
            sharedate: '2021-04-24T12:45:44.000Z',
            savetimes: 0,
            avatar: Mp4,
            File_Name: '机械战警.mp4',
            Size: 0
        }
    }

    onFinish = (values: any) => {
        document.getElementById("loading").style.visibility = "visible";
        axios.get(HOST + '/get_sharefile_by_link', {params: {Link: values.link, Code: values.code}})
            .then((res) => {
                if (res.status === 208) {
                    message.warn("链接不存在");
                    document.getElementById("loading").style.visibility = "hidden";
                }
                else {
                    console.log(res);
                    this.setState({
                        view: 'file',
                    });
                    document.getElementById('add_link').style.padding = '0px';
                    this.setState({
                        from: res.data.from,
                        Path: res.data.file.Path,
                        UUID: res.data.file.UUID,
                        sharedate: res.data.sharedate,
                        savetimes: res.data.savetimes,
                        avatar: this.props.findFilePic(res.data.file.State),
                        File_Name: res.data.file.File_Name,
                        Size: res.data.file.Size
                    });
                    document.getElementById("loading").style.visibility = "hidden";
                }
            })
            .catch((err) => {
                if (err.status === 403) message.error('提取码错误');
                document.getElementById("loading").style.visibility = "hidden";
            });
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error("提取码错误");
    };
    cancel = () => {
        this.setState({view: 'add'});
        document.getElementById("add_link").style.display = "none";
        document.getElementById('add_link').style.padding = '4%';
    };
    callAddLink = () => {
        let UID = document.getElementById('username').innerText;
        let UUID = this.state.UUID;
        axios.post(HOST + '/add_link_file', {
            UID: UID,
            UUID: UUID,
            Path: this.state.Path,
            from: this.state.from
        })
            .then((res) => {
                if (res.status === 200) {
                    document.getElementById("add_link").style.display = 'none';
                    message.success("添加成功");
                } else {
                    message.warn(res.status + "您已添加过此文件");
                }
            })
            .catch((err) => {
                message.warn("您已添加过此文件");
            });

    };

    render() {
        if (this.state.view === 'file') return (
            <div id={'add_link'}>
                {/*<div className={'link_title'}>*/}
                {/*<img src={this.state.avatar} style={{width:20}}/>*/}
                {/*<strong>{this.state.File_Name}</strong>*/}
                {/*</div>*/}
                <Card
                    hoverable
                    style={{width: 350}}
                    cover={
                    <div className={'title'}>
                        <img alt="example" src={this.state.avatar}/>
                        <strong>{this.state.File_Name}</strong>
                    </div>}>
                    <div>
                        <span className={"detail"}><i>来源：</i>{this.state.from}<br/></span>
                        <span className={"detail"}><i>大小：</i>{this.props.getFileSize(this.state.Size)}<br/></span>
                        <span className={"detail"}><i>时间：</i>{new Date(this.state.sharedate).toLocaleDateString()}<br/></span>
                        <span className={"detail"}><i>保存次数：</i>{this.state.savetimes}<br/></span>
                    </div>
                    <div className={'opt_buts'}>
                        <Button onClick={this.callAddLink}>添加</Button>
                        <Button onClick={this.cancel}>取消</Button>
                    </div>
                </Card>
                {/*<Modal title="文件" width={440} visible={this.state.view === 'file'} onOk={this.callAddLink}*/}
                {/*onCancel={this.cancel}>*/}
                {/*<div className={'title'}>*/}
                {/*<img alt="example" src={this.state.avatar}/>*/}
                {/*<strong>{this.state.File_Name}</strong>*/}
                {/*</div>*/}
                {/*<p className={"detail"}><i>来源：</i>{this.state.from}<br/></p>*/}
                {/*<p className={"detail"}><i>大小：</i>{this.props.getFileSize(this.state.Size)}<br/></p>*/}
                {/*<p className={"detail"}><i>时间：</i>{new Date(this.state.sharedate).toLocaleDateString()}<br/></p>*/}
                {/*<p className={"detail"}><i>保存次数：</i>{this.state.savetimes}<br/></p>*/}
                {/*</Modal>*/}
            </div>);
        else return (
            <div id={"add_link"}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="链接"
                        name="link"
                        rules={[{required: true, message: '请输入链接!'}]}
                    >
                        <Input id={"link_input"} style={{width: 200}} placeHolder={"请输入链接"}/>
                    </Form.Item>

                    <Form.Item
                        label="提取码"
                        name="code"
                        rules={[{required: true, message: '提取码不能为空!'}]}
                    >
                        <dic id={'link_code'}><Input style={{width: 100}} placeHolder={"请输入4位提取码"}/></dic>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>&nbsp;
                        <Button type="" onClick={this.cancel}>取消</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default AddLink;
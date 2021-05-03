import React from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

// const Demo = () => {
//
// }
const HOST = 'http://8.141.72.17:9000';
class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            login: true,
            signuid: ''
        }
    }

    onFinish = (values: any) => {
        // console.log('Success:', values);
        // let again_pwd = ;
        if (!this.state.login) {
            if (values.password !== values.again_pwd) {
                message.warn('两次密码不同');
                return;
            }
        }
        document.getElementById("loading").style.visibility = "visible";
        var api = this.state.login ? HOST + '/login_check' : HOST + '/signup';
        axios.post(api, {username: values.username, password: values.password})
            .then((res) => {
                this.setState({UID: values.username});
                if (this.state.login) {
                    message.success("欢迎回来，现在是" + new Date().toLocaleTimeString());
                } else {
                    message.success("注册成功");
                }
                this.props.set_user(values.username);
                document.getElementById("input_box").style.display = "none";
                document.getElementById('change_user').click();
            })
            .catch((err) => {
                if (this.state.login) {
                    message.error("账号或密码错误");
                } else {
                    message.error("注册失败");
                }
            })
            .finally(() => {
                document.getElementById("loading").style.visibility = "hidden";
            })
        ;
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    cancel = () => {
        if (document.getElementById("username").innerHTML === "未登录") {
            message.warn("请先登录");
        } else {
            document.getElementById("input_box").style.display = "none";
        }
    };
    judgeUid = (rule, value, callback) => {
        if (this.state.login) callback();
        axios.post(HOST + '/judge_uid', {username: value})
            .then((res) => {
                if (res.status === 205) {
                    callback("用户名已存在");
                } else {
                    callback();
                }
            })
    };
    switchstate = () => {
        let old = this.state.login;
        this.setState({login: !old});
        this.inputform.resetFields();
    };


    render() {
        return (
            <div id={"input_box"}>
                <Form
                    ref={(inputform) => this.inputform = inputform}
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{required: true, message: ''}, {validator: this.judgeUid}]}
                    >
                        <Input placeHolder={"输入账号"}/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input.Password placeholder={"输入密码"}/>
                    </Form.Item>
                    {this.state.login ?
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                            <br/><a onClick={this.switchstate}>注册账号</a>
                        </Form.Item> :
                        <Form.Item
                            label="密码"
                            name="again_pwd"
                            rules={[{required: true, message: ''}]}
                        >
                            <Input.Password placeholder={"再次输入密码"}/>
                        </Form.Item>
                    }

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>&nbsp;
                        {!this.state.login ? <div>
                                <a onClick={this.switchstate}>已有账号，直接登录</a></div> :
                            <Button type="" onClick={this.cancel}>取消</Button>}
                        <Link to={'/' + this.state.UID + '/all'}><p id={'change_user'} style={{display: 'none'}}>1</p>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default InputBox;
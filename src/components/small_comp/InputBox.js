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

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            login: true
        }
    }

    onFinish = (values: any) => {
        console.log('Success:', values);
        // let again_pwd = ;
        if (!this.state.login) {
            if (values.password !== values.again_pwd) {
                message.warn('两次密码不同');
                return;
            }
        }
        var api = this.state.login ? 'http://localhost:9000/login_check' : 'http://localhost:9000/signup';
        axios.post(api, {username: values.username, password: values.password})
            .then((res) => {
                this.setState({UID: values.username});
                if (this.state.login) {
                    message.success("登录成功");
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
    }

    render() {
        return (
            <div id={"input_box"}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    {this.state.login ?
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                            <br/><a onClick={() => {
                            this.setState({login: false})
                        }}>注册账号</a>
                        </Form.Item> :
                        <Form.Item
                            label="再次输入密码"
                            name="again_pwd"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/><br/>
                            <a onClick={() => {
                                this.setState({login: true})
                            }}>已有账号，直接登录</a>
                        </Form.Item>
                    }

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>&nbsp;
                        <Button type="" onClick={this.cancel}>取消</Button>
                        <Link to={'/' + this.state.UID + '/all'}><p id={'change_user'} style={{display: 'none'}}>1</p>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default InputBox;
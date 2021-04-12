import React from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';

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
    }

    onFinish = (values: any) => {
        console.log('Success:', values);
        this.props.set_user(values.username);
        document.getElementById("input_box").style.display = "none";
        message.success("登录成功");
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error("账号或密码错误");
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
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
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

export default InputBox;
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

class ChangePwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: ''
        }
    }

    onFinish = (values: any) => {
        let UID = this.props.UID;
        axios.post('http://localhost:9000/change_pwd', {UID: UID, old_pwd: values.old_pwd, new_pwd: values.new_pwd})
            .then((res) => {
                if (res.status === 200) {
                    message.success("修改成功");
                    document.getElementById("change_pwd").style.display = "none";
                }
            })
            .catch((err) => {
                message.warn("旧密码不正确");
            })
        ;
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div id={"change_pwd"}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="旧密码"
                        name="old_pwd"
                        rules={[{required: true, message: '请输入旧密码!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="new_pwd"
                        rules={[{required: true, message: '请输入新密码!'}]}
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
                        <Button type="" onClick={() => {
                            document.getElementById("change_pwd").style.display = "none";
                        }}>取消</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default ChangePwd;
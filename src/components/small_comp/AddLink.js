import React from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


class AddLink extends React.Component {
    constructor(props) {
        super(props);
    }

    onFinish = (values: any) => {
        console.log('Success:', values);
        document.getElementById("add_link").style.display = "none";
        message.success("添加成功");
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error("提取码错误");
    };
    cancel = () => {
        document.getElementById("add_link").style.display = "none";
    }

    render() {
        return (
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
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="提取码"
                        name="code"
                        rules={[{required: true, message: '提取码不能为空!'}]}
                    >
                        <Input/>
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
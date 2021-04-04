import React from 'react';
import "antd/dist/antd.css"
import axios from 'axios'

import {Pagination, PageHeader, Button, Descriptions,} from 'antd'
import Edit_svg from "../assets/images/svg/edit.svg"
import Del_svg from "../assets/images/svg/del.svg"
import {Upload, message, Image} from 'antd'
import {UploadOutlined, EditOutlined, FormOutlined} from '@ant-design/icons';
import InputBox from "./small_comp/InputBox"
import ReactPlayer from 'react-player'

class DICM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Edit_svg: true,
            list: [],
            pageSize: 10,
            total: 100,
            current: parseInt(window.location.hash.slice(1), 0) || 1 //获取当前页面的hash值，转换为number类型
        }
    }

    del_or_edit = () => {
        var b = !this.state.Edit_svg;
        this.setState({
            Edit_svg: b
        })
    }

    componentDidMount() {
        this.getDatatest(1);
    }

    getDatatest = (page) => {
        console.log("开始获取")
        axios.get("http://localhost:9000/addnews")
            .then((res) => {
                console.log(res);
                this.setState({
                    list: res.data.src
                })
            })
    }
    onchange = page => {
        this.setState({
            current: page
        });
        this.getDatatest(page);
    }

    render() {
        var data = this.state.list;
        return (
            <div className={"file_list_content"}>
                <div className={"list_box_top"}>
                    <InputBox/>
                    {/*-------------------------头部------------------------------------------------------------*/}
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="相册"
                        subTitle="This is a subtitle"
                        extra={[
                            <Button key="1">添加链接</Button>,
                            <Button key="2" type="">切换视图</Button>,
                            <Upload {...props}>
                                <Button key={"3"} icon={<UploadOutlined/>}>上传文件</Button>
                            </Upload>,
                        ]}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="文件名"/>
                            <Descriptions.Item>
                                <small id={"daxiao"}>大小</small>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <small id={"shijian"}>时间</small>
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    {/*----------------------------------------数据------------------------------------------------*/}
                </div>
                {
                    data.map((value, key) => {
                        return (
                            <span className={"pic_content"}>
                                <Image width={150} height={100} src={value} alt={"图片"}/>
                            </span>
                        )
                    })
                }
                <img id={"edit_img"} src={this.state.Edit_svg === true ? Edit_svg : Del_svg}
                     onClick={this.del_or_edit}/>
                {/*--------------------------------------------------尾部-----------------------------------------------*/}
                <Pagination
                    total={this.state.total}
                    current={this.state.current}
                    pageSize={this.state.pageSize}
                    onChange={this.onchange}
                    showTotal={e => {
                        return '共' + e + '页';
                    }}
                />
            </div>
        )
    }
}

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default DICM;
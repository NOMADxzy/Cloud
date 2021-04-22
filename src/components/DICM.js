import React from 'react';
import "antd/dist/antd.css"
import axios from 'axios'

import {Pagination, PageHeader, Button, Descriptions,} from 'antd'
import Edit_svg from "../assets/images/svg/edit.svg"
import Del_svg from "../assets/images/svg/del.svg"
import {Upload, message, Image, Card} from 'antd'
import {UploadOutlined, EditOutlined, FormOutlined} from '@ant-design/icons';
import InputBox from "./small_comp/InputBox"
import ReactPlayer from 'react-player'
import MyUpload from './small_comp/MyUpload'

class DICM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            Edit_svg: true,
            list: [],
            pageSize: 18,
            total: 0,
            PageNum: parseInt(window.location.hash.slice(1), 0) || 1 //获取当前页面的hash值，转换为number类型
        }
    }

    del_or_edit = () => {
        var b = !this.state.Edit_svg;
        this.setState({
            Edit_svg: b
        })
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({UID: document.getElementById('username').innerText})
            this.getDatatest();
        })
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({UID: document.getElementById('username').innerText})
            this.getDatatest();
        })
    }

    getDatatest = () => {
        let UID = this.state.UID;
        let keyword = this.props.location.search.substr(9);
        axios.get('http://localhost:9000/get_numof_file', {
            params: {
                UID: UID,
                State: 1,
                Del: 0,
                Collect: 0,
                keyword: keyword
            }
        })
            .then((res) => {
                this.setState({total: res.data[0]['COUNT(*)']})
            })
            .catch((err) => console.log(err));
        axios.get("http://localhost:9000/get_user_file", {
            params: {
                UID: UID,
                Del: 0,
                Collect: 0,
                PageSize: this.state.pageSize,
                PageNum: this.state.PageNum,
                State: 1,
                keyword: keyword
            }
        })
            .then((res) => {
                this.setState({
                    list: res.data
                })
            })
    };
    onchange = page => {
        setTimeout(() => {
            this.setState({
                PageNum: page
            });
            this.getDatatest();
        })
    };

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
                            <MyUpload UID={this.state.UID}/>,
                        ]}
                    >
                    </PageHeader>
                    {/*----------------------------------------数据------------------------------------------------*/}
                </div>
                <div className={"pic_content"}>
                    {
                        data.map((value, key) => {
                            return (
                                <span className={"pic_box"}>
                                <Image width={145} height={100} src={"http://localhost:9000" + value.Path}
                                       alt={"图片"}/><br/>
                                <small className={'dcim_pic_name'}>{value.File_Name}</small>
                            </span>
                            )
                        })
                    }
                </div>
                <img id={"edit_img"} src={this.state.Edit_svg === true ? Edit_svg : Del_svg}
                     onClick={this.del_or_edit}/>
                {/*--------------------------------------------------尾部-----------------------------------------------*/}
                <div id={"dcim_pagi"}>
                    <Pagination
                        total={this.state.total}
                        current={this.state.PageNum}
                        pageSize={this.state.pageSize}
                        onChange={this.onchange}
                        showTotal={e => {
                            return '共' + e + '张';
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default DICM;
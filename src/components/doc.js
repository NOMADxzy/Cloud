import React from 'react';
import "antd/dist/antd.css"
import axios from 'axios'
import Jpg from "../assets/images/FileType/jpg.jpg"
import Mp4 from "../assets/images/FileType/mp4.jpg"
import Mp3 from "../assets/images/FileType/mp3.png"
import Doc from "../assets/images/FileType/doc.jpg"
import {List, Avatar, Pagination, PageHeader, Button, Descriptions,} from 'antd'
import LikeBtn from "./small_comp/LikeBtn"
import Edit_title from "./small_comp/Edit_title"
import Edit_svg from "../assets/images/svg/edit.svg"
import Del_svg from "../assets/images/svg/del.svg"
import {Upload, message} from 'antd'
import {UploadOutlined, EditOutlined} from '@ant-design/icons';
import InputBox from "./small_comp/InputBox"
import Select from "./small_comp/select"
import AddLink from "./small_comp/AddLink"


class Docu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Edit_svg: true,
            list: [],
            news_num: 1,
            pageSize: 10,
            total: 30,
            pageNumber: parseInt(window.location.hash.slice(1), 0) || 1,//获取当前页面的hash值，转换为number类型
            selected: []
        }
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI = () => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/newest_', {params: {pageNum: 0, news_num: 15}})
            .then((res) => {
                var temp = [];
                for (var i = 0; i < res.data.newslist.length; i++) {
                    res.data.newslist[i].createdAt = this.decodeTimeStamp(new Date(res.data.newslist[i].createdAt).getTime());
                    if (res.data.newslist[i].title.split('.').length > 1) {
                        if (res.data.newslist[i].title.split('.')[1] === 'doc') {
                            temp.push(res.data.newslist[i]);
                        }
                    }
                    if (res.data.newslist[i].title.length > 37) res.data.newslist[i].title = res.data.newslist[i].title.substring(0, 36) + '...'
                }
                console.log(temp);
                this.setState({
                    list: temp
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };
    PageChange = (page) => {
        this.setState({
            pageNumber: page
        })
    };
    AddLink = () => {
        document.getElementById("add_link").style.display = "block";
    }

    render() {
        var data = this.state.list;
        return (
            <div className={"file_list_content"}>
                <div className={"list_box_top"}>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="云盘"
                        subTitle=""
                        extra={[
                            <Button key="1" onClick={this.AddLink}>添加链接</Button>,
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
                    <AddLink/>
                </div>
                {
                    <List
                        size={"small"}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <div className={"ant_list_box"}>
                                <List.Item actions={[
                                    <a onClick={e => {
                                        document.getElementById("edit_title" + index).style.display = "inline";
                                        document.getElementById("edit_title" + index).focus();
                                        document.getElementById("edit_title" + index).value = document.getElementById("title" + index).innerHTML;
                                        document.getElementById("title" + index).style.display = "none";
                                    }}
                                    > 编辑 </a>,
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar shape={"square"} src={this.findFilePic(item.title)}/>}
                                        title={<span className={"list_title_box"}>
                                        <Select addSelect={(idx) => {
                                            this.add_select(idx)
                                        }} index={index} onRef={(child) => {
                                            this.child = child
                                        }}/>
                                            <a href="https://ant.design" id={"title" + index}>{item.title}</a>
                                            <Edit_title filename={item.title} index={index} data={data} update={() => {
                                                this.editname()
                                            }}/>
                                        <small id={'list_time'}>{item.createdAt}</small>
                                        <small id={"file_space_value"}>{item.like}KB</small>
                                        <LikeBtn/>
                                    </span>}
                                        // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            </div>
                        )}
                    />
                }
                <img id={"edit_img"} src={this.state.Edit_svg === true ? Edit_svg : Del_svg}
                     onClick={this.del_or_edit.bind(this, data)}/>
                <div className={"pagination"}><Pagination showToal={2}
                    // defaultPageSize={3}
                                                          showQuickJumper
                                                          hideOnSinglePage={false}
                    // defaultCurrent={this.state.pageNumber}
                                                          current={this.state.pageNumber}
                                                          total={this.state.total}
                                                          pageSize={this.state.pageSize}
                                                          onChange={this.PageChange}
                                                          showTotal={e => {
                                                              return '共' + e + '项';
                                                          }}
                    // pageSizeOptions = {[10,20,50]}
                /></div>
            </div>
        )
    }

    del_or_edit = (data) => {
        var b = !this.state.Edit_svg;
        this.setState({
            Edit_svg: b
        })
        var htmlCollection = document.getElementsByClassName("select_svg");
        if (b === false) {// 点击了编辑
            for (let i = 0; i < htmlCollection.length; i++) {
                htmlCollection[i].style.display = "inline";
            }
        } else {
            for (let i = 0; i < htmlCollection.length; i++) {
                htmlCollection[i].style.display = "none";
            }
        }
        if (b === true) {// 点击了删除
            let selecteddata = this.state.selected;
            console.log("发送" + selecteddata);
            selecteddata.sort();
            for (let i = 0; i < selecteddata.length; i++) {
                data.splice(selecteddata[i] - i, 1)
            }
            this.state.selected = [];
            // this.child.componentWillReceiveProps();
        }
    };
    editname = () => {
        this.forceUpdate();
    }
    add_select = (index) => {
        let idx = this.state.selected.indexOf(index);
        if (idx === -1) {
            this.state.selected.push(index);
        } else {
            this.state.selected.splice(idx, 1);
        }
    };

    findFilePic = (title) => {
        var End = title.split(".");
        var end = End[End.length - 1]
        // console.log(End)
        // if(end===undefined) return <img src={Doc}/>
        switch (end) {
            case 'mp4':
                return Mp4
            case 'mp3':
                return Mp3
            case 'jpg':
                return Jpg
            case 'png':
                return Jpg
            case 'doc':
                return Doc
            default:
                return Doc
        }
    }

    decodeTimeStamp = (timestamp) => {
        var arrTimestamp = (timestamp + '').split('');
        for (var start = 0; start < 13; start++) {
            if (!arrTimestamp[start]) {
                arrTimestamp[start] = '0';
            }
        }
        timestamp = arrTimestamp.join('') * 1;

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - timestamp;

        // 如果本地时间反而小于变量时间
        if (diffValue < 0) {
            return '不久前';
        }

        // 计算差异时间的量级
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;

        // 数值补0方法
        var zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };

        // 使用
        if (monthC > 12) {
            // 超过1年，直接显示年月日
            return (function () {
                var date = new Date(timestamp);
                return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
            })();
        } else if (monthC >= 1) {
            return parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            return parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return parseInt(minC) + "分钟前";
        }
        return '刚刚';
    }
    loadmore = () => {
        this.state.news_num = 3 + this.state.news_num
        axios.get('https://qc8vvg.fn.thelarkcloud.com/newest_', {params: {pageNum: 0, news_num: this.state.news_num}})
            .then((res) => {
                for (var i = 0; i < res.data.newslist.length; i++) {
                    res.data.newslist[i].createdAt = this.decodeTimeStamp(new Date(res.data.newslist[i].createdAt).getTime())
                    if (res.data.newslist[i].comment_id == undefined) res.data.newslist[i].comment_id = 0
                    else res.data.newslist[i].comment_id = eval('([' + res.data.newslist[i].comment_id + '])').length
                    if (res.data.newslist[i].title.length > 37) res.data.newslist[i].title = res.data.newslist[i].title.substring(0, 36) + '...'
                }
                // console.log(res)
                this.setState({
                    list: res.data.newslist
                })

            })
            .catch((err) => {
                alert("没有更多")
            })
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

export default Docu;

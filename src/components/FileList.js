import React from 'react';
import "antd/dist/antd.css"
// import "../assets/css/index.css"
import axios from 'axios'
import Jpg from "../assets/images/FileType/jpg.jpg"
import Mp4 from "../assets/images/FileType/mp4.jpg"
import Mp3 from "../assets/images/FileType/mp3.png"
import Doc from "../assets/images/FileType/doc.jpg"
// import ReactPullToRefresh from 'react-pull-to-refresh'
import {List, Avatar, Pagination, PageHeader, Button, Descriptions, message} from 'antd'
import LikeBtn from "./small_comp/LikeBtn"
import Edit_title from "./small_comp/Edit_title"
import Edit_svg from "../assets/images/svg/edit.svg"
import Del_svg from "../assets/images/svg/del.svg"
import Down_svg from "../assets/images/svg/download.svg"
import {RedoOutlined} from '@ant-design/icons';
import MyUpload from "./small_comp/MyUpload"
import Select from "./small_comp/select"
import AddLink from "./small_comp/AddLink"
import SearchWrap from './small_comp/SearchWrap'
import LinkNotify from './small_comp/LinkNotify'
import LinkTitle from './small_comp/LinkTitle'

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            type: '',
            Edit_svg: true,
            list: [],
            news_num: 1,
            pageSize: 10,
            total: 0,
            pageNumber: parseInt(window.location.hash.slice(1), 0) || 1,//获取当前页面的hash值，转换为number类型
            selected: [],
            files: []
        }
    }
    callAPI = () => {
        let State = ['all', 'pic', 'vid', 'mus', 'doc', 'like', 'recycle', 'share'].indexOf(this.state.type);
        let UID = this.state.UID;
        let Collect = State === 5 ? 1 : 0;
        let Del = State === 6 ? 1 : 0;
        let Share = State === 7 ? 1 : 0;
        let keyword = this.props.location.search.substr(9);

        axios.get('http://localhost:9000/get_numof_file', {
            params: {
                UID: UID,
                State: State,
                Del: Del,
                Collect: Collect,
                keyword: keyword,
                Share: Share
            }
        })
            .then((res) => {
                this.setState({total: res.data[0]['COUNT(*)']})
            })
            .catch((err) => console.log(err));
        axios.get('http://localhost:9000/get_user_file', {
            params: {
                UID: UID,
                Del: Del,
                State: State,
                Collect: Collect,
                Share: Share,
                PageNum: this.state.pageNumber,
                PageSize: this.state.pageSize,
                keyword: keyword
            }
        })
            .then((res) => {
                console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    // res.data[i].Mtime = this.decodeTimeStamp(new Date(res.data[i].Mtime).getTime());
                    res.data[i].Mtime = new Date(res.data[i].Mtime).toLocaleDateString();
                }
                this.setState({
                    list: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                pageNumber: 1,
                UID: this.props.match.params.UID,
                type: this.props.match.params.type
            });
            this.callAPI();
        })
    }

    componentWillReceiveProps() {
        // console.log(this.props.location.search.substr(9));
        setTimeout(() => {
            this.setState({
                pageNumber: 1,
                UID: this.props.match.params.UID,
                type: this.props.match.params.type
            });
            this.callAPI();
        })
    }
    PageChange = (page) => {
        setTimeout(() => {
            this.setState({pageNumber: page});
            this.callAPI();
        })
    };
    AddLink = () => {
        document.getElementById("add_link").style.display = "block";
    };

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
                            <Button key="2" onClick={this.callAPI} icon={<RedoOutlined/>}>刷新</Button>,
                            <MyUpload UID={this.state.UID}/>,
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
                    <AddLink findFilePic={this.findFilePic} getFileSize={this.getFileSize}/>
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
                                    <LinkNotify item={item} UID={this.state.UID}/>
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar shape={"square"} src={this.findFilePic(item.State)}/>}
                                        title={<span className={"list_title_box"}>
                                        <Select addSelect={(idx) => {
                                            this.add_select(idx)
                                        }} index={index} onRef={(child) => {
                                            this.child = child
                                        }}/>
                                            <a href={"http://localhost:9000" + item.Path} target={'_blank'}
                                               id={"title" + index}>{item.File_Name}</a>
                                            <Edit_title filename={item.File_Name} index={index} data={data}
                                                        update={() => {
                                                this.editname()
                                            }}/>
                                        <small id={'list_time'}>{this.getFileSize(item.Size)}</small>
                                            <small id={"file_space_value"}>{item.Mtime}</small>
                                            {this.state.type === 'share' ? <LinkTitle item={item}/> :
                                                <LikeBtn filestate={item}/>}
                                    </span>}
                                    />
                                </List.Item>
                            </div>
                        )}
                    />
                }
                <img id={"edit_img"} src={this.state.Edit_svg === true ? Edit_svg : Del_svg}
                     onClick={this.del_or_edit.bind(this, data)}/>
                <img id={"down_img"} src={Down_svg}/>
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
        });
        var htmlCollection = document.getElementsByClassName("select_svg");
        if (b === false) {// 点击了编辑
            for (let i = 0; i < htmlCollection.length; i++) {
                htmlCollection[i].style.display = "inline";
            }
            document.getElementById("down_img").style.display = "block";
        } else {
            for (let i = 0; i < htmlCollection.length; i++) {
                htmlCollection[i].style.display = "none";
            }
        }
        if (b === true) {// 点击了删除
            let selecteddata = this.state.selected;
            selecteddata.sort();
            for (let i = selecteddata.length - 1; i >= 0; i--) {
                let idx = selecteddata[i];
                let tail = data[idx].File_Name.split('.')[1];
                console.log(tail);
                axios.post('http://localhost:9000/delete_file', {UID: this.state.UID, UUID: data[idx].UUID, tail: tail})
                    .then((res) => {
                        if (res.status === 200) ;
                        else message.error("删除失败");
                    }).catch(() => message.error("删除失败"));
                data.splice(idx, 1)
            }
            message.success("删除了" + selecteddata.length + "个文件")
            this.state.selected = [];
            document.getElementById("down_img").style.display = "none";
        }
    };
    editname = () => {
        this.forceUpdate();
    };
    add_select = (index) => {
        let idx = this.state.selected.indexOf(index);
        if (idx === -1) {
            this.state.selected.push(index);
        } else {
            this.state.selected.splice(idx, 1);
        }
    };

    findFilePic = (State) => {
        switch (State) {
            case 2:
                return Mp4;
            case 3:
                return Mp3;
            case 1:
                return Jpg;
            case 4:
                return Doc;
            default:
                return Doc
        }
    };

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
    getFileSize = (fileByte) => {
        var fileSizeByte = fileByte;
        var fileSizeMsg = "";
        if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(0) + "KB";
        else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
        else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(0) + "MB";
        else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
        else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(0) + "GB";
        else fileSizeMsg = "文件超过1TB";
        return fileSizeMsg;
    }


}

export default FileList;

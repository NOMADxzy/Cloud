import React from 'react';
import "antd/dist/antd.css"
// import "../assets/css/index.css"
import axios from 'axios'
import Jpg from "../assets/images/FileType/jpg.jpg"
import Mp4 from "../assets/images/FileType/mp4.jpg"
import Mp3 from "../assets/images/FileType/mp3.png"
import Doc from "../assets/images/FileType/doc.jpg"
import UNK from "../assets/images/FileType/unknown.jpeg"
// import ReactPullToRefresh from 'react-pull-to-refresh'
import {List, Avatar, Pagination, PageHeader, Button, Descriptions, message, Tooltip, Modal, Affix} from 'antd'
import LikeBtn from "./small_comp/LikeBtn"
import Edit_title from "./small_comp/Edit_title"
import Edit_svg from "../assets/images/svg/edit.svg"
import Del_svg from "../assets/images/svg/del.svg"
import Down_svg from "../assets/images/svg/download.svg"
import {RedoOutlined, PlusOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import MyUpload from "./small_comp/MyUpload"
import Select from "./small_comp/select"
import AddLink from "./small_comp/AddLink"
import SearchWrap from './small_comp/SearchWrap'
import LinkNotify from './small_comp/LinkNotify'
import LinkTitle from './small_comp/LinkTitle'
import FileSort from './small_comp/FileSort'
import MusicTab from './small_comp/MusicTab'
import VideoTab from "./small_comp/VideoTab";
import PictureTab from "./small_comp/PictureTab";
import fileDownload from 'js-file-download'
import FileViewer from 'react-file-viewer';

const {confirm} = Modal;
// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';
class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            type: '',
            Edit_svg: true,
            list: [],
            news_num: 1,
            pageSize: 15,
            total: 0,
            pageNumber: parseInt(window.location.hash.slice(1), 0) || 1,//获取当前页面的hash值，转换为number类型
            selected: [],
            files: []
        }
    }

    callAPI = (SortWord) => {
        document.getElementById("loading").style.visibility = "visible";
        let State = ['all', 'pic', 'vid', 'mus', 'doc', 'like', 'recycle', 'share'].indexOf(this.state.type);
        let UID = this.state.UID;
        let Collect = State === 5 ? 1 : 0;
        let Del = State === 6 ? 1 : 0;
        let Share = State === 7 ? 1 : 0;
        let keyword = this.props.location.search.substr(9);

        axios.get(HOST + '/get_numof_file', {
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
        axios.get(HOST + '/get_user_file', {
            params: {
                UID: UID,
                Del: Del,
                State: State,
                Collect: Collect,
                Share: Share,
                PageNum: this.state.pageNumber,
                PageSize: this.state.pageSize,
                keyword: keyword,
                SortWord: SortWord
            }
        })
            .then((res) => {
                console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].Mtime = new Date(res.data[i].Mtime).toLocaleDateString();
                }
                this.setState({
                    list: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                document.getElementById("loading").style.visibility = "hidden";
            })
    };

    componentDidMount() {
        // document.addEventListener('contextmenu', this.download);
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

    PageChange = (page, size) => {
        setTimeout(() => {
            this.setState({pageNumber: page, pageSize: size});
            this.callAPI();
        })
    };
    AddLink = () => {
        document.getElementById("add_link").style.display = "block";
    };
    add_select = (index) => {
        let idx = this.state.selected.indexOf(index);
        if (idx === -1) {
            this.state.selected.push(index);
            document.getElementsByName('alllist')[index].className = 'ant_list_box_selected';
        } else {
            this.state.selected.splice(idx, 1);
            document.getElementsByName('alllist')[index].className = 'ant_list_box';
        }

    };
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
            // document.getElementById("down_img").style.display = "block";
        }
        if (b === true) {// 点击了删除
            for (let i = 0; i < htmlCollection.length; i++) {
                htmlCollection[i].style.display = "none";
            }
            let selecteddata = this.state.selected;
            selecteddata.sort((a, b) => {
                if (a < b) return -1;
                else if (a > b) return 1;
                else return 0;
            });
            console.log(selecteddata);
            for (let i = selecteddata.length - 1; i >= 0; i--) {
                let idx = selecteddata[i];
                document.getElementsByName('alllist')[idx].className = 'ant_list_box';
                let tail = data[idx].File_Name.split('.')[1];
                // console.log(tail);
                axios.post(HOST + '/delete_file', {UID: this.state.UID, UUID: data[idx].UUID, tail: tail})
                    .then((res) => {
                        if (!res.status === 200) message.error("删除失败");
                    }).catch(() => message.error("删除失败"));
                data.splice(idx, 1);
            }
            if (this.state.type !== 'recycle') setTimeout(message.success(selecteddata.length + "个文件已放入回收站"), 1000);
            else setTimeout(message.success("删除了" + selecteddata.length + "个文件"), 1000);

            this.state.selected = [];
            // document.getElementById("down_img").style.display = "none";
        }
    };
    cancel_del = () => {
        this.setState({Edit_svg: true});
        var htmlCollection = document.getElementsByClassName("select_svg");
        let selected = JSON.parse(
            JSON.stringify(this.state.selected)
        );
        for (let i = 0; i < selected.length; i++) {
            htmlCollection[selected[i]].click();
        }
        for (let i = 0; i < htmlCollection.length; i++) {
            htmlCollection[i].style.display = "none";
        }
    };
    recycleFile = () => {
        this.setState({
            Edit_svg: true
        });
        var data = this.state.list;
        let UID = this.state.UID;
        let success_num = 0;
        var htmlCollection = document.getElementsByClassName("select_svg");
        let selected = this.state.selected.slice();
        selected.sort((a, b) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        });
        console.log(selected);
        for (let i = selected.length - 1; i >= 0; i--) {
            let idx = selected[i];
            let item = data[idx];
            htmlCollection[idx].click();
            console.log(item.File_Name);
            axios.post(HOST + '/recycle', {UID: UID, UUID: item.UUID})
                .then(() => {
                    success_num++;
                })
                .catch(() => {
                    message.error("恢复失败")
                });
            data.splice(idx, 1);
        }
        setTimeout(() => message.success("恢复了" + success_num + "个文件"), 1000);
        for (let i = 0; i < htmlCollection.length; i++) {
            htmlCollection[i].style.display = "none";
        }
    };
    handleJump = (e, item) => {
        // console.log(item);
        if (item.State === 3) {
            e.preventDefault();
            // this.myNotify.playMusic(item);
            this.musictab.playMusic(item);
        } else if (item.State === 1) {
            e.preventDefault();
            // this.myNotify.playMusic(item);
            this.picturetab.play(item);
        }
    };
    download = (data) => {
        let selected = this.state.selected.slice();
        this.cancel_del();
        for (let i = 0; i < selected.length; i++) {
            let item = data[selected[i]];
            console.log(item.File_Name);
            axios.get(HOST + item.Path, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            })
                .then((res) => {
                    fileDownload(res.data, item.File_Name);
                })
        }
    };
    showConfirm = (data) => {
        let that = this;
        if (this.state.type !== 'recycle' || this.state.Edit_svg) {
            this.del_or_edit(data);
            return;
        }
        confirm({
            title: '永久删除这些文件?',
            icon: <ExclamationCircleOutlined/>,
            // content: 'Some descriptions',
            onOk() {
                that.del_or_edit(data);
            },
            onCancel() {
                that.cancel_del();
            },
        });
    };
    selectAll = () => {
        let select_nodes = document.getElementsByClassName('select_svg');
        for (let i = 0; i < select_nodes.length; i++) {
            select_nodes[i].click();
        }
    };

    render() {
        var data = this.state.list;
        return (
            <div className={"file_list_content"}>

                <div className={"list_box_top"}>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="文件"
                        subTitle=""
                        extra={[
                            this.state.Edit_svg ? <span/> : <Button key={'0'}
                                                                    onClick={this.selectAll}>{this.state.selected.length === 0 ? '全选' : '反选'}</Button>,

                            this.state.Edit_svg ? <Tooltip title={'刷新列表内容'}><Button key="1"
                                                                                    onClick={() => this.callAPI(document.getElementById('sort').innerText === '日期' ? 'Mtime' : 'Size')}
                                                                                    icon={
                                                                                        <RedoOutlined/>}>刷新</Button></Tooltip> :
                                <Button key="1" onClick={this.cancel_del}>取消</Button>,

                            this.state.type === 'recycle' ?
                                <Button key="3" style={{display: this.state.Edit_svg ? 'none' : 'inline'}}
                                        onClick={this.recycleFile}><span>恢复</span></Button> :
                                <Button key="3" onClick={this.download.bind(this, data)}
                                        style={{display: this.state.Edit_svg ? 'none' : 'inline'}}>下载</Button>,

                            <Button key="4" onClick={this.showConfirm.bind(this, data)}>{this.state.Edit_svg ? '编辑' :
                                <span style={{color: 'red'}}>删除</span>}</Button>,
                            <MyUpload UID={this.state.UID}/>,
                        ]}
                    >
                        {/*<Button onClick={()=>{console.log(this.state.selected)}}>xianshi</Button>*/}
                        <Tooltip title={'添加链接'} placement={'left'}><Button id={'add_link_btn'} shape={'circle'}
                                                                           onClick={this.AddLink}
                                                                           icon={<PlusOutlined/>}/></Tooltip>
                        <Descriptions size="small" column={4}>
                            <Descriptions.Item label="文件名"/>
                            <Descriptions.Item>
                                <small id={"daxiao"}>大小</small>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <small id={"shijian"}>{'时间'}</small>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <span id={"sort"}><FileSort
                                    callfilelistapi={(SortWord) => this.callAPI(SortWord)}/></span>
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
                            <div
                                className={this.state.selected.indexOf(index) >= 0 ? 'ant_list_box_selected' : 'ant_list_box'}
                                name="alllist">
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
                                        title={
                                            <span className={"list_title_box"}>
                                        <Select addSelect={(idx) => {
                                            this.add_select(idx)
                                        }} index={index} initial={this.state.selected.indexOf(index) >= 0}/>

                                            <a href={HOST + item.Path} onClick={(e) => this.handleJump(e, item)}
                                               target={'_blank'}
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
                {/*<img id={"edit_img"} src={this.state.Edit_svg === true ? Edit_svg : Del_svg}*/}
                {/*onClick={this.del_or_edit.bind(this, data)}/>*/}
                {/*<img id={"down_img"} src={Down_svg}/>*/}
                <MusicTab onRef={(musictab) => this.musictab = musictab} fstate={this.state}/>
                <VideoTab onRef={(videotab) => this.videotab = videotab} fstate={this.state}/>
                <PictureTab onRef={(picturetab) => this.picturetab = picturetab} fstate={this.state}/>
                <div className={"pagination"}><Pagination showToal={2}
                                                          showSizeChanger
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
    editname = () => {
        this.forceUpdate();
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
                return UNK;
        }
    };

    getFileSize = (fileByte) => {
        var fileSizeByte = fileByte;
        var fileSizeMsg = "";
        if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(0) + "KB";
        else if (fileSizeByte === 1048576) fileSizeMsg = "1MB";
        else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(0) + "MB";
        else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
        else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(0) + "GB";
        else fileSizeMsg = "文件超过1TB";
        return fileSizeMsg;
    }


}

export default FileList;

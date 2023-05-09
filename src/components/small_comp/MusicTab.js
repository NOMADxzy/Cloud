import {Button, message, notification, Tooltip} from 'antd';
import React from 'react';
import {Progress, Drawer} from 'antd'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import AudioItem from './AudioItem'
import {CustomerServiceOutlined} from "@ant-design/icons";

// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';
class MusicTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0,
            mus_list: [],
            drawer: false
        };
        props.onRef(this);
    }

    next = () => {
        let i = this.state.idx + 1;
        if (i === this.state.mus_list.length) i = 0;
        this.setState({idx: i});
        this.child.changesrc(this.state.mus_list[i].Path);
        document.getElementById('music_title').innerHTML = this.state.mus_list[i].File_Name;
    };
    pre = () => {
        let i = this.state.idx - 1;
        if (i === -1) i = this.state.mus_list.length - 1;
        this.setState({idx: i});
        this.child.changesrc(this.state.mus_list[i].Path);
        document.getElementById('music_title').innerHTML = this.state.mus_list[i].File_Name;
    };

    playMusic = (item) => {
        const key = `open${Date.now()}`;
        axios.get(HOST + '/get_user_file', {
            params: {
                UID: this.props.fstate.UID,
                Del: 0,
                State: 3,
                Collect: 0,
                Share: 0,
                PageNum: 1,
                PageSize: 100,
            }
        })
            .then((res) => {
                //点击了右边栏，播放第一首
                if (item.Path === undefined) {
                    item = res.data[0];
                }
                //没有音乐
                if (item.Path === undefined) {
                    message.warn('您还没有音乐');
                    return;
                }
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].UUID === item.UUID) {
                        break;
                    }
                }
                setTimeout(() => {
                    this.setState({
                        mus_list: res.data,
                        idx: i,
                    });
                    const btn = (
                        <AudioItem Path={item.Path}
                                   onRef={(child) => this.child = child} next={this.next}
                                   pre={this.pre} showdrawer={this.showdrawer}/>
                    );
                    notification.open({
                        message: <b id={'music_title'}>{item.File_Name}</b>,
                        btn,
                        key,
                        duration: null,
                        placement: "bottomRight",
                        onClose: () => {
                            this.child.changesrc('');
                            this.showdrawer(false);
                        }
                    });
                })
            })
            .catch((err) => {
                console.log(err)
            });
    };
    onClose = () => {
        this.setState({
            drawer: false
        })
    };
    handleClick = (value) => {
        console.log(value);
        for (var i = 0; i < this.state.mus_list.length; i++) {
            if (this.state.mus_list[i].UUID === value.UUID) {
                break;
            }
        }
        this.setState({
            idx: i,
        });
        document.getElementById('music_title').innerHTML = value.File_Name;
        this.child.changesrc(value.Path);
    };
    showdrawer = (b) => {
        if (b === undefined) b = true;
        this.setState({drawer: b});
    };

    render() {
        return (
            <div>
                <Tooltip title={'播放音乐'} placement={'left'}>
                    <Button id={'music_right_bar'} onClick={this.playMusic} shape={'circle'}
                            icon={<CustomerServiceOutlined/>}/>
                </Tooltip>
                <Drawer
                    title="播放列表"
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawer}
                    zIndex={6}
                >
                    <div className={'music_list'}>
                        {this.state.mus_list.map(((value, key) => {
                            return (<p key={key} style={{color: this.state.idx === key ? '#66afe9' : ''}}
                                       onClick={() => this.handleClick(value)}>{value.File_Name}</p>)
                        }))
                        }
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default MusicTab;
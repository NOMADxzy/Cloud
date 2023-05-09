import {Button, message, notification, Tooltip} from 'antd';
import React from 'react';
import {Progress, Drawer} from 'antd'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import VideoItem from './VideoItem'
import {PlaySquareOutlined, PlusOutlined} from '@ant-design/icons'

// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';
class VideoTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0,
            mus_list: [],
            drawer: false
        };
        props.onRef(this);
    }

    playMusic = (item) => {
        const key = `open${Date.now()}`;
        axios.get(HOST + '/get_user_file', {
            params: {
                UID: this.props.fstate.UID,
                Del: 0,
                State: 2,
                Collect: 0,
                Share: 0,
                PageNum: 1,
                PageSize: 100,
            }
        })
            .then((res) => {
                // console.log(res);
                var m = -1;
                if (this.item) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].UUID === item.UUID) {
                            m = i;
                            break;
                        }
                    }
                }
                this.setState({
                    mus_list: res.data,
                    idx: m,
                    drawer: true
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };
    onClose = () => {
        this.setState({
            drawer: false,
            idx: -1
        });
    };

    render() {
        return (
            <div>
                <Tooltip title={'播放视频'} placement={'left'}>
                    <Button id={'video_bar'} onClick={this.playMusic} shape={'circle'} icon={<PlaySquareOutlined/>}/>
                </Tooltip>

                <Drawer
                    title="播放列表"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawer}
                    zIndex={6}
                    width={450}
                    height={200}
                >
                    <div className={'video_list'}>
                        {this.state.mus_list.map(((value, key) => {
                            return (<div className={'video_box'}>
                                <b>{value.File_Name}</b>
                                <VideoItem Path={value.Path} idx={key} autoplay={this.state.idx === key}
                                           playit={this.state.idx === key}/>
                            </div>)
                        }))
                        }
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default VideoTab;
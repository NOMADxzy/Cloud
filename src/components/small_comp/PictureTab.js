import {Button, message, notification, Tooltip} from 'antd';
import React from 'react';
import {Progress, Drawer, Image} from 'antd'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import VideoItem from './VideoItem'
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons'


// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';

class PictureTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0,
            pic_list: [],
            drawer: false,
        };
        props.onRef(this);
    }

    play = (item) => {
        axios.get(HOST + '/get_user_file', {
            params: {
                UID: this.props.fstate.UID,
                Del: 0,
                State: 1,
                Collect: 0,
                Share: 0,
                PageNum: 1,
                PageSize: 100,
            }
        })
            .then((res) => {
                // console.log(res);
                var m = 0;
                var pic_list = [];
                for (let i = 0; i < res.data.length; i++) {
                    pic_list.push(res.data[i].Path);
                    if (item.Path === res.data[i].Path) m = i;
                }
                this.setState({
                    pic_list: pic_list,
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
    changesrc = (idx) => {
        if (idx === this.state.pic_list.length) idx = 0;
        if (idx === -1) idx = this.state.pic_list.length - 1;
        this.setState({
            idx: idx
        })
    };

    render() {
        var pic_list = this.state.pic_list;
        return (
            <div>
                {/*<Tooltip title={'图片'} placement={'top'}>*/}
                {/*<Button id={'video_bar'} onClick={this.playMusic} shape={'circle'} icon={<MenuUnfoldOutlined/>}/>*/}
                {/*</Tooltip>*/}
                <Drawer
                    title={this.state.idx + '/' + this.state.pic_list.length}
                    placement="top"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.drawer}
                    zIndex={6}
                    height={450}
                >
                    {/*src={'http://8.141.72.17:9000/public/uploads/a964d973c0ea1fdb25e3ab45463f9aa9.jpg'*/}
                    <div className={'pic_bar'}>
                        <Button id={'pic_btn_left'} size={'large'} onClick={() => this.changesrc(this.state.idx - 1)}
                                icon={<ArrowLeftOutlined/>}/>
                        <a href={HOST + pic_list[this.state.idx]} target={'_blank'}>
                            <img id={'mid_pic'} src={HOST + pic_list[this.state.idx]}
                                 preview={false}
                            />
                        </a>
                        <Button id={'pic_btn_right'} size={'large'} onClick={() => this.changesrc(this.state.idx + 1)}
                                icon={<ArrowRightOutlined/>}/>
                    </div>

                </Drawer>
            </div>
        )
    }
}

export default PictureTab;
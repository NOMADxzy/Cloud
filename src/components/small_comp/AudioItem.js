/**
 * 音频播放组件
 */
import React from 'react';
import {Toast} from 'antd-mobile';
import {Slider, Button} from 'antd'
import {MenuUnfoldOutlined} from '@ant-design/icons'

import icon_play from '../../assets/images/svg/播放.svg';
import icon_pause from '../../assets/images/svg/暂停.svg';
import next from '../../assets/images/svg/下一项.svg';
import pre from '../../assets/images/svg/上一项.svg';

import '../../assets/css/AudioItem.css';
import {TablePipeline as state} from "ali-react-table";

// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';

class AudioItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCanPlay: false, // 判断音频是否加载完成
            playStatus: false, // 播放状态， true 播放中， false 暂停中，
            duration: 0, // 音频的时长
            currentDuration: 0, // 当前的播放时长
            src: ''
        };
        props.onRef(this);
    }

    // static defaultProps = {
    //     src: 'http://8.141.72.17:9000/public/uploads/6bfc6ee530851b53f2582a56d821fabe.mp3', // 音频地址
    // };

    audioItem = null; // 把dom暴露给外部使用
    audio = new Audio(); // 一个音频对象
    timer = null; // 做一个滑条的防抖
    interval = null; // 定时查询播放时的当前时间

    // 播放音频
    play = () => {
        this.audio.play();
        this.interval = setInterval(() => {
            const time = Math.floor(this.audio.currentTime);
            if (time < this.state.duration) {
                this.setState({
                    currentDuration: time
                });
            } else {
                // 播放结束后，直接重置播放时间，停止播放
                // Toast.info('播放完毕');
                clearInterval(this.interval);
                this.props.next();
                // this.audio.currentTime = 0;
                // this.audio.pause();
                this.setState({
                    currentDuration: 0,
                    // playStatus: false
                });
            }
        }, 1000);
    };

    // 暂停音频
    pause = () => {
        this.audio.pause();
        if (this.interval) {
            clearInterval(this.interval);
        }
    };

    // 播放状态切换
    handlePlayStatusChange = () => {

        const {playStatus, isCanPlay} = this.state;
        if (!playStatus) {
            this.play();
        } else {
            this.pause();
        }
        this.setState({
            playStatus: !playStatus
        });
    };

    handleSilderChange = (value) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        // 0.2s之内没有改动就修改当前的时间，做一个播放的防抖
        this.timer = setTimeout(() => {
            this.pause();
            this.audio.currentTime = value;
            this.setState({
                currentDuration: value
            }, () => {
                if (this.state.playStatus) {
                    this.play();
                }
            })
        }, 200);
    };

    init = () => {
        // let src = HOST+this.props.item.Path;
        let src = this.state.src;
        // const { src } = props || this.props.item.Path;

        if (!src) {
            return;
        }
        this.audio.preload = 'automatic';
        this.audio.src = src;
        this.audio.load();
        // this.audio.src = 'http://www.yinpin.com/upload/yingxiaobusanlingfuwu0413017j.mp3';
        // 监听音频的时长是否获取到了
        this.audio.ondurationchange = () => {
            const duration = Math.floor(this.audio.duration);
            this.setState({
                duration
            });
        }
        // 监听音频是否可以播放了
        this.audio.oncanplay = () => {
            const duration = Math.floor(this.audio.duration);
            this.setState({
                duration,
                isCanPlay: true
            });
            // if(this.state.isCanPlay) this.handlePlayStatusChange();
            this.play();
            this.setState({
                playStatus: true
            });
        }
    };

    componentDidMount() {
        this.changesrc(this.props.Path);
    }

    componentWillReceiveProps() {
        this.changesrc(this.props.Path);
    }

    changesrc = (Path) => {
        setTimeout(() => {
            this.setState({src: HOST + Path});
            this.init();
        })
    };

    componentWillUnmount() {
        this.changesrc('');
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.audio) {
            this.audio.currentTime = 0;
            this.audio.pause();
        }
    }


    render() {
        const {
            playStatus,
            duration,
            currentDuration
        } = this.state;
        const btn_img = playStatus ? icon_pause : icon_play;
        const durationStr = this.getDurationString(duration);
        const currentDurationStr = this.getDurationString(currentDuration);
        return (
            <div className="AudioItem" ref={audioItem => this.audioItem = audioItem}>
                <div className="audio-item">
                    {/* 播放按钮 */}

                    <div className="audio-item-btn">
                        <img src={pre} alt="icon" onClick={this.props.pre}/>
                        <img src={btn_img} alt="icon" onClick={this.handlePlayStatusChange}/>
                        <img src={next} onClick={this.props.next} alt="icon"/>
                    </div>
                    <div className="audio-item-content">
                        <div className="audio-item-top">
                            {/* 播放中的动画 */}
                            <div className={this.state.playStatus ? 'running' : 'pause'}>
                                <div className={"spinner"}>
                                    <div className="rect1"></div>
                                    <div className="rect2"></div>
                                    <div className="rect3"></div>
                                    <div className="rect4"></div>
                                    <div className="rect5"></div>
                                </div>
                            </div>
                            {/* 播放的时长 */}
                            <div className="audio-item-range">
                                <b className="audio-item-current">{currentDurationStr}</b>
                                <b className="audio-item-duration">{durationStr}</b>
                                <div><Button size={'small'} onClick={this.props.showdrawer}
                                             icon={<MenuUnfoldOutlined/>} id={'show_music_list_btn'}/></div>
                            </div>
                        </div>
                        <div className="audio-item-bottom">

                            <Slider
                                tooltipVisible={false}
                                style={{marginLeft: '0.34rem', marginRight: 0}}
                                value={currentDuration}
                                min={0}
                                max={duration}
                                onChange={this.handleSilderChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 根据秒数，返回对应的xx:xx的时间格式
    getDurationString = (number) => {
        let num = Number(number);
        if (isNaN(num) || num <= 0) {
            return '00:00';
        }
        if (num === Infinity) {
            return '00:00';
        }
        if (num < 60) {
            return `00:${num.toString().padStart(2, 0)}`;
        } else if (num < 3600) {
            const minute = Math.floor(num / 60);
            const second = num % 60;
            return `${minute.toString().padStart(2, 0)}:${second.toString().padStart(2, 0)}`
        } else {
            const hour = Math.floor(num / 3600);
            const minute = Math.floor((num - (hour * 3600)) / 60);
            const second = num - (hour * 3600) - (minute * 60);
            return `${hour.toString().padStart(2, 0)}:${minute.toString().padStart(2, 0)}:${second.toString().padStart(2, 0)}`;
        }
    };

}

export default AudioItem;
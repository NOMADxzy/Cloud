import React from 'react';
import {Link} from "react-router-dom";

class LeftTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            cur_item: 0,
            list: ["所有文件", "图片", "视频", "音乐", "文档", "收藏", "回收站", "我的分享", "空间详情"]
        }
    }

    changeItem = (e) => {
        this.setState({
            cur_item: e.target.innerHTML
        })
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            let name = this.props.appstate.user;
            this.setState({username: name});
        })
    }


    render() {
        return (
            <div>
                <p style={{display: "none"}}>{this.state.list[this.state.cur_item]}</p>
                <ul className={"tab"}>
                    <li><Link style={{color: this.state.cur_item === 0 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 0})
                    }} to={"/" + this.state.username + "/all"}>所有文件</Link></li>
                    <li><Link style={{color: this.state.cur_item === 1 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 1})
                    }} to={"/" + this.state.username + "/pic"}>图片</Link></li>
                    <li><Link style={{color: this.state.cur_item === 2 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 2})
                    }} to={"/" + this.state.username + "/vid"}>视频</Link></li>
                    <li><Link style={{color: this.state.cur_item === 3 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 3})
                    }} to={"/" + this.state.username + "/mus"}>音乐</Link></li>
                    <li><Link style={{color: this.state.cur_item === 4 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 4})
                    }} to={"/" + this.state.username + "/doc"}>文档</Link></li>
                    <li><Link style={{color: this.state.cur_item === 5 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 5})
                    }} to={"/" + this.state.username + "/like"}>收藏</Link></li>
                    <li><Link style={{color: this.state.cur_item === 6 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 6})
                    }} to={"/" + this.state.username + "/recycle"}>回收站</Link></li>
                    <li><Link style={{color: this.state.cur_item === 7 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 7})
                    }} to={"/" + this.state.username + "/share"}>我的分享</Link></li>
                    <li><Link style={{color: this.state.cur_item === 8 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 8})
                    }} to={"/" + this.state.username + "/useage"}>空间详情</Link></li>
                </ul>
            </div>
        )
    }
}

export default LeftTab;
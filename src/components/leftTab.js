import React from 'react';
import {Link} from "react-router-dom";

class LeftTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_item: 0
        }
    }

    // ischoosed=(i)=>{
    //     if(this.state.cur_item===i){
    //         return 'red'
    //     }else {
    //         return 'blue'
    //     }
    // }
    // change_item=(i)=>{
    //     this.setState({
    //         cur_item:1
    //     })
    // }


    render() {
        return (
            <div>
                <ul className="tab">
                    <li><Link style={{color: this.state.cur_item === 0 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 0})
                    }} to="/">所有文件</Link></li>
                    <li><Link style={{color: this.state.cur_item === 1 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 1})
                    }} to="/">图片</Link></li>
                    <li><Link style={{color: this.state.cur_item === 2 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 2})
                    }} to="/">视频</Link></li>
                    <li><Link style={{color: this.state.cur_item === 3 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 3})
                    }} to="/">音乐</Link></li>
                    <li><Link style={{color: this.state.cur_item === 4 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 4})
                    }} to="/">文档</Link></li>
                    <li><Link style={{color: this.state.cur_item === 5 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 5})
                    }} to="/">收藏</Link></li>
                    <li><Link style={{color: this.state.cur_item === 6 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 6})
                    }} to="/">回收站</Link></li>
                    <li><Link style={{color: this.state.cur_item === 7 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 7})
                    }} to="/">我的分享</Link></li>
                    <li><Link style={{color: this.state.cur_item === 8 ? "red" : "#357ebd"}} onClick={() => {
                        this.setState({cur_item: 8})
                    }} to="/">添加链接</Link></li>
                </ul>
            </div>
        )
    }
}

export default LeftTab;
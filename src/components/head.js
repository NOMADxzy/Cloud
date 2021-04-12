import React from 'react';
import '../assets/css/index.css';
import Logo from "../assets/images/logo.jpg"
import Fetchjsonp from 'fetch-jsonp';
import Axios from 'axios'
import Man_svg from "../assets/images/svg/man.svg"
import {Link} from "react-router-dom";

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head_img: '',
            name: '未登录'
        }
        props.onRef(this);
    }

    componentDidMount() {
        if (this.state.name === "未登录") {
            document.getElementById("input_box").style.display = "block";
        }
    }

    setName(name) {
        this.setState({
            name: name,
            head_img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3065335715,4197701299&fm=26&gp=0.jpg"
        })
    }

    render() {
        return (
            <div className="head">
                <span className={"artfont"}>
                    <img src={Logo}
                         height={50}/>
                <strong>CLoud云盘</strong>
                </span>
                <Link to="/"><b>云盘</b></Link>
                <Link to="/DICM"><b>相册</b></Link>
                <Link to="/More"><b>更多</b></Link>
                <span className={"dropdown"}>
                    <img id="man_svg" src={Man_svg}/>
                    <strong className="username" id={"username"}>{this.state.name}</strong>
                    <img className={"circle_img"} src={this.state.head_img}/>
                    <div className={"dropdown_content"}>
                        <a>更改头像</a>
                        <a onClick={() => {
                            document.getElementById("input_box").style.display = "block"
                        }}>修改密码</a>
                        <a>帮助中心</a>
                    </div>
                </span>
                <span className="search-wrapper">
                    <input ref={(input) => this.inputValue = input} onKeyUp={this.searchMsgK}
                           placeholder="搜索我的文件"/>
                    <button type="button" onChange={this.searchMsgB}>搜索</button>

                </span>
            </div>
        )
    }
}

export default Head;
import React from 'react';
import '../assets/css/index.css';
import Logo from "../assets/images/logo.jpg"
import Fetchjsonp from 'fetch-jsonp';
import Axios from 'axios'
import Man_svg from "../assets/images/svg/man.svg"
import {Link} from "react-router-dom";
import SearchWrap from './small_comp/SearchWrap'
import ChangePwd from './small_comp/ChangePwd'
import axios from 'axios'
import ChangeAvatar from "./small_comp/ChangeAvatar";

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head_img: '/public/avatar/default.jpeg',
            name: '未登录'
        };
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
        });
        axios.get('http://localhost:9000/get_avatar', {params: {UID: name}})
            .then((res) => {
                this.setState({head_img: res.data});
                this.chg_avt.changesrc(res.data);
            })
    }

    getName = () => {
        return this.state.name;
    };

    render() {
        return (
            <div className="head">
                <span className={"artfont"}>
                    <img src={Logo}
                         height={50}/>
                <strong>FileHub</strong>
                </span>
                <Link to={"/" + this.state.name + "/all"}><b>云盘</b></Link>
                <Link to="/DICM"><b>相册</b></Link>
                <Link to="/More"><b>空间详情</b></Link>
                <span className={"dropdown"}>
                    <img id="man_svg" src={Man_svg}/>
                    <strong className="username" id={"username"}>{this.state.name}</strong>
                    <img id={"circle_img"} src={'http://localhost:9000' + this.state.head_img}/>
                    <ChangeAvatar headstate={this.state} onRef={(c) => this.chg_avt = c}/>
                    <div className={"dropdown_content"}>
                        <a onClick={() => {
                            document.getElementById("change_avt").style.display = "block"
                        }}>更改头像</a>
                        <a onClick={() => {
                            document.getElementById("change_pwd").style.display = "block"
                        }}>修改密码</a>
                        <a>帮助中心</a>
                    </div>
                </span>
                <SearchWrap/>
            </div>
        )
    }
}

export default Head;
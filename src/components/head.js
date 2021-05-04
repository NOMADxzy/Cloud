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
import MyUpload from "./small_comp/MyUpload";
import {Tabs} from 'antd';

const {TabPane} = Tabs;

const HOST = 'http://8.141.72.17:9000';
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
        axios.get(HOST + '/get_avatar', {params: {UID: name}})
            .then((res) => {
                this.setState({head_img: res.data});
                this.chg_avt.changesrc(res.data);
            })
    }

    getName = () => {
        return this.state.name;
    };
    changeTopItem = (key) => {
        switch (key) {
            case '1':
                document.getElementById('FILE').click();
                break;
            case '2':
                document.getElementById('DICM').click();
                break;
            case '3':
                document.getElementById('More').click();
                break;
        }
    };
    render() {
        return (
            <div className="head">
                <span className={"artfont"}>
                    <img src={Logo}
                         height={50}/>
                <strong>FileHub</strong>
                </span>
                <span className={'top_tab'}>
                    <Tabs defaultActiveKey="1" onChange={this.changeTopItem} centered
                          size={'large'} tabBarGutter={30}>
                        <TabPane tab="文件" key="1"/>
                        <TabPane tab="相册" key="2"/>
                        <TabPane tab="空间" key="3"/>
                     </Tabs>
                </span>
                <Link to={"/" + this.state.name + "/all"}><p id={'FILE'} style={{display: 'none'}}>1</p></Link>
                <Link to={"/DICM"}><p id={'DICM'} style={{display: 'none'}}>1</p></Link>
                <Link to={"/More"}><p id={'More'} style={{display: 'none'}}>1</p></Link>
                {/*<span className={'top_tab'}>*/}
                {/*<Link to={"/" + this.state.name + "/all"}><b>云盘</b></Link>*/}
                {/*<Link to="/DICM"><b>相册</b></Link>*/}
                {/*<Link to="/More"><b>空间详情</b></Link>*/}
                {/*</span>*/}
                <SearchWrap/>
                <ChangeAvatar headstate={this.state} onRef={(c) => this.chg_avt = c}/>
                <span className={"dropdown"}>
                    <img id={"circle_img"} src={HOST + this.state.head_img}/>
                    <strong className="username" id={"username"}>{this.state.name}</strong>
                    <img id="man_svg" src={Man_svg}/>
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
            </div>
        )
    }
}

export default Head;
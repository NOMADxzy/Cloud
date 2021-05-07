import React from 'react';
import {Form, Input, Button, Checkbox, message, Image} from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../../assets/css/change_avt.css'
import Avatar_upload from '../../assets/images/svg/上传.svg'
import Avt_Upload from './Avatarupload'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

// const Demo = () => {
//
// }
const HOST = 'http://121.5.241.177:9000';
class ChangeAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            hot: [],
            cur_src: ''
        };
        if (props.onRef) {
            props.onRef(this);
        }
    }

    componentDidMount() {
        this.updateData();
    }

    setSrc = (src) => {
        this.setState({cur_src: src})
    };

    updateData = () => {
        let src = this.props.headstate.head_img;
        let src_list = [];
        let exist = [];
        for (let i = 1; i <= 5; i++) {
            let idx = Math.round(16 * Math.random());
            if (exist.indexOf(idx) >= 0) i--;
            else {
                exist.push(idx);
                src_list.push('/public/avatar/' + idx + '.jpg');
            }
        }
        this.setState({
            cur_src: src,
            hot: src_list
        });
    };

    submit = () => {
        document.getElementById("loading").style.visibility = "visible";
        let UID = this.props.headstate.name;
        axios.post(HOST + '/set_avatar', {avatar: this.state.cur_src, UID: UID})
            .then((res) => {
                document.getElementById('circle_img').src = HOST + this.state.cur_src;
                message.success("头像修改成功");
                document.getElementById('change_avt').style.display = 'none';
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                document.getElementById("loading").style.visibility = "hidden";
            })

    };
    changesrc = (src) => {
        this.setState({
            cur_src: src
        })
    };

    changepic = () => {
        document.getElementById('upload_avt').click();
    };

    render() {
        return (
            <div id={"change_avt"}>
                <div>
                    <i>热门头像</i>
                    {this.state.hot.map((value, key) => {
                        return (
                            <span className={'hot_img'} onClick={this.changesrc.bind(this, value)}><Image width={30}
                                                                                                          height={30}
                                                                                                          src={HOST + value}
                                                                                                          preview={false}
                                                                                                          alt={"图片"}/></span>
                        )
                    })}
                    <Button id={'refresh_hot_img'} size={'small'} onClick={this.updateData}>换一批</Button>
                </div>
                <div id={"avatar"}>
                    <img id={'upload_svg'} onClick={this.changepic} src={Avatar_upload}/>
                    <Image src={HOST + this.state.cur_src} width={120} height={120} preview={false}/>
                </div>
                <div className={'opt_buts'}>
                    <Button type={'primary'} onClick={this.submit}>提交</Button>
                    <Button onClick={() => document.getElementById('change_avt').style.display = 'none'}>取消</Button>
                </div>
                <Avt_Upload changesrc={(src) => {
                    this.changesrc(src)
                }}/>
            </div>
        )
    }
}

export default ChangeAvatar;
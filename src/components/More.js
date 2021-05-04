import React from 'react';
import {Progress} from 'antd'
import axios from 'axios'
import VideoItem from './small_comp/VideoItem'
import VideoTab from "./small_comp/VideoTab";

const HOST = 'http://8.141.72.17:9000';
class Useage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sizelist: [],
            percentlist: [],
            useage: 0
        }
    }

    componentDidMount() {
        document.getElementById("loading").style.visibility = "visible";
        axios.get(HOST + '/get_file_size?UID=' + document.getElementById("username").innerText)
            .then((res) => {
                // console.log(res.data);
                // let pic = res.data[0].Space;
                // let vid = res.data[1].Space;
                // let mus = res.data[2].Space;
                // let doc = res.data[3].Space;
                // let other = res.data[4].Space;
                // let all = pic+vid+mus+doc+other;
                // console.log(all);
                var sum = 0;
                var sizelist = [];
                var percentlist = [];
                for (let i = 0; i < 5; i++) {
                    sizelist.push(res.data[i].Space);
                    sum += res.data[i].Space;
                }
                if (sum === 0) sum = 1;
                for (let i = 0; i < 5; i++) {
                    percentlist.push(('' + sizelist[i] * 100 / sum).substr(0, 4));
                }
                console.log(sizelist);
                console.log(percentlist);
                let sum_fix = sum * 10 / (1024 * 1024 * 1024 * 8);
                if (sum_fix < 0.01) sum_fix = 0;
                this.setState({
                    sizelist: sizelist,
                    percentlist: percentlist,
                    useage: ('' + sum_fix).substr(0, 4)
                })
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                document.getElementById("loading").style.visibility = "hidden";
            })

    }

    render() {
        return (
            <div className={"useage"}>总容量：10GB

                <div id={"circle_progress"}>

                    <Progress type={"circle"} percent={this.state.useage} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}/>
                </div>
                <div>图片:{this.getFileSize(this.state.sizelist[0])}<Progress percent={this.state.percentlist[0]}/></div>
                <div>视频:{this.getFileSize(this.state.sizelist[1])}<Progress percent={this.state.percentlist[1]}/></div>
                <div>音乐:{this.getFileSize(this.state.sizelist[2])}<Progress percent={this.state.percentlist[2]}/></div>
                <div>文档:{this.getFileSize(this.state.sizelist[3])}<Progress percent={this.state.percentlist[3]}/></div>
                <div>其他:{this.getFileSize(this.state.sizelist[4])}<Progress percent={this.state.percentlist[4]}/></div>
            </div>
        )
    }

    getFileSize = (fileByte) => {
        // if(fileByte==undefined) ret
        var fileSizeByte = fileByte;
        var fileSizeMsg = "";
        if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(0) + "KB";
        else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
        else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(0) + "MB";
        else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
        else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(0) + "GB";
        else fileSizeMsg = "文件超过1TB";
        return fileSizeMsg;
    }
}

export default Useage;
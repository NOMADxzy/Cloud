import React from 'react';
import {Progress} from 'antd'

class Useage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            used_percent: 0,
            pic: 0,
            vid: 0,
            mus: 0,
            doc: 0
        }
    }

    render() {
        return (
            <div className={"useage"}>
                <div id={"circle_progress"}>
                    <Progress type={"circle"} percent={70} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}/>
                </div>
                <div>视频:<Progress percent={50}/></div>
                <div>图片:<Progress percent={10}/></div>
                <div>文档:<Progress percent={5}/></div>
                <div>音乐:<Progress percent={5}/></div>
                <div>其他:<Progress percent={0}/></div>
            </div>
        )
    }
}

export default Useage;
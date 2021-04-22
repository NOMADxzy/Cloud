import React from 'react';
import like_0 from '../../assets/images/svg/like_0.svg'
import like_1 from '../../assets/images/svg/like_1.svg'
import axios from 'axios'
import {message} from 'antd'

class LikeBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isliked: false,
            UUID: ""
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                UUID: this.props.filestate.UUID,
                isliked: this.props.filestate.Collect == 1
            })
        })
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({
                UUID: this.props.filestate.UUID,
                isliked: this.props.filestate.Collect == 1
            })
        })
    }

    change_like_state = () => {
        var newstate = !this.state.isliked;
        this.setState({
            isliked: newstate
        });
        let UID = document.getElementById("username").innerText;
        axios.get('http://localhost:9000/collect_file', {params: {UUID: this.state.UUID, UID: UID}})
            .catch(() => {
                message.error("收藏失败")
            });
    };

    render() {
        return (
            <span onClick={() => {
                this.change_like_state()
            }}>
                {this.state.isliked === true ? <img className={"likebtn_img"} src={like_1}/> :
                    <img className={"likebtn_img"} src={like_0}/>}
            </span>
        )
    }
}

export default LikeBtn;
import React from 'react';
import like_0 from '../../assets/images/svg/like_0.svg'
import like_1 from '../../assets/images/svg/like_1.svg'

class LikeBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isliked: false,
            id: ""
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                id: this.props.filestate.UUID,
                isliked: this.props.filestate.Collect == 1
            })
        })
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({
                id: this.props.filestate.UUID,
                isliked: this.props.filestate.Collect == 1
            })
        })
    }

    change_like_state = () => {
        var newstate = !this.state.isliked;
        this.setState({
            isliked: newstate
        })
        console.log("收藏了" + this.state.id)
    }

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
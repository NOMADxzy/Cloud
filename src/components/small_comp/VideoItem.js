import React from 'react';
import {Progress} from 'antd'
import {Player} from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

const HOST = 'http://8.141.72.17:9000';

class VideoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        };
        // props.onRef(this);
    }

    play = () => {
        this.player.play();
    };

    pause = () => {
        this.player.pause();
    };


    componentWillMount() {
        this.setState({
            src: HOST + this.props.Path
        });
    }

    // componentWillReceiveProps(){
    //     if(this.props.playit){
    //         this.play();
    //         // alert('ok')
    //     }else {
    //         this.pause();
    //     }
    // }


    render() {
        return (
            <div>
                {/*<button onClick={this.play} id={'play'+this.props.idx}>ok</button>*/}
                {/*<button onClick={this.pause} id={'pause'+this.props.idx}>ok</button>*/}
                <Player
                    playsInline
                    ref={player => {
                        this.player = player;
                    }}
                    autoPlay={this.props.autoplay}
                    // poster="/assets/poster.png"
                    src={this.state.src}
                />
            </div>
        )
    }
}

export default VideoItem;
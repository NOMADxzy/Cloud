import React from 'react';
import axios from 'axios'
import {message} from 'antd'

// const HOST = 'http://121.5.241.177:9000';
const HOST = 'http://localhost:9000';
class Edit_title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: ''
        }
    }

    OnChange = (e) => {
        this.setState({
            filename: e.target.value
        });
    };
    Submit = (e) => {
        axios.post(HOST + '/change_file_name', {
            UUID: this.props.data[this.props.index].UUID,
            NAME: e.target.value
        })
            .then((res) => {
                // console.log(res);
                // console.log("修改为" + e.target.value);
                this.props.data[this.props.index].File_Name = e.target.value;
                this.props.update();
                message.success("修改为" + e.target.value);
            })
            .catch((err) => {
                console.log(err)
            });
        e.target.style.display = "none";
        document.getElementById("title" + this.props.index).style.display = "inline";
    };

    render() {
        return (
            <input className={'edit_title'} id={"edit_title" + this.props.index}
                   value={this.state.filename}
                   onChange={(e) => {
                       this.OnChange(e)
                   }}
                   onBlur={(e) => this.Submit(e)}
            />
        )
    }
}

export default Edit_title;
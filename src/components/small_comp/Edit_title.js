import React from 'react';

class Edit_title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: ''
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         filename:this.props.filename
    //     })
    // }
    OnChange = (e) => {
        this.setState({
            filename: e.target.value
        });
    };
    Submit = (e) => {
        console.log("修改为" + e.target.value);
        this.props.data[this.props.index].File_Name = e.target.value;
        this.props.update();
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
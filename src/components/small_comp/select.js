import React from 'react';
import Select_0 from "../../assets/images/svg/select_0.svg"
import Select_1 from "../../assets/images/svg/select_1.svg"

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "未收到",
            selected: false
        };
        // props.onRef(this);
    }

    componentWillReceiveProps() {
        this.setState({
            id: this.props.index,
            selected: false
        })
    }

    HandelSelect = () => {
        var b = !this.state.selected;
        this.setState({
            selected: b
        });
        this.props.addSelect(this.state.id);
    };

    render() {
        return (
            <img className={"select_svg"} src={this.state.selected === true ? Select_1 : Select_0} onClick={() => {
                this.HandelSelect()
            }}/>
        )
    }
}

export default Select;
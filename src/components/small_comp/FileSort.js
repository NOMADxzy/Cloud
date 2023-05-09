import React from 'react';
import {Select} from 'antd'

const {Option} = Select;

class FileSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (value) => {
        this.props.callfilelistapi(value);
    };

    render() {
        return (
            <Select defaultValue="日期" style={{width: 80}} size={'small'} onChange={this.handleChange}>
                <Option value="Mtime">日期</Option>
                <Option value="Size">大小</Option>
            </Select>
        )
    }
}

export default FileSort;
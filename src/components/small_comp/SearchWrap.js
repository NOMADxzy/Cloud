import React from 'react';
import {Progress} from 'antd'
import {Link} from 'react-router-dom'

class SearchWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        }
    }

    change = (e) => {
        this.setState({
            val: this.inputValue.value
        })
    };
    searchFile = () => {
        this.searchkey.click();
        this.inputValue.value = '';
    }

    render() {
        return (
            <span className="search-wrapper">
                    <input ref={(input) => this.inputValue = input} placeholder="搜索我的文件" onChange={this.change}/>
                    <button type="button" onClick={this.searchFile}>搜索</button>
                <Link to={"?keyword=" + this.state.val}><a ref={(searchkey) => {
                    this.searchkey = searchkey
                }} style={{display: "none"}}/></Link>
            </span>
        )
    }
}

export default SearchWrap;
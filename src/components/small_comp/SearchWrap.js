import React from 'react';
import {Progress, Button} from 'antd'
import {Link} from 'react-router-dom'
import {SearchOutlined, LoadingOutlined} from '@ant-design/icons'

class SearchWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: '',
            icon: <SearchOutlined/>
        }
    }

    change = (e) => {
        this.setState({
            val: this.inputValue.value
        })
    };
    searchFile = (e) => {
        this.setState({icon: <LoadingOutlined/>});
        this.searchkey.click();
        setTimeout(() => {
            this.inputValue.value = '';
            this.setState({icon: <SearchOutlined/>});
        }, 500);
    };

    render() {
        return (
            <span className="search-wrapper">
                    <input ref={(input) => this.inputValue = input} placeholder="搜索我的文件" onChange={this.change}/>
                <Button type="primary" ref={(searchBtn) => this.searchBtn = searchBtn}
                        onClick={(e) => this.searchFile(e)} icon={this.state.icon}>搜索</Button>
                <Link to={"?keyword=" + this.state.val}><a ref={(searchkey) => {
                    this.searchkey = searchkey
                }} style={{display: "none"}}/></Link>
            </span>
        )
    }
}

export default SearchWrap;
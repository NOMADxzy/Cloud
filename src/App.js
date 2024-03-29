import './assets/css/index.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Files from './components/FileList'
import Useage from './components/useage'

import Head from './components/head'
import DICM from './components/DICM'
import InputBox from './components/small_comp/InputBox'
import More from './components/More'
import Tab from './components/leftTab'
import ChangePwd from "./components/small_comp/ChangePwd";
import ChangeAvatar from "./components/small_comp/ChangeAvatar";
import Loading from "./components/small_comp/Loading";
import AudioItem from './components/small_comp/AudioItem'
import {Button} from 'antd'



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            user: '未登录'
        }
    }

    searchMsgK = (e) => {
        if (e.keyCode === 13) {
            alert(this.inputValue.value)
        }

    }
    searchMsgB = () => {
        this.searchMsgK();
    };
    setUser = (name) => {
        this.setState({user: name});
        this.head.setName(name);
    };

//<Route path={'/loginPage'} component={LoginPage}></Route>
    render() {
        return (
            <Router>
                <div className={'body'}>
                    < Head onRef={(head) => {
                        this.head = head
                    }}/>
                    <InputBox set_user={(name) => {
                        this.setUser(name)
                    }}/>
                    <ChangePwd UID={this.state.user}/>
                    <div id={'loading'}><Loading/></div>
                    <Tab appstate={this.state}/>
                    <article className={'left'}>
                        <Route exact path="/" component={Files}/>
                        <Route path="/DICM" component={DICM}/>
                        <Route path="/More" component={More}/>
                        {/*<Route exact path="/:UID" component={Files}/>*/}
                        <Route exact path="/:UID/:type" component={Files}/>
                        <Route path="/:UID/useage" component={Useage}/>
                    </article>
                </div>
            </Router>

        );
    }
}

export default App;

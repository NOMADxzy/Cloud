import './assets/css/index.css';
import Axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import All from './components/AllFiles'
import Head from './components/head'
import Tail from './components/tail'
import LeftTab from './components/leftTab'
import DICM from './components/DICM'
import Yule from './components/yule'
import Select from './components/small_comp/select'
import InputBox from './components/small_comp/InputBox'
import Edit_title from './components/small_comp/Edit_title'
import Login from './components/login'
import Me from './components/me';
import Content from './components/content'
import Add from './components/Add'
import Edit from './components/Edit'
import Tab from './components/leftTab'

// import LoginPage from './components/loginPage/loginPage'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
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
                    <Tab/>
                    <article className={'left'}>
                        <Route exact path="/" component={All}/>
                        <Route path="/DICM" component={DICM}/>
                        <Route path="/youxi" component={Select}/>
                        <Route path="/yule" component={Yule}/>
                        <Route path="/shuma" component={Edit_title}/>
                        <Route path={'/content/:id'} component={Content}></Route>
                        <Route path="/Add" component={Add}/>
                        <Route path="/Edit/:name" component={Edit}/>

                    </article>
                    {/*<Me/>*/}
                </div>


            </Router>

        );
    }
}

export default App;

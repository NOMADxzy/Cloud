import './assets/css/index.css';
import Axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Files from './components/AllFiles'
import Pic from './components/pic'
import Vid from './components/vid'
import Mus from './components/mus'
import Docu from './components/doc'
import Useage from './components/useage'

import Head from './components/head'
import DICM from './components/DICM'
import InputBox from './components/small_comp/InputBox'

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
                        <Route exact path="/" component={Files}/>
                        <Route path="/DICM" component={DICM}/>
                        <Route path="/pic" component={Pic}/>
                        <Route path="/vid" component={Vid}/>
                        <Route path="/mus" component={Mus}/>
                        <Route path="/doc" component={Docu}/>
                        <Route path="/useage" component={Useage}/>

                    </article>
                    {/*<Me/>*/}
                </div>


            </Router>

        );
    }
}

export default App;

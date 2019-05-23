import React,{Component} from "react";
import ReactDom from "react-dom";
import { HashRouter, Router,Route, Switch } from "react-router-dom";

import Index from '../pages/index';
import Rules from '../pages/rules';
import RulesOne from '../pages/rulesOne';

import store from '../Redux/Store/store'
import {Provider} from 'react-redux';
class App extends Component {
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/rules" component={Rules}></Route>
                    <Route path="/rulesOne" component={RulesOne}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
ReactDom.render(
    // <App/>,
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
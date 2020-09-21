import React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import LoginView from "./view/LoginView"
import BookView from "./view/BookView"
import AdminView from "./view/AdminView";
import {history} from "./utils/history";
import CartView from "./view/CartView";
import OrderView from "./view/OrderView";

export default class BasicRouter extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/explore" component={BookView}/>
                    <Route exact path="/admin" component={AdminView}/>
                    <Route path="/explore/:bookID" component={BookView}/>
                    <Route exact path="/login" component={LoginView}/>
                    <Route exact path="/cart" component={CartView}/>
                    <Route exact path="/orders" component={OrderView}/>
                    <Redirect to="/explore"/>
                </Switch>
            </Router>
        )
    }
}
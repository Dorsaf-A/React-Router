import React,{useState} from 'react';
import { Link, Route, Switch,Redirect } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import {data} from './ProductsData'
import Category from "./Category";
import Products from "./Products";
import Home from './Home'



const App = () => {
  const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100);
    }
  }

    const PrivateRoute = ({component: Component, authed, ...rest}) => {
      return (
        <Route
          {...rest}
          render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/Login', state: {from: props.location}}} />} />
      )
    }
   
    class Login extends React.Component {
      state = {redirectToReferrer: false
  };
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/products" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at /admin</p>
        <button className="myButton" onClick={this.login}>
          Log in
        </button>
      </div>
    );
  }
}


  return (<Router>
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          
          <li>
            <Link to="/">Homes</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
          {/* <li>
             <Link to="/products">Products</Link> 
          </li> */}
          <li>
          <Link to="/login">Admin area</Link>
          </li>
          
        </ul>
      </nav>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/category" component={Category} />
        <Route path="/products" component={Products} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/products" component={Products} />
      </Switch>
      
    </div>
    </Router>
  );
};

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PurchaseHistory from "./pages/PurchaseHistory";
import Home from './pages/Home';
import BuyerLogin from './pages/BuyerLogin';
import SellerLogin from './pages/SellerLogin';
import Seller from './pages/Seller';
import ItemPage from './pages/ItemPage';
import Selling from './pages/Selling';
import BuyerPage from './pages/BuyerPage';
import ItemList from './pages/ItemList';

const App = () => {
  let { match } = useRouteMatch();

  return (
    <div className="background">
      <div className="border">
        <div className="nav-bar">
          <span className="block">
            {/*Easy access to any page right now, change when auth implemented*/}
            <Link to="/Home">Home</Link>
          </span>
          <span className="block">
            <Link to="/buyerlogin">BuyerLogin</Link>
          </span>
          <span className="block">
            <Link to="/sellerlogin">SellerLogin</Link>
          </span>
          <span className="block">
            <Link to="/Seller">Seller</Link>
          </span>
          <span className="block">
            <Link to="/Buyer">Buyer</Link>
          </span>
          <span className="block">
            <Link to="/item">ItemPage</Link>
          </span>
          <span className="block">
            <Link to="/itemlist">List of Items</Link>
          </span>
          <span className="block">
            <Link to="/purchase-history">Purchase History</Link>
          </span>
        </div>
        <Switch>
        <Route path="/Seller">
          <Seller />
        </Route>
          
          <Route path="/Home" component={Home} />
          <Route path="/item" component={ItemPage} />
          <Route path="/purchase-history" component={PurchaseHistory} />
          <Route path="/buyer" component={BuyerPage} />
          <Route path="/itemlist" component={ItemList} />
          {/* <Route path="/Selling" component={Selling} /> */}
          
          <Route path="/buyerlogin" component={BuyerLogin} />
          <Route path="/sellerlogin" component={SellerLogin} />
         
        </Switch>
      </div>
    </div>
  );
};

export default App;

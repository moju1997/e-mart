import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/cart/Cart';
import Default from './components/Default';
import Details from './components/Details';
import Modal from './components/Modal';
import FooterPage from './components/FooterPage';

class App extends React.Component {
  render() {
    return (

     <React.Fragment>
       <Navbar />
       <Switch>
         <Route   exact path='/' component={ProductList}/>
         <Route  path='/details' component={Details}/>
         <Route path='/cart' component={Cart} />
         <Route  component={Default}/>
         
       </Switch>
       <FooterPage />
       <Modal />
       
      </React.Fragment>
    );
  }
}

export default App;

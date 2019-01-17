import React, { Component } from 'react';

class CartColumns extends Component {
    render() {
        return (
            <div className='container-fluid text-center d-none d-lg-block'>
            <div className='row'>

            <div className='col-10 mx-auto col-lg-2'>
            <p className='text-upper'>products</p>
            </div>

            <div className='col-10 mx-auto col-lg-2'>
            <p className='text-upper'>Name of Products</p>
            </div>

            <div className='col-10 mx-auto col-lg-2'>
            <p className='text-upper'>price</p>
            </div>

            <div className='col-10 mx-auto col-lg-2'>
            <p className='text-upper'>Quantity</p>
            </div>

            <div className='col-10 mx-auto col-lg-2'>
            <p className='text-upper'>remove</p>
            </div>

            <div className='col-10 mx-auto col-lg-2'>
            <p className='text-upper'>total</p>
            </div>

            </div>    
            </div>
        );
    }
}

export default CartColumns;
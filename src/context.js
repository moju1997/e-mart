import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data'

const ProductContext=React.createContext()


class ProductProvider extends Component {
    state={
        products:[],
        detailProduct:detailProduct
    }
    componentDidMount(){
      this.setProducts();
    }
    setProducts=()=>{
      let products=[];
      storeProducts.forEach(item=>{
        const singleItem={...item};
        products=[...products,singleItem]
      })
      this.setState(()=>{
        return{products:products}
      })
    }
    handleDetail =()=>{
        console.log('hello from details')
    }
    addToCart =id=>{
        console.log(`hello from add to cart ${id}`)
    }
    // tester=()=>{
    //   console.log('the state product  is:',this.state.products[0].inCart);
    //   console.log('the data product  is:',storeProducts[0].inCart);

    //   const tempProducts=[...this.state.products];
    //   tempProducts[0].inCart=true;
    //   this.setState(()=>{
    //     return{products:tempProducts}
    //   },()=>{
    //     console.log('the state product  is:',this.state.products[0].inCart);
    //   console.log('the data product  is:',storeProducts[0].inCart); 
    //   })
    // }
  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail:this.handleDetail,
        addToCart:this.addToCart
      }}>
      {/* <button onClick={this.tester}>test me</button> */}
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer=ProductContext.Consumer;

export {ProductProvider,ProductConsumer};

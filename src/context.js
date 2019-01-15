import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data'


const ProductContext = React.createContext()


class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem]
    })
    this.setState(() => {
      return { products: products }
    })
  }
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  }
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product }
    })
  }
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return { product: tempProducts, cart: [...this.state.cart, product] };

    }, () => { console.log(this.state) }
    )
  }
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true }
    })
  }
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false }
    })
  }
  increment = (id) => {
    console.log('this is increment method');
  }
  decrement = (id) => {
    console.log('this is decrement method');
  }
  removeItem = (id) => {
    console.log('item removed');
  }
  clearCart = () => {
    console.log('cart cleared');
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
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        openModal: this.openModal,
        closeModal: this.closeModal,
        increment:this.increment,
        decrement:this.decrement
      }}>
        {/* <button onClick={this.tester}>test me</button> */}
        {this.props.children}

      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

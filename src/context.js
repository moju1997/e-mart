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

    }, () => { 
      this.addTotal();
     }
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
    let tempCart=[...this.state.cart];
    const selectedProduct=tempCart.find(item=>item.id=== id);

    const index=tempCart.indexOf(selectedProduct);
    const product=tempCart[index];

    product.count=product.count+1;
    product.total=product.count*product.price;

    this.setState(()=>{
      return {cart:[...tempCart]}
    },()=>{
      this.addTotal();
    })
  }
  decrement = (id) => {
    let tempCart=[...this.state.cart];
    const selectedProduct=tempCart.find(item=>item.id=== id);

    const index=tempCart.indexOf(selectedProduct);
    const product=tempCart[index];

    product.count=product.count-1;

    if(product.count===0){
      this.removeItem(id);
    }
    else {
      product.total=product.count*product.price;
      
      this.setState(()=>{
        return {cart:[...tempCart]}
      },()=>{
        this.addTotal();
      });
    }

  }
  removeItem = (id) => {
    let tempProducts=[...this.state.products];
    let tempCart=[...this.state.cart];

    tempCart=tempCart.filter(item=>item.id !==id);

    const index=tempProducts.indexOf(this.getItem(id));
    let removedProduct=tempProducts[index];
    removedProduct.inCart=false;
    removedProduct.count=0;
    removedProduct.total=0;

    this.setState(()=>{
      return{
        cart:[...tempCart],
        product:[...tempProducts]
      }
    },()=>{
      this.addTotal();
    })

  }
  clearCart = () => {
    this.setState(()=>{
      return {cart:[]}
    },()=>{
      this.setProducts();
      this.addTotal();
    })
  }
  addTotal =()=>{
    let SubTotal=0;
    this.state.cart.map(item=>(SubTotal+=item.total));
    const tempTax=SubTotal*0.18;
    const tax=parseFloat(tempTax.toFixed(2));
    const total=SubTotal+tax;
    this.setState(()=>{
      return {
        cartSubTotal:SubTotal,
        cartTax:tax,
        cartTotal:total
      };
    });
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
        decrement:this.decrement,
        removeItem:this.removeItem,
        clearCart:this.clearCart
      }}>
        {/* <button onClick={this.tester}>test me</button> */}
        {this.props.children}

      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

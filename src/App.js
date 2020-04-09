import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {

  constructor(){
    super();
    this.state={
        products: [],
        loading: true
    }
    this.db = firebase.firestore();
}

componentDidMount() {
  this.db
    .collection('products')
    .onSnapshot((snapshot) => {
      console.log(snapshot);

      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();

        data['id'] = doc.id
        return data;
      })

      this.setState({
        products,
        loading: false
      })
    })
    
}
handleIncreasingQuantity = (product) => {
    console.log('hey please inc qty of', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    // this.setState({
    //     products: products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('Updated successfully')
      })
      .catch((error) => {
        console.log('Error : ', error);
      })
}
handleDecreasingQuantity = (product) => {
    console.log('hey please dec qty of', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('Updated successfully')
      })
      .catch((error) => {
        console.log('Error : ', error);
      })
}
handleDeleteProduct = (id) => {
    const {products} = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
        products: items
    })
}   

  getCartCount = () => {

    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })
    return count;
  }
  getCartTotal = () =>{
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })
    return cartTotal;
  }

  addProduct = () => {
    this.db
    .collection('products')
    .add({
      img: '',
      price: 900,
      qty: 3,
      title: 'Washing Machine'
    })
    .then((docRef) => {
      console.log('Product has been added', docRef);
    })
    .catch((error) => {
      console.log('Error : ', error);
    })
  }
  render () {
    const { products, loading } = this.state;
    return (

      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20}}>Add a product</button>
        {/* <h1>Cart</h1> */}
        <Cart 
          products={products}
          onIncreaseQuantity = {this.handleIncreasingQuantity}
          onDecreaseQuantity = {this.handleDecreasingQuantity}
          onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products</h1>}
        <div style={ {padding: 10, fontSize: 20} }> Total: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;

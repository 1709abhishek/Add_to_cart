import React from 'react';
import CartItem from './CartItem'
class Cart extends React.Component{
    constructor(){
        super();
        this.state={
            products: [
                {
                    price: 99,
                    title: 'Watch',
                    qty: 1,
                    img: '',
                    id: 1
                },
                {
                    price: 999,
                    title: 'Mobile Phone',
                    qty: 10,
                    img: '',
                    id: 2
                },
                {
                    price: 999,
                    title: 'Laptop',
                    qty: 4,
                    img: '',
                    id: 3
                }
            ]
        }
    }
    handleIncreasingQuantity = (product) => {
        console.log('hey please inc qty of', product);
        const { products } = this.state;
        const index = products.indexOf(product);

        products[index].qty += 1;
        this.setState({
            products: products
        })
    }
    handleDecreasingQuantity = (product) => {
        console.log('hey please dec qty of', product);
        const { products } = this.state;
        const index = products.indexOf(product);

        products[index].qty -= 1;
        this.setState({
            products: products
        })
    }
    render() {
        const { products } = this.state;
        return (
            <div className="cart">
                {products.map ((product) => {
                    return <CartItem 
                                product={product} 
                                key={ product.id }
                                onIncreaseQuantity = {this.handleIncreasingQuantity}
                                onDecreaseQuantity = {this.handleDecreasingQuantity}
                            />

                })}
            </div>
        )
    }
}
export default Cart;
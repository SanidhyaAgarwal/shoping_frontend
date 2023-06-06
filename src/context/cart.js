import { createContext, useContext, useState } from "react"

const initialState = {
    cart: [],
    cartItemCount: () => 0,
    addToCart: () => null,
    removeFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
}

const CartContext = createContext(initialState)

const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(initialState.cart)

    const cartItemCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0)
    }

    const addToCart = (product) => {
        console.log('hi',product);
        const productIdx = cart.findIndex((item) => { 
            console.log(item);
            return item.product.prodId === product.prodId 
        })
        console.log(productIdx);
        if (productIdx !== -1) {
            increaseQuantity(product.prodId)
        } else {
            setCart([...cart, { product, quantity: 1 }])
        }
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product.prodId !== productId))
    }

    const increaseQuantity = (productId) => {
        const copy = cart.slice()
        console.log('sup shorty',copy);
        const productIdx = copy.findIndex((item) => item.product.prodId === productId)
        if (productIdx !== -1) {
            copy[productIdx].quantity += 1
            setCart(copy)
        }
    }

    const decreaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.prodId === productId)
        if (productIdx !== -1 && copy[productIdx].quantity > 1) {
            copy[productIdx].quantity -= 1
            setCart(copy)
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, cartItemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { useCart, CartProvider }

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CART_KEY = 'plateform_cart'
const emptyCart = { restaurantId: null, restaurantName: '', items: [] }

const loadCart = () => {
    try {
        const stored = localStorage.getItem(CART_KEY)
        return stored ? JSON.parse(stored) : emptyCart
    }
    catch {
        return emptyCart
    }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const { user, isLoading } = useAuth()
    const [cart, setCart] = useState(loadCart)

    // Keep localStorage in sync with the cart
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
    }, [cart])

    // Empty the cart when nobody is logged in
    useEffect(() => {
        if (!isLoading && !user) setCart(emptyCart)
    }, [user, isLoading])

    const addItem = (restaurant, dish) => {
        const hasOtherRestaurant =
            cart.items.length > 0 && cart.restaurantId !== restaurant._id

        if (hasOtherRestaurant) {
            const startNew = window.confirm(
                `Your cart has items from ${cart.restaurantName}. Start a new cart with ${restaurant.name}?`
            )
            if (!startNew) return
        }

        setCart((prev) => {
            const base =
                prev.restaurantId === restaurant._id
                    ? prev
                    : { restaurantId: restaurant._id, restaurantName: restaurant.name, items: [] }

            const existing = base.items.find((item) => item.menuItemId === dish._id)

            const items = existing
                ? base.items.map((item) =>
                      item.menuItemId === dish._id ? { ...item, quantity: item.quantity + 1 } : item
                  )
                : [
                      ...base.items,
                      {
                          menuItemId: dish._id,
                          name: dish.name,
                          description: dish.description,
                          price: dish.price,
                          imageUrl: dish.imageUrl,
                          quantity: 1,
                      },
                  ]

            return { ...base, items }
        })
    }

    // Going down to 0 removes the item
    const changeQuantity = (menuItemId, delta) => {
        setCart((prev) => ({
            ...prev,
            items: prev.items
                .map((item) =>
                    item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter((item) => item.quantity > 0),
        }))
    }

    const removeItem = (menuItemId) => {
        setCart((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.menuItemId !== menuItemId),
        }))
    }

    const clearCart = () => setCart(emptyCart)

    const getQuantity = (menuItemId) =>
        cart.items.find((item) => item.menuItemId === menuItemId)?.quantity || 0

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ cart, addItem, changeQuantity, removeItem, clearCart, getQuantity, totalItems }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
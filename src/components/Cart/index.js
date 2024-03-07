import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const removing = () => removeAllCartItems()

      const l = cartList.length
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button className="but" onClick={removing} type="button" data-testid = "remove">
                  Remove All
                </button>
                <CartListView />
                <div className="first">
                  <h1 className="para">
                    Order Total:{' '}
                    <span className="s1">
                      Rs{' '}
                      {cartList.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0,
                      )}
                      /-
                    </span>
                  </h1>
                  <p className="para1">{l} items in cart</p>
                  <button className="but6" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart

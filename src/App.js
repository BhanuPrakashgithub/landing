import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = ids => {
    const {cartList} = this.state
    const update = cartList.map(each => {
      if (each.id === ids) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: update})
  }

  decrementCartItemQuantity = (ids, quant) => {
    const {cartList} = this.state
    if (quant <= 1) {
      const up1 = cartList.filter(each => each.id !== ids)
      this.setState({cartList: up1})
    } else {
      const update = cartList.map(each => {
        if (each.id === ids) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      })
      this.setState({cartList: update})
    }
  }

  removeCartItem = ids => {
    const {cartList} = this.state
    const up1 = cartList.filter(each => each.id !== ids)
    this.setState({cartList: up1})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {id} = product
    const {cartList} = this.state
    const res = cartList.find(each => {
      if (each.id === id) {
        return true
      }
      return false
    })
    if (res) {
      const update = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      })
      this.setState({cartList: update})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

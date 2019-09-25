import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Login from './Login'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

//<i class="fas fa-utensils"></i>
const element = <FontAwesomeIcon icon={faUtensils} />

class Navbar extends Component {

    render() {
        return (
            <>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <NavLink className="navbar-brand" to="/">{element} Food Shop</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink exact={true} to="/" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Register <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">Cart <span class="badge badge-light">{this.props.total}</span></NavLink>
                            </li>
                        </ul>
                        <Login />
                    </div>
                </nav>

            </>

        )
    }
}


const mapStatetoProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        total: state.cartReducer.total
    }
}

export default connect(mapStatetoProps)(Navbar)
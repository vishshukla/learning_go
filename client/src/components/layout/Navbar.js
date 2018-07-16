import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
// import { getCurrentReadings } from '../../actions/readingsActions';
import { clearCurrentProfile } from '../../actions/readingsActions';


class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" /*onClick={this.getCurrentReadings()}*/ to="/readings">Readings</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/settings">Settings</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                        {' '} Log out
                    </Link>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );


        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Ambrosia Systems</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                {/* <Link className="nav-link" to="/store">
                                {' '}
                                Store
                                
                                </Link> */}

                            </li>

                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}

                    </div>
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
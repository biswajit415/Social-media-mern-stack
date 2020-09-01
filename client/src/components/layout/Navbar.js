import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout, loadUser } from '../actions/auth';
import { connect } from 'react-redux';
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/posts"> Posts </Link></li>
            <li><Link to="/register">
                <i className="fas fa-user"></i>{' '}
                <span className="hide-sm">Dashboard</span>
            </Link></li>
            <li>
                <a onClick={logout} href='#'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    )



    const guestlink = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );




    return (<nav className="navbar bg-dark">
        <h1>
            <Link to="/"><i className="fas fa-code"></i> DevMedia</Link>
        </h1>
        {!loading && (
            <Fragment>
                {isAuthenticated ?
                    authLinks : guestlink}
            </Fragment>
        )}
    </nav>)

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../layout/spinner';

const privateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loading ? (
                <Spinner />
            ) : isAuthenticated ? (
                <Component {...props} />
            ) : (
                        <Redirect to="/login" />
                    )
        }
    />
);
const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(privateRoute);

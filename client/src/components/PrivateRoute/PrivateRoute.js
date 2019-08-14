import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, location, ...rest }) => { 

    const query = location.pathname.replace(/^\/+/g, '');
    const newLocation = {
        pathname: '/login',
        search: query
    }

    return (
        <Route 
            {...rest}
            render = {props =>
                auth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect 
                        to={newLocation}
                    />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute);
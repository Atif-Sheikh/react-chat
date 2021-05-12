import { Route, Redirect } from 'react-router-dom';
// import firebase from 'firebase/app';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            true ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />
                )
        }
    />
);
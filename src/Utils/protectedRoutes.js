import firebase from 'firebase/app';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            firebase.auth().currentUser ? (
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
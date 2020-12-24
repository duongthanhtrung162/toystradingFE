import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import { getAuthToken, setAuthToken } from '../../utils/helper';
import routesLinks from './routesLinks';

const  PrivateRoute = (props) => {
    const condition = getAuthToken() && getAuthToken() != '' ;

    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to={routesLinks.login}   />);
};
export  default  PrivateRoute;
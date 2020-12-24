/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route,useLocation  } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import history from 'utils/history';
import * as _ from 'lodash';
import { clearAllLocalStorage } from '../../utils/helper';

import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HeaderNew from '../HeaderNew/Loadable';
import Footer from 'components/Footer';
import Home from '../Home/Loadable';
import HomeAdmin from '../HomeAdmin/Loadable';
import Login from '../Login/Loadable';
import ForgotPassword from '../ForgotPassword/Loadable';
import RegisterPage from '../RegisterPage/Loadable';
import UserPage from '../UserPage/Loadable';
import ProductDetailPage from '../ProductDetailPage/Loadable';
import UserProfilePage from '../UserProfilePage/Loadable';
import ToyPageEdit from '../ToyPageEdit/Loadable';
import CategoryPage from '../CategoryPage/Loadable';
import { makeSelectCategory } from '../../containers/Home/selectors';
import { useDispatch, useSelector } from 'react-redux';

import routesLinks from './routesLinks';
import GlobalStyle from '../../global-styles';
import PrivateRoute from './PrivateRoute.js';
const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  let location = useLocation();
  const onLogout = async () =>
  {
    await clearAllLocalStorage();
    history.push('/');
  }
  return (
    <SnackbarProvider maxSnack={2} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
  }}>

    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {
        location.pathname.includes('/homeAdmin') ? <div></div> : <HeaderNew  logout={onLogout}/>

      }
      <Switch>
        <Route exact path={routesLinks.home} component={Home} />
        <Route exact path={routesLinks.login} component={Login} />
        <Route exact path={routesLinks.register} component={RegisterPage} />
        <Route exact path={routesLinks.forgotPassword} component={ForgotPassword} />
        <Route exact path={routesLinks.user} component={UserPage} />
        <Route exact path={routesLinks.category} component={CategoryPage} />
        <Route exact path={routesLinks.productDetail} component={ProductDetailPage} />
        <PrivateRoute    path={routesLinks.userProfile} component={UserProfilePage} />
        <Route   path={`${routesLinks.dashboardPage}/toy/add`} 
             component={ToyPageEdit}
            />
        <PrivateRoute    path={routesLinks.homeAdmin} component={HomeAdmin} />
        <Route  exact path="/features" component={FeaturePage} />
        <Route  exact path="" component={NotFoundPage} />
      </Switch>
      { 

        location.pathname.includes('/homeAdmin') ? <div></div> : <Footer />

      }
      <GlobalStyle />
    </AppWrapper>
    </SnackbarProvider >
  );
}

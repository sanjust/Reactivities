import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

import './styles.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { HomePage } from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/Details/ActivityDetails';
import { NotFound } from './NotFound';
import { ToastContainer } from 'react-toastify';
import { LoginForm } from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import { useContext } from 'react';
import { useEffect } from 'react';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => {
        return (<>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route path='/login' component={LoginForm} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>)
      }} />
    </>
  );
}

export default withRouter(observer(App));

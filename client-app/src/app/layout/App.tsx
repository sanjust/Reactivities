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

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => {
        return (<>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
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

import React from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import { Header, Icon } from 'semantic-ui-react';

const App = () => {
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/values').then(response => {
      setValue(response.data);
    })
  }, []);

  return (
    <div className="App">
      <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Uptime Guarantee</Header.Content>
      </Header>
    </div>
  );
}

export default App;

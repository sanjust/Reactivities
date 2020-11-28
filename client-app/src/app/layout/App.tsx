import React from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import './styles.css';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const [activites, setActivities] = React.useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = React.useState<IActivity | null>(null);
  const [editMode, setEditModel] = React.useState<boolean>(false);

  const handleActivitySelection = (id: string) => {
    setSelectedActivity(activites.filter(val => val.id == id)[0]);
    setEditModel(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditModel(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activites, activity]);
    setSelectedActivity(activity);
    setEditModel(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activites.filter(val => val.id != activity.id), activity]);
    setSelectedActivity(activity);
    setEditModel(false);
  }

  const handleDeleteActivity = (id: string) => {
    let activities = [...activites.filter(val => val.id != id)];
    setActivities(activities);
    if (selectedActivity && selectedActivity.id == id) {
      setSelectedActivity(null);
    }
  }

  React.useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
      let activites = [];
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activites.push(activity)
      });
      setActivities(activites);
    })
  }, []);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activites}
          selectActivity={handleActivitySelection}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={(editMode: boolean) => { setEditModel(editMode) }}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;

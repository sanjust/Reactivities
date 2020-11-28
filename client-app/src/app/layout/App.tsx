import React, { SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';

import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import './styles.css';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

const App = () => {
  const [activites, setActivities] = React.useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = React.useState<IActivity | null>(null);
  const [editMode, setEditModel] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [target, setTarget] = React.useState('');

  const handleActivitySelection = (id: string) => {
    setSelectedActivity(activites.filter(val => val.id === id)[0]);
    setEditModel(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditModel(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activites, activity]);
      setSelectedActivity(activity);
      setEditModel(false);
    }).then(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activites.filter(val => val.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditModel(false);
    }).then(() => setSubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      let activities = [...activites.filter(val => val.id !== id)];
      setActivities(activities);
      if (selectedActivity && selectedActivity.id === id) {
        setSelectedActivity(null);
      }
    }).then(() => setSubmitting(false))
  }

  React.useEffect(() => {
    setLoading(true);
    agent.Activities.list().then(response => {
      let activites = [];
      response.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activites.push(activity)
      });
      setActivities(activites);
    }).then(() => setLoading(false))
  }, []);

  if (loading) return <LoadingComponent content='Loading activities...' />
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
}

export default App;

import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityDetails from '../Details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { ActivityList } from './ActivityList'
import ActivityStore from '../../../app/stores/activityStore';

const ActivityDashboard = () => {
    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity, submitting } = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm key={selectedActivity && selectedActivity.id || 0} />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);

import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'

import { ActivityList } from './ActivityList'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadActivities, loadingInitial, submitting } = rootStore.activityStore;

    React.useEffect(() => {
        loadActivities();
    }, [rootStore.activityStore]);

    if (loadingInitial) return <LoadingComponent content='Loading activities...' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList key={submitting.toString()} />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);

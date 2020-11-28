import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityDetails } from '../Details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = (props) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={props.activities}
                    selectActivity={props.selectActivity}
                    deleteActivity={props.deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {props.selectedActivity
                    && !props.editMode
                    && <ActivityDetails
                        setEditMode={props.setEditMode}
                        setSelectedActivity={props.setSelectedActivity}
                        activity={props.selectedActivity} />}

                {props.editMode && <ActivityForm
                    key={props.selectedActivity && props.selectedActivity.id || 0}
                    setEditMode={props.setEditMode}
                    activity={props.selectedActivity}
                    createActivity={props.createActivity}
                    editActivity={props.editActivity} />}
            </Grid.Column>
        </Grid>
    )
}

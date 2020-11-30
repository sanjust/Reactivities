import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Item, Label, Segment } from 'semantic-ui-react'

import ActivityStore from '../../../app/stores/activityStore';
import ActivityListItem from './ActivityListItem';

export const ActivityList = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    return (
        <>
            {activitiesByDate.map(([group, activities]) => {
                return (<React.Fragment key={group.toString()}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        {activities.map(activity => {
                            return <ActivityListItem key={activity.id} activity={activity} />
                        })}
                    </Item.Group>
                </React.Fragment>)
            })}
        </>
    )
}
export default observer(ActivityList);

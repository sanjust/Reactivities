import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Item, Label } from 'semantic-ui-react'

import { RootStoreContext } from '../../../app/stores/rootStore';
import ActivityListItem from './ActivityListItem';

export const ActivityList = () => {
    const rootStore = useContext(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;
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

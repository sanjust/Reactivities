import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import ActivityStore from '../../../app/stores/activityStore';

export const ActivityList = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, deleteActivity, submitting, target } = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.length > 0 && activitiesByDate.map(activity => {
                    return <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.venue}, {activity.city}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    as={Link}
                                    to={`/activities/${activity.id}`}
                                    floated='right'
                                    content='View'
                                    color='blue' />
                                <Button
                                    name={activity.id}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => { deleteActivity(e, activity.id) }} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                })}
                <h1>Activity not found...</h1>
            </Item.Group>
        </Segment>
    )
}
export default observer(ActivityList);

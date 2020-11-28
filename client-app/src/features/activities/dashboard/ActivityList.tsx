import React, { SyntheticEvent } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

export const ActivityList: React.FC<IProps> = (props) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {props.activities.map(activity => {
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
                                    floated='right'
                                    content='view'
                                    color='blue'
                                    onClick={() => { props.selectActivity(activity.id) }} />
                                <Button
                                    name={activity.id}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    loading={props.submitting && props.target == activity.id}
                                    onClick={(e) => { props.deleteActivity(e, activity.id) }} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                })}
            </Item.Group>
        </Segment>
    )
}

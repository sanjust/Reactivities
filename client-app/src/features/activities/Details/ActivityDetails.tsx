import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = (props) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${props.activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.activity.title}</Card.Header>
                <Card.Meta>
                    <span>{props.activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {props.activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={() => { props.setEditMode(true) }} />
                    <Button basic color='grey' content='Cancel' onClick={() => { props.setSelectedActivity(null) }} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

import React from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { IAttendee } from '../../../app/models/activity'

interface IProps {
    attendees: IAttendee[]
}

export const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
    return (
        <List horizontal>
            {attendees.map((attendee, index) => {
                return <List.Item>
                    <Popup
                        header={attendee.displayName}
                        trigger={<Image key={index} size='mini' circular src={attendee.image || '/assets/user.png'} />}
                    />
                </List.Item>
            })}
        </List>
    )
}

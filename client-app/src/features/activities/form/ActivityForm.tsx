import { observer } from 'mobx-react-lite';
import React, { FormEvent, useContext } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore';

const ActivityForm = () => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity, setEditMode, submitting, createActivity, editActivity } = activityStore;

    const initializeForm = () => {
        if (selectedActivity) {
            return selectedActivity;
        } else {
            let activity: IActivity = {
                id: '',
                title: '',
                description: '',
                category: '',
                city: '',
                venue: '',
                date: null
            }
            return activity;
        }
    }

    const [activity, setActivity] = React.useState<IActivity>(initializeForm);

    const handleSubmit = () => {
        if (activity.id.length == 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form>
                <Form.Input onChange={handleInputChange} placeholder='Title' name='title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} placeholder='Description' name='description' value={activity.description} />
                <Form.Input onChange={handleInputChange} placeholder='Category' name='category' value={activity.category} />
                <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' name='date' value={activity.date} />
                <Form.Input onChange={handleInputChange} placeholder='City' name='city' value={activity.city} />
                <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue' value={activity.venue} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onClick={handleSubmit} />
                <Button floated='left' type='submit' content='Cancel' onClick={() => { setEditMode(false) }} />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
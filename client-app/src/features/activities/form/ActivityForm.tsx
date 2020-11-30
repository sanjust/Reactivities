import { observer } from 'mobx-react-lite';
import React, { FormEvent, useContext } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { activity, submitting, createActivity, editActivity, loadActivity, clearActivity } = activityStore;

    const initializeForm = () => {
        let activityState: IActivity = {
            id: '',
            title: '',
            description: '',
            category: '',
            city: '',
            venue: '',
            date: ''
        }
        return activityState;
    }

    const [activityState, setActivity] = React.useState<IActivity>(initializeForm);

    React.useEffect(() => {
        if (match.params.id && activityState.id.length === 0) {
            loadActivity(match.params.id).then(() => {
                activity
                    && setActivity(activity)
            });
        }
        // This works like componentWillUnmount
        return (() => {
            clearActivity()
        })
    }, [loadActivity, clearActivity, match.params.id, activity, activityState.id.length])


    const handleSubmit = () => {
        if (activityState.id.length === 0) {
            let newActivity = {
                ...activityState,
                id: uuid()
            }
            createActivity(newActivity).then(() => { history.push(`/activities/${newActivity.id}`) });
        } else {
            editActivity(activityState).then(() => { history.push(`/activities/${activityState.id}`) });
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activityState, [name]: value });
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Form>
                        <Form.Input onChange={handleInputChange} placeholder='Title' name='title' value={activityState!.title} />
                        <Form.TextArea onChange={handleInputChange} placeholder='Description' name='description' value={activityState!.description} />
                        <Form.Input onChange={handleInputChange} placeholder='Category' name='category' value={activityState!.category} />
                        <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' name='date' value={activityState!.date} />
                        <Form.Input onChange={handleInputChange} placeholder='City' name='city' value={activityState!.city} />
                        <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue' value={activityState!.venue} />
                        <Button loading={submitting} floated='right' positive type='submit' content='Submit' onClick={handleSubmit} />
                        <Button floated='left' type='submit' content='Cancel' onClick={() => { history.push('/activities') }} />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);
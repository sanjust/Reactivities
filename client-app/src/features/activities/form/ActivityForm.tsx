import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import { v4 as uuid } from 'uuid';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import { ActivityFormValues } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore';
import { TextInput } from '../../../app/common/form/TextInput';
import { TextAreaInput } from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/CategoryOptions';
import { DateInput } from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 character' }),
    )(),
    city: isRequired('City'),
    date: isRequired('Date'),
    time: isRequired('Time'),
    venue: isRequired('Venue'),
})

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { submitting, createActivity, editActivity, loadActivity } = activityStore;

    const [activityState, setActivity] = React.useState(new ActivityFormValues());
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id).then((activity) => {
                setActivity(new ActivityFormValues(activity))
            }).finally(() => setLoading(false));
        }
    }, [loadActivity, match.params.id])

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        if (!activityState.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        } else {
            editActivity(activity)
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activityState}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => {
                            return <Form onSubmit={handleSubmit} loading={loading}>
                                <Field placeholder='Title' name='title' value={activityState!.title} component={TextInput} />
                                <Field component={TextAreaInput} rows={3} placeholder='Description' name='description' value={activityState!.description} />
                                <Field component={SelectInput} options={category} placeholder='Category' name='category' value={activityState!.category} />
                                <Form.Group widths='equal'>
                                    <Field component={DateInput} date={true} placeholder='Date' name='date' value={activityState!.date} />
                                    <Field component={DateInput} time={true} placeholder='Time' name='time' value={activityState!.date} />
                                </Form.Group>
                                <Field component={TextInput} placeholder='City' name='city' value={activityState!.city} />
                                <Field component={TextInput} placeholder='Venue' name='venue' value={activityState!.venue} />
                                <Button
                                    disabled={loading || invalid || pristine}
                                    loading={submitting}
                                    floated='right'
                                    positive
                                    type='submit'
                                    content='Submit' />
                                <Button
                                    disabled={loading}
                                    floated='left'
                                    type='submit'
                                    content='Cancel'
                                    onClick={() => {
                                        if (activityState.id) {
                                            history.push(`/activities/${activityState.id}`)
                                        } else {
                                            history.push('/activities')
                                        }
                                    }} />
                            </Form>
                        }}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);
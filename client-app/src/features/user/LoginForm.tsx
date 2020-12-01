import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { useContext } from 'react';
import { IUserFormValues } from '../../app/models/user';
import { combineValidators, isRequired } from 'revalidate';
import { ErrorMessage } from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
})

export const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    const [error, setError] = React.useState(null);
    return (
        <FinalForm
            validate={validate}
            onSubmit={(values: IUserFormValues) => {
                setError(null);
                login(values).catch(error => setError(error))
            }}
            render={({ handleSubmit, submitting, form, invalid, pristine, dirtySinceLastSubmit }) => {
                return <Form onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Login to reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    {error && !dirtySinceLastSubmit && <ErrorMessage error={error} text='Invalid email or password' />}
                    <Button color='teal' fluid disabled={!dirtySinceLastSubmit && (invalid || pristine)} loading={submitting} positive content='Login' />
                </Form>
            }}

        />
    )
}

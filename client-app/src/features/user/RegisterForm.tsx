import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { useContext } from 'react';
import { IUserFormValues } from '../../app/models/user';
import { combineValidators, isRequired } from 'revalidate';
import { ErrorMessage } from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password'),
    username: isRequired('Username'),
    displayName: isRequired('Display name')
})

export const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;
    const [error, setError] = React.useState(null);
    return (
        <FinalForm
            validate={validate}
            onSubmit={(values: IUserFormValues) => {
                setError(null);
                register(values).catch(error => {
                    setError(error)
                })
            }}
            render={({ handleSubmit, submitting, form, invalid, pristine, dirtySinceLastSubmit }) => {
                return <Form onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Sign up to reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='username'
                        component={TextInput}
                        placeholder='Username'
                    />
                    <Field
                        name='displayName'
                        component={TextInput}
                        placeholder='Display Name'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    {error && !dirtySinceLastSubmit && <ErrorMessage error={error} text={JSON.stringify(error.data.errors)} />}
                    <Button color='teal' fluid disabled={!dirtySinceLastSubmit && invalid || pristine} loading={submitting} positive content='Register' />
                </Form>
            }}

        />
    )
}

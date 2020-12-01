import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { DateTimePicker } from 'react-widgets';
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<Date, HTMLDataElement>, FormFieldProps { }

export const DateInput: React.FC<IProps> = ({ input, width, placeholder, date = false, time = false, meta: { touched, error }, ...rest }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                placeholder={placeholder}
                value={input.value || null}
                onChange={input.onChange}
                onBlur={input.onBlur}
                onKeyDown={(e) => { e.preventDefault() }}
                date={date}
                time={time}
                {...rest}
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    )
}

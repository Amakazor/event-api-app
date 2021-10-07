/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext } from 'react';
import axios from 'axios';
import CenteredContainer from '../components/centeredContainer';
import Form from '../components/form';
import GradientButton from '../components/gradientButton';
import HorizontalCenter from '../components/horizontalCenter';
import Input from '../components/input';
import validateEmail from '../utility/emailValidator';
import Error from '../components/error';
import { EndpointContext } from '../context/endpointContext';
import Success from '../components/success';
import validateWithPredicate from '../utility/predicateValidator';

const Index = (props: { mock?: boolean }) => {
    const { mock } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [dateValid, setDateValid] = useState(true);

    const [errors, setErrors] = useState([] as string[]);

    const [success, setSuccess] = useState(null as string | null);

    const {
        endpoints: {
            event: { post: endpoint },
        },
    } = useContext(EndpointContext);

    const validate = () => {
        const errors: string[] = [];

        [
            { name: 'First name', value: firstName, stateSetter: setFirstNameValid },
            { name: 'Last name', value: lastName, stateSetter: setLastNameValid },
            { name: 'Email', value: email, stateSetter: setEmailValid },
            { name: 'Date', value: date, stateSetter: setDateValid },
        ].forEach(valueToTest =>
            validateWithPredicate(
                valueToTest.value,
                valueToTest => !!valueToTest,
                () => {
                    valueToTest.stateSetter(false);
                    errors.push(`${valueToTest.name} cannot be empty`);
                },
                () => {
                    valueToTest.stateSetter(true);
                },
            ),
        );

        if (!errors.includes('Email cannot be empty')) {
            validateWithPredicate(
                email,
                value => !!validateEmail(value),
                () => {
                    setEmailValid(false);
                    errors.push('Email is malformed.');
                },
                () => {
                    setEmailValid(true);
                },
            );
        }

        if (!errors.includes('Date cannot be empty')) {
            validateWithPredicate(
                date,
                value => !(new Date(value) < new Date()),
                () => {
                    setDateValid(false);
                    errors.push('Event date cannot be in the past.');
                },
                () => {
                    setDateValid(true);
                },
            );
        }

        setErrors(errors);

        return errors.length === 0;
    };

    const onSubmit = () => {
        if (validate() && !mock) {
            axios
                .post(endpoint, { firstName, lastName, email, date: new Date(date).getTime() }, {})
                .then(() => {
                    setErrors([]);
                    setSuccess('Event added');
                })
                .catch(error => {
                    setSuccess(null);

                    if (error.response.status === 400) {
                        setErrors([error.response.data]);
                    } else if (error.response.status === 500) {
                        setErrors(['Internal server error, please try again later']);
                    } else {
                        setErrors(['Unknown error, please try again later']);
                    }
                });
        }
    };

    return (
        <CenteredContainer>
            <Form>
                <h2>Add event</h2>
                <Input
                    value={firstName}
                    type="text"
                    onChange={event => setFirstName((event.target as HTMLInputElement).value)}
                    label="First name"
                    valid={firstNameValid}
                    name="FirstName"
                    required
                />
                <Input
                    value={lastName}
                    type="text"
                    onChange={event => setLastName((event.target as HTMLInputElement).value)}
                    label="Last name"
                    valid={lastNameValid}
                    name="LastName"
                    required
                />
                <Input
                    value={email}
                    type="Email"
                    onChange={event => setEmail((event.target as HTMLInputElement).value)}
                    label="Email"
                    valid={emailValid}
                    name="Email"
                    required
                />
                <Input
                    value={date}
                    type="date"
                    onChange={event => setDate((event.target as HTMLInputElement).value)}
                    label="Event date"
                    valid={dateValid}
                    name="EventDate"
                    required
                />
                {errors.map((error, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Error key={index}>{error}</Error>
                ))}
                <HorizontalCenter>
                    <GradientButton type="button" onClick={onSubmit}>
                        Add event
                    </GradientButton>
                </HorizontalCenter>
                <HorizontalCenter>{success && <Success>{success}</Success>}</HorizontalCenter>
            </Form>
        </CenteredContainer>
    );
};

Index.defaultProps = {
    mock: false,
};

export default Index;

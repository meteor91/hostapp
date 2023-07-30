import React from 'react';
import { Button, Col, Row, Form, Text } from 'redrock';
import { type LoginForm } from '../models';
import style from './LoginPage.module.less';
import { RequiredField } from 'Core/ValidationRules';
import { type User } from 'Core/models';
import { useMutation } from 'react-query';
import { type ServerValidateErrors } from 'Core/models';
import { loginUser } from './api';
import { useDispatch } from 'react-redux';
import { setAuthorized } from 'Modules/Auth/slices';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const mutation = useMutation<User, ServerValidateErrors<LoginForm>, LoginForm>(loginUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const handleSubmit = (data: LoginForm): void => {
        mutation.mutate(data, {
            onSuccess: (user: User) => {
                dispatch(setAuthorized(user));
                const redirectTo = searchParams.get('redirectTo');
                navigate(redirectTo ? redirectTo : '/home');
            },
        });
    };
    console.log(mutation.error);
    return (
        <div className={style.login}>
            <div className={style.form}>
                <Row>
                    <Col span={24}>
                        <Text>Login</Text>
                    </Col>
                </Row>
                <Form<LoginForm>
                    onSubmit={handleSubmit}
                    defaultValues={{ username: '', password: '' }}
                >
                    <Form.Input
                        name="username"
                        label="Username"
                        rules={RequiredField}
                        disabled={mutation.isLoading}
                    />
                    <Form.Input
                        name="password"
                        label="Password"
                        type="password"
                        rules={RequiredField}
                        disabled={mutation.isLoading}
                    />
                    {mutation.error?.nonFieldErrors && (
                        <Form.Item>
                            {
                                mutation.error.nonFieldErrors.map((errorMessage, index) => (
                                    <div key={index}>{errorMessage}</div>
                                ))
                            }
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button label="Submit" type="submit" disabled={mutation.isLoading}/>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

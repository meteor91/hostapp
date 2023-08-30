import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Row, Form, Text } from 'keepd';
import { RequiredField } from 'core/ValidationRules';
import { ServerValidateErrors, type User } from 'core/models';
import { setAuthorized } from 'modules/Auth/slices';
import { type LoginForm } from '../models';
import { loginUser } from './api';
import style from './LoginPage.module.less';

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
                                    <Text type="error" key={index}>{errorMessage}</Text>
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

// import i18n from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Button, Layout as RrLayout, Layout } from 'keepd';
import { MainMenu } from 'core/components/MainMenu';
import { setNotAuthorized } from 'modules/Auth/slices';
import { logoutUser } from '../api';
import { useListenAuthStatus } from '../hooks/useListenAuthStatus';
import styles from './AuthorizedLayout.module.less';

const { Header, Sidebar, Content } = Layout;

export const AuthorizedLayout: React.FC = () => {
    const dispatch = useDispatch();
    const mutation = useMutation(logoutUser);

    const handleLogout = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                dispatch(setNotAuthorized());
            },
        });
    };
    
    useListenAuthStatus();

    return (
        <RrLayout>
            <Sidebar>
                <MainMenu />
            </Sidebar>
            <RrLayout direction="vertical">
                <Header>
                    <div className={styles.header}>
                        <Button
                            label="log out"
                            variant="secondary"
                            disabled={mutation.isLoading}
                            onClick={handleLogout}
                        />
                    </div>
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </RrLayout>
        </RrLayout>
    );
};


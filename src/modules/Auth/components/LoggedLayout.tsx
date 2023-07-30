// import i18n from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { Outlet } from 'react-router-dom';
import { Button, Layout as RrLayout, Layout } from 'redrock';
import { MainMenu } from 'core/components/MainMenu';
import { clearAuthorized } from 'modules/Auth/slices';
import { logoutUser } from '../api';

import styles from './LoggedLayout.module.less';

const { Header, Sidebar, Content } = Layout;

export const LoggedLayout: React.FC = () => {
    const dispatch = useDispatch();
    const mutation = useMutation(logoutUser);

    const handleLogout = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                dispatch(clearAuthorized());
            },
        });
    };

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


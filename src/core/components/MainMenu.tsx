import React from 'react';
import { PackageIcon, DeviceTabletIcon, NavBar } from 'keepd';
import { useLocation, Link } from 'react-router-dom';
import styles from './MainMenu.module.less';

export const MainMenu: React.FC = () => {
    const location = useLocation();
    const selectedKey = items.find(
        (item) => location.pathname.indexOf(item.key) === 0,
    )?.key;
    return (
        <NavBar items={items} selectedKey={selectedKey}/>
    );
};

const items = [
    {
        icon: <DeviceTabletIcon />,
        label: <Link className={styles.link} to='/home'>home</Link>,
        key: '/home',
    },
    {
        icon: <PackageIcon />,
        label: <Link className={styles.link} to='/orders'>orders</Link>,
        key: '/orders',
    },
];

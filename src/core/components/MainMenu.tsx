import React from 'react';
import { PackageIcon, DeviceTabletIcon, NavBar } from 'keepd';
import { useLocation, Link } from 'react-router-dom';

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
        label: <Link to='/home'>home</Link>,
        key: '/home',
    },
    {
        icon: <PackageIcon />,
        label: <Link to='/app2'>app2</Link>,
        key: '/app2',
    },
];

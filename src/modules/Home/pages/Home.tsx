import React from 'react';
import { Layout } from 'keepd';

const { Header, Sidebar, Content } = Layout;
export const Home = () => {
    // return <div>kek</div>;
    return (
        <Layout>
            {/*kek*/}
            <Sidebar>
                sidebar
            </Sidebar>
            <Layout direction="vertical">
                <Header>
                    header
                </Header>
                <Content>
                    content
                </Content>
            </Layout>
        </Layout>
    );
};
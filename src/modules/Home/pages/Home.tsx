import React from 'react';
import { Button, Col, Row, Space } from 'keepd';

export const Home = () => {

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Space justify="end">
                        <Button label="btn" />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};
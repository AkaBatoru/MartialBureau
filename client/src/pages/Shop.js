import React, { useContext, useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import ServiceList from '../components/ServiceList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import { fetchServices } from '../http/serviceAPI';

const Shop = observer(() => {
    const { service } = useContext(Context);

    return (
        <div>
            <Row className='mt-5 d-flex justify-content-start'>
                <Col md={12}>
                    <TypeBar />
                    <ServiceList />
                </Col>
            </Row>
        </div>
    );
});

export default Shop;

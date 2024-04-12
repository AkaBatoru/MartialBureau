import React, { useContext, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ServiceItem from "./ServiceItem";
import { fetchServices } from "../http/serviceAPI";

const ServiceList = observer(() => {   
    const { service } = useContext(Context); 

    useEffect(() => {
        fetchServices().then(data => service.setServices(data))}, []);
    if (!service.services) {
        return <div>Loading...</div>;
    }

    const filteredServices = service.services.filter(service => service.type === service.selectedType);

    return (
        <Row className="d-flex">
            {filteredServices && filteredServices.map(service =>
                <ServiceItem key={service.ID_Service} service={service}/>
            )}
        </Row>
    );
});

export default ServiceList;

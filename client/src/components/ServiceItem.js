import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SERVICE_ROUTE } from "../utils/consts";

const ServiceItem = ({service}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={"mt-3"} onClick={() => {console.log("ID_Service:", service.ID_Service); navigate(SERVICE_ROUTE + '/' + service.ID_Service)}}>
            <Card style={{width: 150, cursor:'pointer'}} border={"light"}>
            <img width={150} height={150} src={"http://localhost:5000/" + service.Img} alt={service.Name}/>
            <div>
                <div>{service.Name}</div>
            </div>
            </Card> 
        </Col>
    );
};

export default ServiceItem;
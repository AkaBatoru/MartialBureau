import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { Row, Card } from "react-bootstrap";

const TypeBar = observer(() => {   
    const { service } = useContext(Context); 

    const handleTypeClick = (type) => {
        service.setSelectedType(type);
        console.log("Selected type:", type);
    };

    return (
        <Row className="d-flex">
            {service.types && service.types.map(type =>
                <Card
                    className="p-3"
                    style={{width:'10%', textAlign: 'center', color: 'black', cursor:'pointer',
                    border:type.id === service.selectedType.id ? '1px solid black' : '1px solid transparent'}}
                    onClick={() => handleTypeClick(type)}
                    key={type.id}
                >
                    {type.name}
                </Card>
            )}
        </Row>
    );
});



export default TypeBar;

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Dropdown} from "react-bootstrap";
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import { editService, fetchServices } from '../../http/serviceAPI';

const UpdateService = observer(({ show, onHide }) => {
    const { service } = useContext(Context);
    const [serviceIdToEdit, setServiceIdToEdit] = useState("");
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    
    const selectFile = e => {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }

    useEffect(() => {
        fetchServices().then(data => service.setServices(data));
        console.log("fetchEdit", service)
    }, [service.selectedService.ID_Service]);

    const handleServiceIdChange = (event) => {
        setServiceIdToEdit(event.target.value);
    }

    const EditService = () => {
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Cost', `${cost}`);
        formData.append('Description', description);
        formData.append('Type', service.selectedType.id);
        formData.append('Img', file);
    
        editService(service.selectedService.ID_Service, formData).then(data => onHide());
    }
    
    return (
        <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{service.selectedService.ID_Service + ")  " + service.selectedService.Name || "Выберите услугу"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {service.services && service.services.map(serv =>
                            <Dropdown.Item onClick={() => service.setSelectedService(serv)} key={serv.ID_Service}>{serv.Name}</Dropdown.Item>
                        )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>{service.selectedType.name || "Тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {service.types && service.types.map(type =>
                            <Dropdown.Item onClick={() => service.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                        )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      className="mt-3"
                      value = {cost}
                      onChange={e => setCost(Number(e.target.value))}
                      placeholder="Стоимость услуги"
                      type="number"
                    />
                    <Form.Control
                      className="mt-3"
                      value = {description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Описание"
                    />
                    <Form.Control
                      className="mt-3"
                      type="file"
                      onChange={selectFile}
                    />  <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={EditService}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
})
export default UpdateService;

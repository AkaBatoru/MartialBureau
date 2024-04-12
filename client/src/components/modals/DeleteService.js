import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { deleteService, fetchServices } from '../../http/serviceAPI';

const DeleteService = observer(({ show, onHide }) => {
    const { service } = useContext(Context);
    const [serviceIdToDelete, setServiceIdToDelete] = useState("");

    useEffect(() => {
        fetchServices().then(data => service.setServices(data.rows));
        console.log("fetchDelete", service)
    }, []);

    const handleServiceIdChange = (event) => {
        setServiceIdToDelete(event.target.value);
    }

    const DeleteService = () => {
        deleteService(serviceIdToDelete)
            .then(data => onHide())
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={serviceIdToDelete}
                        onChange={handleServiceIdChange}
                        placeholder="Введите ID услуги"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={DeleteService}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    )
})
export default DeleteService;

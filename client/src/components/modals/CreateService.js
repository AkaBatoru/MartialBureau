import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Button, Modal } from 'react-bootstrap';
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import { createServices } from "../../http/serviceAPI";

const CreateService = observer(({show, onHide}) => {
    const {service} = useContext(Context);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    
    const selectFile = e => {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }

    const addService = () => {
        const formData = new FormData() 
        formData.append('Name', name)
        formData.append('Cost', `${cost}`)
        formData.append('Description', description)
        formData.append('Type', service.selectedType.id)
        formData.append('Img', file)

        createServices(formData).then(data => onHide())
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
                    Добавить услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{service.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {service.types && service.types.map(type =>
                            <Dropdown.Item onClick={() => service.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                        )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      className="mt-3"
                      value = {name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Введите название услуги"
                    />
                    <Form.Control
                      className="mt-3"
                      value = {cost}
                      onChange={e => setCost(Number(e.target.value))}
                      placeholder="Введите стоимость услуги"
                      type="number"
                    />
                    <Form.Control
                      className="mt-3"
                      value = {description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Введите описание"
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
                <Button variant="outline-success" onClick={addService}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateService;

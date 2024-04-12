import React, { useState, useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateService from '../components/modals/CreateService';
import DeleteService from '../components/modals/DeleteService';
import UpdateService from '../components/modals/UpdateService';
import axios from "axios";

const Admin = () => {
  const [createServiceVisible, setCreateServiceVisible] = useState(false);
  const [deleteServiceVisible, setDeleteServiceVisible] = useState(false);
  const [editServiceVisible, setEditServiceVisible] = useState(false);


  const handleCreateServiceButtonClick = useCallback(() => {
    setCreateServiceVisible(true);
  }, []);

  const handleEditServiceButtonClick = useCallback(() => {
    setEditServiceVisible(true);
  }, []);

  const handleDeleteServiceButtonClick = useCallback(() => {
    setDeleteServiceVisible(true);
  }, []);

  const downloadFile = () => {
    axios({
        url: 'http://localhost:5000/api/file/download',
        method: 'GET',
        responseType: 'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('downloads', 'services.txt');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
    }).catch(error => {
        console.error('Error downloading file:', error);
    });
}

  return (
    <Container>
      <Button variant={"outline-dark"} className='mt-4 p-2' onClick={handleCreateServiceButtonClick}>Добавить услугу</Button>
      <CreateService show={createServiceVisible} onHide={() => setCreateServiceVisible(false)}/>
      <Button variant={"outline-dark"} className='mt-4 p-2' onClick={handleEditServiceButtonClick}>Редактировать услугу</Button>
      <UpdateService show={editServiceVisible} onHide={() => setEditServiceVisible(false)}/>
      <Button variant={"outline-dark"} className='mt-4 p-2' onClick={handleDeleteServiceButtonClick}>Удалить услугу</Button>
      <DeleteService show={deleteServiceVisible} onHide={() => setDeleteServiceVisible(false)}/>
      <Button variant={"outline-dark"} className='mt-4 p-2' onClick={downloadFile}>Скачать .txt документ</Button>
    </Container>
  );
};

export default Admin;

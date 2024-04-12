import React, { useEffect, useState } from 'react';
import { Container, Col, Image, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneService } from '../http/serviceAPI';


const ServicePage = () => {
  const [service, setService] = useState();
  const {ID_Service} = useParams();
  console.log("ID_Service in ServicePage:", ID_Service);
  console.log("service in ServicePage:", ID_Service);
  useEffect(() => {
    console.log("ID_Service in useEffect:", ID_Service);
    fetchOneService(ID_Service)
      .then(data => setService(data))
      .catch(error => console.error('Ошибка при загрузке данных об услуге:', error));
  }, []);
  console.log("Одна штука", ID_Service ,"Вся штука", service)
  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='mt-3 d-flex align-items-center justify-content-center'>
      <Col md={4} className='d-flex flex-wrap '>
        <Image width={300} height={300} src={"http://localhost:5000//" + service.Img} alt={service.Name}/>
        <h2>{service.Name}</h2>
        <Card
          className="d-flex flex-column align-items-center justify-content-around"
          style={{width:300, height:300, fontSize:28, border: '5px solid black'}}>
          <p><h3>Описание:</h3> <br/>{service.Description}</p>
        </Card>
      </Col>
      <Col md={4}>
        <Card
          className="d-flex flex-column align-items-center justify-content-around"
          style={{width:300, height:150, fontSize:32, border: '5px solid black'}}>
          <h3>От {service.Cost} руб.</h3>
        </Card>
      </Col>
    </Container>
  );
};

export default ServicePage;

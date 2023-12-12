import React, {useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

export function ContactPage () {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_rklugn5', 'template_v8ph9aq', e.target, 'YoAOW_j5x62-B0FU0')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          Swal.fire({
            title: 'Mensagem enviada com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .catch((err) => {
          console.log('FAILED...', err);
          Swal.fire({
            title: 'Erro ao enviar a mensagem!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    };



  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Entre em Contato</h2>
          <p>
            Tem alguma pergunta ou sugestão? Ficaremos felizes em ouvir de você!
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Seu Nome</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite seu nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Seu E-mail</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite seu e-mail"
                name="email"
                value={formData.email}
                onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Mensagem</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Digite sua mensagem"
                name="message"
                value={formData.message}
                onChange={handleInputChange} />
            </Form.Group>
            <Button className='mt-4 mb-4' variant="primary" type="submit">
              Enviar Mensagem
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

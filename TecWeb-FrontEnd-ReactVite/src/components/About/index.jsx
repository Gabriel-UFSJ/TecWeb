import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export function AboutPage (){
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Sobre o Uni-Eventos</h2>
          <p>
            Bem-vindo ao Uni-Eventos, o lugar onde a comunidade acadêmica pode explorar e cadastrar os eventos mais recentes e emocionantes.
          </p>
          <p>
            Nosso objetivo é criar uma plataforma fácil de usar que conecta estudantes, professores e funcionários para promover uma experiência acadêmica rica e diversificada.
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Equipe</h3>
          <ul>
            <li>Desenvolvimento Frontend: Gabriel Resende Meireles</li>
            <li>Desenvolvimento Backend: Gabriel Resende Meireles</li>
            <li>Design e UX: Gabriel Resende Meireles</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

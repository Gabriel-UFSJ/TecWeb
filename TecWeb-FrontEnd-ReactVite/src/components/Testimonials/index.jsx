import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:3000/depoimentos');
      if (!response.ok) {
        throw new Error('Não foi possível buscar os depoimentos.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchTestimonialsData = async () => {
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar testimonials:', error);
      setError('Ocorreu um erro ao buscar os testimonials.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonialsData();
  }, []);

  const sortedTestimonials = testimonials
    .sort((a, b) => new Date(b.data) - new Date(a.data)) // Ordena os depoimentos por data decrescente
    .slice(0, 5); // Pega os 3 depoimentos mais recentes

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap pt-5 pb-5">
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        sortedTestimonials.map((testimonial) => (
          <Card key={testimonial._id}
            style={{
              width: '18rem',
              backgroundColor: 'transparent',
              borderColor: 'white',
              margin: '1rem',
            }}>
            <Card.Body>
              <Card.Text style={{ color: 'white', textAlign: 'center' }}>{testimonial.descricao}</Card.Text>
              <div className="ratio ratio-1x1 rounded-circle overflow-hidden w-75 mx-auto">
                <img
                  src={`http://localhost:3000/imagens/${testimonial.image}`}
                  alt={`Imagem do depoimento de ${testimonial.name}`}
                  className="card-img-top img-cover border border-2 border-light rounded-circle"
                />
              </div>
              <Card.Text style={{ color: 'white', marginTop: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>{testimonial.nome}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

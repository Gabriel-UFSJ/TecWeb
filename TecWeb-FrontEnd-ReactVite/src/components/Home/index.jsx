import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './home.module.css';
import ErrorImg from '../../assets/error.png';

export function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3000/evento');
            if (!response.ok) {
                throw new Error('Não foi possível buscar os eventos.');
            }
            const data = await response.json();

            data.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

            const latestEvents = data.slice(0, 9); // Mostra no máximo 9 eventos

            setEvents(latestEvents);
            setLoading(false);

            console.log('Eventos:', data);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            setError('Ocorreu um erro ao buscar os eventos.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className='mt-1 pt-1'>
        <Carousel >
            {loading ? (
                <Carousel.Item>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <Carousel.Caption>
                        <p>Carregando...</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ) : (
                events.length === 0 ? (
                    <Carousel.Item>
                        <img
                            src={ErrorImg}
                            display="block!important"
                            className="mx-auto d-block"
                            width="75%"
                            alt="Nenhum evento encontrado"
                        />
                        <Carousel.Caption>
                            <p>Nenhum evento encontrado.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ) : error ? (
                    <Carousel.Item>
                        <img
                            src={ErrorImg}
                            display="block!important"
                            className="mx-auto d-block"
                            width="75%"
                            alt={error}
                        />
                        <Carousel.Caption>
                            <p>{error}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ) : (
                    events.map((event) => (
                        <Carousel.Item key={event._id}>
                            <div className='mx-auto d-block pb-5' style={{
                                    width: '50rem',
                                    transition: 'width 0.5s',
                                }}>
                                <div className='bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center d-flex justify-content-center' 
                                    style={{height: '25rem'}}
                                >
                                    <div className="row">
                                        <div className="col-md-6 mb-5">
                                            <img
                                                src={`http://localhost:3000/imagens/${event.image}`}
                                                alt={`Imagem do evento ${event.nome}`}
                                                className="w-75"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-primary" style={{ fontSize: '1.5rem' }}>{event.data}</p>
                                            <h5 className="text-dark">{event.nome}</h5>
                                            <p className="text-dark">{event.descricao}</p>
                                            <p className="text-dark">Hora: {event.hora}</p>
                                            <p className="text-dark">Local: {event.local}</p>
                                            <p className="text-dark">Valor: {event.valor}</p>
                                            <a href={`/eventos/${event._id}`} className="btn btn-primary md-5">Ver mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))
                )
            )}
        </Carousel>
        </div>
    );
}

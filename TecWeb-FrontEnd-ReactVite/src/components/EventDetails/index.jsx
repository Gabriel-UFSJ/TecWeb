import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/evento/${id}`);
        if (!response.ok) {
          throw new Error('Não foi possível buscar os detalhes do evento.');
        }
        const data = await response.json();
        setEvent(data);
        console.log('Detalhes do evento:', data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <div>
      {event ? (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <div className="col-md-6 mb-5">
                <img
                    src={`http://localhost:3000/imagens/${event.image}`}
                    alt={`Imagem do evento ${event.nome}`}
                    className="w-75"
                />
            </div>
            <div className="col-md-6 bg-light p-4 rounded-5"
            style={{height: '100%',
                    width: '40%',
                }}
            >
                <p className="text-primary" style={{ fontSize: '1.5rem' }}>{event.data}</p>
                <h5 className="text-dark">{event.nome}</h5>
                <p className="text-dark">{event.descricao}</p>
                <p className="text-dark">Hora: {event.hora}</p>
                <p className="text-dark">Local: {event.local}</p>
                <p className="text-dark">Valor: {event.valor}</p>
            </div>
        </div>
      ) : (
        <div>
          <p>Carregando detalhes do evento...</p>
        </div>
      )}
    </div>
  );
}
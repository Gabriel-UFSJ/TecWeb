import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import ErrorImg from '../../assets/error.png';

import Swal from 'sweetalert2'

export function EventRegister() {
    const [evento, setEvento] = useState({
        nome: '',
        descricao: '',
        local: '',
        data: '',
        hora: '',
        valor: '',
        image: null,
    });

    const criadoEm = new Date();
    const atualizadoEm = new Date();

    const user = localStorage.getItem('token');

    const navigate = useNavigate();

    const imageRef = useRef(null);
    useEffect(() => {
        imageRef.current = new Image();
    }, []);

    const handleInputChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            if (files.length > 0) {
                const file = files[0];
                const objectUrl = URL.createObjectURL(file);

                setEvento({
                    ...evento,
                    image: file,
                });

                imageRef.current.src = objectUrl;
            }
        } else {
            setEvento({
                ...evento,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', evento.nome);
        formData.append('descricao', evento.descricao);
        formData.append('local', evento.local);
        formData.append('data', evento.data);
        formData.append('hora', evento.hora);
        formData.append('valor', evento.valor);
        formData.append('criadoEm', criadoEm.toISOString());
        formData.append('atualizadoEm', atualizadoEm.toISOString());
        formData.append('image', evento.image);

        try {
            const response = await fetch('http://localhost:3000/evento', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + user,
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            if (data.error) {
                //alert(data.error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao cadastrar evento!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                //alert('Evento cadastrado com sucesso!');
                Swal.fire({
                    icon: 'success',
                    title: 'Evento cadastrado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao cadastrar evento!',
                showConfirmButton: false,
                timer: 1500
            })
            //alert('Erro ao cadastrar evento!');
        }
    };

    return (
        <div className='mt-1 pt-1'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="image">
                    <Form.Label>URL da Imagem</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="nome">
                    <Form.Label>Nome do Evento</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={evento.nome}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="descricao">
                    <Form.Label>Descrição do Evento</Form.Label>
                    <Form.Control
                        type='text'
                        name='descricao'
                        value={evento.descricao}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="local">
                    <Form.Label>Local do Evento</Form.Label>
                    <Form.Control
                        type='text'
                        name='local'
                        value={evento.local}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="data">
                    <Form.Label>Data do Evento</Form.Label>
                    <Form.Control
                        type='date'
                        name='data'
                        value={evento.data}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="hora">
                    <Form.Label>Hora do Evento</Form.Label>
                    <Form.Control
                        type='time'
                        name='hora'
                        value={evento.hora}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="valor">
                    <Form.Label>Valor do Evento</Form.Label>
                    <Form.Control
                        type='number'
                        name='valor'
                        value={evento.valor}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar Evento
                </Button>
            </Form>

            <div className="text-center">
                <h2>Pré-visualização do Evento</h2>
                {evento && (
                    <div className='mx-auto d-block pb-5' style={{
                        width: '50rem',
                        transition: 'width 0.5s',
                    }}>
                        <div className='bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center d-flex justify-content-center'
                            style={{ height: '25rem' }}
                        >
                            <div className="row">
                                <div className="col-md-6 mb-5">
                                    {evento.image && (
                                        <div>
                                            <img
                                                ref={imageRef}
                                                src={URL.createObjectURL(evento.image)} // Atualize aqui
                                                alt="Preview"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    )}
                                    {!evento.image && (
                                        <div>
                                            <img
                                                src={ErrorImg}
                                                alt="Nenhum evento encontrado"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <p className="text-primary" style={{ fontSize: '1.5rem' }}>Data: {evento.data}</p>
                                    <h5 className="text-dark">Nome: {evento.nome}</h5>
                                    <p className="text-dark">Descrição: {evento.descricao}</p>
                                    <p className="text-dark">Local: {evento.local}</p>
                                    <p className="text-dark">Hora: {evento.hora}</p>
                                    <p className="text-dark">Valor: R${evento.valor}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}




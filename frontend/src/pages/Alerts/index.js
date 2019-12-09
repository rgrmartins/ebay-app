import React, { useState } from 'react';
import { FaEbay, FaPlus, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container } from '../../components/Container';

import { Form, SubmitButton } from './styles';

function Alerts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [researchTime, setResearchTime] = useState('');

  async function handleAddAlert() {
    api
      .post('/alerts', {
        name,
        email,
        search_phrase: searchPhrase,
        research_time: researchTime,
      })
      .then(() => {
        toast.success(
          'Alerta criado com sucesso, em breve receberá e-mails com os produtos pesquisados'
        );
      })
      .catch(err => {
        toast.error(`Erro ao tentar criar um novo Alerta: ${err}`);
      });

    setName('');
    setEmail('');
    setSearchPhrase('');
    setResearchTime('');
  }

  return (
    <Container>
      <h1>
        <FaEbay />
        Alertas
      </h1>

      <Form>
        <input
          title="name"
          placeholder="Digite Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Digite E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Pesquise o que quiser"
          value={searchPhrase}
          onChange={e => setSearchPhrase(e.target.value)}
        />
        <br />
        <h4>Tempo de pesquisa e envio de e-mail</h4>
        <select
          value={researchTime}
          onChange={e => setResearchTime(e.target.value)}
        >
          <option>Selecione o tempo desejado</option>
          <option value="2">2 Minutos</option>
          <option value="10">10 Minutos</option>
          <option value="30">30 Minutos</option>
        </select>

        <SubmitButton onClick={handleAddAlert}>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
      <br />
      <br />
      <h3>
        <FaArrowRight />
        <Link to="/alerts">Todos os alertas criados</Link>
      </h3>
    </Container>
  );
}

export default Alerts;

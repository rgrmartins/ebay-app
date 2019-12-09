import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBell } from 'react-icons/fa';
import { ContainerList } from '../../components/Container';
import api from '../../services/api';

// import { Form, SubmitButton } from './styles';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'E-mail',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Search Phrase',
    selector: 'search_phrase',
    sortable: true,
  },
  {
    name: 'Research Time',
    selector: 'research_time',
    sortable: false,
  },
];

function AlertsList() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // aqui usar a api para buscar os alerts criado
    api.get('/').then(res => {
      setAlerts(res.data);
    });
  }, []);

  return (
    <ContainerList>
      <h1>
        <FaBell />
        Lista de Alertas Criados
      </h1>
      <h3>
        <br />
        <FaArrowLeft />
        <Link to="/">Criar novo Alerta</Link>
      </h3>
      <DataTable
        columns={columns}
        data={alerts}
        pagination
        noDataComponent="Não há registros para exibir"
      />
    </ContainerList>
  );
}

export default AlertsList;

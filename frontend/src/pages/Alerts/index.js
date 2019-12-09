import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é um campo obrigatório.'),
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('O e-mail é um campo obrigatório'),
});

export default function Alert() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <button type="submit">Criar Alerta</button>
        <Link to="/alerts">Listar todos os Alertas criados</Link>
      </Form>
    </>
  );
}

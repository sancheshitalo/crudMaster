import express from 'express';
import { ClienteRepository } from './entity/cliente.repository';
import { EntityNotFoundError, Like } from 'typeorm';
import { Cliente } from './entity/cliente.entity';
import { isObjectEmpty } from '../000-common/utils/object';
import { ParamsConsultarCliente } from './etc/type';
import { ClienteService } from './cliente.service';

const clienteController = express.Router();

clienteController.get('/buscar-clientes', async (req, resp) => {
  const params = req.query as ParamsConsultarCliente;

  if (!isObjectEmpty(params)) {
    return resp.status(400).send('Nenhum parâmetro de pesquisa informado');
  }

  const clienteEncontrado = await ClienteRepository.find({
    where: {
      nome: Like(`%${params.nome}%`),
    },
  });

  return resp.json(clienteEncontrado);
});

clienteController.get('/clientes-cadastrados', (req, res) => {
  const clientesCadastrados = [
    { name: 'weslei' },
    { name: 'hitalo' },
    { name: 'bigode' },
    { name: 'rogerio' },
    { name: 'baldman' },
    { name: 'arion' },
  ];

  res.json(clientesCadastrados);
});

clienteController.post('/cadastrar-cliente', async (req, resp) => {
  const data = req.body;

  const clienteSalvo = await ClienteService.salvar(data);

  resp.status(201).send(clienteSalvo);
});

clienteController.put('/atualizar-cliente', async (req, resp) => {
  try {
    const data = req.body as Partial<Cliente>;

    if (!data.id) {
      return resp.status(400).send('Por favor informe o ID do cliente');
    }

    let cliente = await ClienteRepository.findOneOrFail({
      where: {
        id: data.id,
      },
    });

    await ClienteRepository.update(
      {
        id: cliente.id,
      },
      {
        ...data,
      },
    );

    return resp.send('Cliente atualizado com sucesso');
  } catch (err) {
    if (err instanceof EntityNotFoundError) {
      return resp
        .status(404)
        .send('Cliente informado não encontrado para atualizar');
    }
  }
});

clienteController.delete('/deletar-cliente/:clientId', async (req, resp) => {
  const clientId = req.params['clientId'];

  try {
    const cliente = await ClienteRepository.findOneOrFail({
      where: {
        id: +clientId,
      },
    });

    ClienteRepository.delete({
      id: cliente.id,
    });

    return resp.send('Cliente excluído com sucesso!');
  } catch (err) {
    if (err instanceof EntityNotFoundError) {
      return resp
        .status(404)
        .send('Cliente informado não encontrado para deletar');
    }
  }
});

export default clienteController;

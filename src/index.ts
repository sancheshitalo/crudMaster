const express = require('express');
import { Cliente } from "./cliente/entity/cliente.entity";
import { AppDataSource } from "./data-source";
import "reflect-metadata"
import { ClienteRepository } from './cliente/entity/cliente.repository'
import { EntityNotFoundError, Like } from "typeorm";

const app = express()
const port = 3000;

type ParamsConsultarCliente = {
    nome?: string;
    idade?: string;
}

//MIDDLEWARE
app.use(express.json());

// ROTAS
app.get('/', (req, res) => {
    const data = req.body
    const clienteSalvo = data
    const dadosAdicionais = {
        city: 'maringá'
    }
    res.status(201).send({
        ...clienteSalvo,
        ...dadosAdicionais
    })
});

app.get('/buscar-clientes', async (req, resp)  => {

    const params = req.query as ParamsConsultarCliente
    
    if(!isObjectEmpty(params)){
        return resp.status(400).send('Nenhum parâmetro de pesquisa informado')
    }

    const clienteEncontrado = await ClienteRepository.find({
        where: {
            nome: Like(`%${params.nome}%`)
        }
    })

    return resp.json(clienteEncontrado)
})

app.get('/clientes-cadastrados', (req, res) => {
    const clientesCadastrados = [
        { name: 'weslei' },
        { name: 'hitalo' },
        { name: 'bigode' },
        { name: 'rogerio' },
        { name: 'baldman' },
        { name: 'arion' },
    ]

    res.json(clientesCadastrados);

})

app.post('/cadastrar-cliente', async (req, resp) => {
    const data = req.body

    const clienteSalvo = await ClienteRepository.save(data)

    resp.status(201).send(clienteSalvo)
});

app.put('/atualizar-cliente', async (req, resp) => {
    try{
      const data = req.body as Partial<Cliente>
  
      if(!data.id){
        return resp.status(400).send('Por favor informe o ID do cliente')
      }
  
      let cliente = await ClienteRepository.findOneOrFail({
        where: {
          id: data.id
        }
      })
   
      await ClienteRepository.update({
        id: cliente.id
      }, {
        ...data
      })
  
      return resp.send('Cliente atualizado com sucesso')
    }catch(err){
      if(err instanceof EntityNotFoundError){
        return resp.status(404).send('Cliente informado não encontrado para atualizar')
      }
    }
})

app.delete('/deletar-cliente/:clientId', async(req, resp) => {
    const clientId = req.params['clientId']
  
    try{
      const cliente = await ClienteRepository.findOneOrFail({
        where: {
          id: +clientId
        }
      })
  
      ClienteRepository.delete({
        id: cliente.id
      })
    
      return resp.send('Cliente excluído com sucesso!')
    }catch(err){
      if(err instanceof EntityNotFoundError){
        return resp.status(404).send('Cliente informado não encontrado para deletar')
      }
    }   
})



//START SERVER
app.listen(port, () => {
    console.log('Servidor online na porta 3000.')
});

//UTILS
const isObjectEmpty = (obj) => {
    const hasKeys = Object.keys(obj)
    return hasKeys.length > 0
}
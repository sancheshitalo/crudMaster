const express = require('express');

const app = express()
const port = 3000;

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

app.get('/buscar-clientes', (req, resp) => {
    const clientes = [
        {name: 'weslei'},
        {name: 'hitalo'},
        {name: 'bigode'},
    ]

    const params = req.query
    
    if(!isObjectEmpty(params)){
        return resp.status(400).send('Nenhum parâmetro de pesquisa informado')
    }

    const clienteEncontrado = clientes.filter((client) => client.name === params.name)

    resp.json(clienteEncontrado)
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

app.post('/cadastrar-cliente', (req, resp) => {
    resp.status(201).send('Cliente cadastrado')
});

//START SERVER
app.listen(port, () => {
    console.log('Servidor online na porta 3000.')
});

//UTILS
const isObjectEmpty = (obj) => {
    const hasKeys = Object.keys(obj)
    return hasKeys.length > 0
}
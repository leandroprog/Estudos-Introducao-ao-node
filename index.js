const express = require('express');

const server = express();

server.use(express.json());

const users = ['Leandro', 'Izabela', 'Ilma'];

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index',(req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});


server.post('/users', (req, res) =>  {
  const { name } = req.body;

  users.push(name)

  return res.json(users);
});

server.put('/users/:index', (req, res) => {
  
  const { index } = req.params;
  const { newName } = req.body;

  if(users.length < index){
    res.status(400).json({ messagem: 'Usuário não encontrado'})
  }

  users[index] = newName;

  return res.json(users);
})

server.delete('/users/:index', (req, res) =>{

  const { index } = req.params;

  if(users.length < index){
    res.status(400).json({ messagem: 'Usuário não encontrado'})
  }

  users.splice(index, 1);

  return res.send();

})

server.listen(3000);
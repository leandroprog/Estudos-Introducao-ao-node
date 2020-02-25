const express = require('express');

const server = express();

server.use(express.json());

const users = ['Leandro', 'Izabela', 'Ilma'];


function checkUsersExists( req, res, next ) {
  
  if(!req.body.name){
    return res.status(400).json( { error: 'O nome do usuário é obrigatório'})
  }

  return next();
}

function checkUserInArray(  req, res, next) {
  const user = users[req.params.index];
  
  if(!user){
    return res.status(400).json({ messagem: 'Usuário não encontrado'})
  }

  req.user = user;

  return next();
}


server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  const { user } =  req;
  return res.json(user);
});


server.post('/users', checkUsersExists,  (req, res) =>  {
  const { name } = req.body;

  users.push(name)

  return res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUsersExists, (req, res) => {
  
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

server.delete('/users/:index', checkUserInArray, (req, res) =>{

  const { index } = req.params;

  users.splice(index, 1);

  return res.send();

})

server.listen(3000);
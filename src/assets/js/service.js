const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const usuarios = [];

app.post('/register', (req, res) => {
  const { email, senha, endereco, complemento, cidade, estado, cep } = req.body;
//verifica se já existe
  const usuarioExistente = usuarios.find(u => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ message: 'Usuário já cadastrado' });
  }
  //usuario registrado
  usuarios.push({ email, senha, endereco, complemento, cidade, estado, cep });
  res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

//login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  res.status(200).json({ message: 'Login bem-sucedido!', user: usuario });
});
//porta api
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});

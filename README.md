# Server utilizando Typescript

## Servidor Nodejs Express + Typescript

Servidor de autenticação de usuário.
Funcionalidades:
Criar usuário, deletar usuário, update de usuário, login de usuário.
Token JWT configurado, token de login e authorization bearer necessitando para algumas rotas.

Rotas:
DELETE = http://127.0.0.1:3000/api/v1/user/:id
GETUSER = http://127.0.0.1:3000/api/v1/user/:id

GETUSERS = http://127.0.0.1:3000/api/v1/users
CREATEUSER = http://127.0.0.1:3000/api/v1/users
schema: 
{
  "name": "Jean Doe",
  "email": "teste@example.com",
  "image": "https://example.com/avatar.jpg",
  "password": "senha123",
  "phone": "123456789",
  "profession": "Developer",
  "links": [
    {
      "title": "Linkedin",
      "url": "https://www.google.com"
    },
    {
      "title": "Facebook",
      "url": "https://github.com"
    },
    {
      "title": "Instagran",
      "url": "https://www.openai.com"
    }
  ]
}

UPDATEUSER = http://127.0.0.1:3000/api/v1/users/:id

LOGINUSER = http://127.0.0.1:3000/api/v1/login
Schema: 
{
	"email": "johndoe@example.com",
	"password": "senha123"
}
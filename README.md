# 🍽️ Cafeteria DS2T - Backend Landing Page

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> Backend da API para a Landing Page do Projeto Integrado Cafeteria - SENAI Jandira

## 📋 Sobre o Projeto

Este repositório contém o backend da API responsável pela landing page do Projeto Integrado de Cafeteria da turma DS2T do SENAI Jandira. A API fornece os endpoints necessários para gerenciar dados e conteúdos da página inicial da aplicação.

**Instituição:** SENAI Jandira  
**Curso:** Desenvolvimento de Sistemas  
**Turma:** DS2T  
**Projeto:** Cafeteria

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **JavaScript** - Linguagem de programação
- **Express**
- **CORS**
- **Knex**
- **mysql2**

## 📁 Estrutura do Projeto

```
├── controller/       # Controladores da API
├── doc/              # Documentação Swagger
├── model/            # Modelos de dados
├── node_modules/     # Modelos do Node
├── routes/           # Rotas da aplicação
├── app.js            # Arquivo App
├── LICENSE           # MIT License
├── package-lock.json # Dependências do projeto
├── package.json      # Dependências do projeto
└── README.md         # Este arquivo
```

## ⚙️ Instalação

### Pré-requisitos

- Node.js (v14.0.0 ou superior)
- npm

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/gustavidal/pi-cafeteria-ds2t-backend-landingpage.git
cd pi-cafeteria-ds2t-backend-landingpage
```

2. **Instale as dependências:**
```bash
npm install
```

4. **Inicie o servidor:**
```bash
node app.js
```

O servidor será iniciado em `http://localhost:8090`

## 📚 Documentação da API

### Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Retorna informações da API |
| GET | `/:id` | Retorna informações de um item específico da API |

## 👨‍💻 Contribuidores

- Estephano Borovicz, Desenvolvedor de Banco de Dados (MySQL)
- Gustavo Vidal, Desenvolvedor Back-End (Node.js)
- Kaique Carvalho, Desenvolvedor Front-End (HTML, CSS e JavaScript)
- Ryan Alcântara, Desenvolvedor de Projetos

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ no SENAI Jandira**
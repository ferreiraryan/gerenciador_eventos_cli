# 🚀 Gerenciador de Eventos CLI

Uma aplicação de linha de comando para gerenciar um cadastro de eventos, desenvolvida com Node.js, TypeScript e arquitetura MVC para fins de estudo e portfólio.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/) e [TypeScript](https://www.typescriptlang.org/)
- [Inquirer.js](https://www.npmjs.com/package/inquirer) para interações de linha de comando
- [UUID](https://www.npmjs.com/package/uuid) para geração de identificadores únicos
- Arquitetura MVC (Model-View-Controller)

---

## 📂 Estrutura do Projeto

A estrutura do projeto foi organizada seguindo o padrão MVC para separar as responsabilidades do código em camadas (dados, visualização e controle), facilitando a manutenção.

```
/gerenciador-eventos-cli
│
├── database/
│   └── events.json        # Arquivo de persistência dos dados
│
├── src/
│   ├── models/            # Camada de dados (Interface e Service)
│   │   ├── Evento.ts
│   │   └── EventService.ts
│   │
│   ├── views/             # Camada de visualização (Interação com usuário)
│   │   └── EventView.ts
│   │
│   ├── controllers/       # Camada de controle (Lógica de negócios)
│   │   └── EventController.ts
│   │
│   └── app.ts             # Ponto de entrada da aplicação
│
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configurações do TypeScript
```

---

## 📥 Instalação e Configuração

```bash
# Clone este repositório
git clone https://github.com/ferreiraryan/gerenciador-eventos-cli

# Acesse o diretório
cd gerenciador-eventos-cli

# Instale as dependências
npm install
```

Não é necessária nenhuma configuração adicional de APIs ou variáveis de ambiente.

```bash
# Após a instalação, execute o projeto
npm start
```

---

## 🛠️ Como usar

O sistema é operado através de um menu interativo no terminal e permite gerenciar o ciclo de vida de eventos:

- **Adicionar Evento**: Coleta os dados (nome, data, local, capacidade) e salva um novo evento.
- **Listar Todos**: Exibe todos os eventos cadastrados com seus detalhes e status em uma tabela.
- **Buscar Eventos**: Permite encontrar eventos específicos buscando por nome ou local (a busca é parcial e não diferencia maiúsculas/minúsculas).
- **Atualizar Evento**: Permite escolher um evento da lista e alterar seus dados.
- **Cancelar Evento**: Altera o status de um evento para 'cancelado'.
- **Registrar Participante**: Adiciona um participante a um evento, respeitando a capacidade máxima.

---

## 🤝 Contribuindo

Sinta-se à vontade para contribuir! Basta seguir os passos abaixo:

1. Faça um **fork** do projeto.
2. Crie uma **branch** com a sua feature: `git checkout -b minha-feature`
3. Faça **commit** das suas alterações: `git commit -m 'Adiciona nova feature'`
4. Envie para o GitHub: `git push origin minha-feature`
5. Abra um **Pull Request**

---

## 📬 Contato

- **Ryan Ferreira** - [ryanferreira4883@gmail.com](mailto:ryanferreira4883@gmail.com)
- **GitHub** - [https://github.com/ferreiraryan](https://github.com/ferreiraryan)
- **LinkedIn** - [https://www.linkedin.com/in/ferryan/](https://www.linkedin.com/in/ferryan/)

---

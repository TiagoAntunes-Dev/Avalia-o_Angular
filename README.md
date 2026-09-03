# 📋 Sobre o Projeto

Este projeto foi desenvolvido como Avaliação de Aprendizado e consiste em um CRUD completo (Create, Read, Update, Delete) de professores, com interface moderna, validações de formulário e persistência de dados via API REST simulada.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
| :--- | :--- | :--- |
| **Angular** | 16 | Framework frontend |
| **TypeScript** | 5.0 | Linguagem principal |
| **JSON-Server** | 0.17 | API REST simulada |
| **Reactive Forms** | — | Formulários com validação |
| **HttpClient** | — | Comunicação com a API |

---

## 📁 Estrutura do Projeto

```text
projeto-professor/
├── angular.json                 ← Configuração do Angular
├── package.json
├── backend/
│   └── db.json                  ← Banco de dados simulado
└── src/
    └── app/
        ├── models/
        │   └── professor.model.ts        ← Interface Professor
        ├── services/
        │   └── professor.service.ts      ← Serviço HTTP (CRUD)
        └── components/
            ├── professor-list/           ← Tela de listagem
            └── professor-form/           ← Tela de cadastro/edição

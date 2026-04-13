📋 Sobre o Projeto
Este projeto foi desenvolvido como Avaliação de Aprendizado e consiste em um CRUD completo (Create, Read, Update, Delete) de professores, com interface moderna, validações de formulário e persistência de dados via API REST simulada.

🚀 Tecnologias Utilizadas
TecnologiaVersãoFinalidadeAngular16Framework frontendTypeScript5.0Linguagem principalJSON-Server0.17API REST simuladaReactive Forms—Formulários com validaçãoHttpClient—Comunicação com a API

📁 Estrutura do Projeto
projeto-professor/
├── angular.json                  ← Configuração do Angular
├── package.json
├── backend/
│   └── db.json                   ← Banco de dados simulado
└── src/
    └── app/
        ├── models/
        │   └── professor.model.ts        ← Interface Professor
        ├── services/
        │   └── professor.service.ts      ← Serviço HTTP (CRUD)
        └── components/
            ├── professor-list/           ← Tela de listagem
            └── professor-form/           ← Tela de cadastro/edição

🧩 Interface Professor
typescriptexport interface Professor {
  id?:        number;
  rgf:        number;
  nome:       string;
  cep:        string;
  disciplina: string;
  idade:      number;
}

✅ Funcionalidades

 Listar todos os professores
 Cadastrar novo professor
 Editar professor existente
 Remover professor com confirmação
 Validação de formulário (campos obrigatórios, formatos, etc.)
 Formatação automática do CEP
 Feedback visual de sucesso e erro


🔒 Regras de Negócio

RGF deve ser numérico e não pode ser menor que 0
Nome deve ter no mínimo 3 caracteres
CEP deve seguir o formato 00000-000
Idade deve estar entre 18 e 100 anos
Todos os campos são obrigatórios


# Attus Frontend Test

<div align="center">
    <div data-badges>
        <img src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 21" />
        <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/ngrx-%23BA2BD2.svg?style=for-the-badge&logo=redux&logoColor=white" alt="NgRx" />
        <img src="https://img.shields.io/badge/angular%20material-%230081CB.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular Material" />
        <br/>
        <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
        <img src="https://img.shields.io/badge/reactive%20forms-%23FF6F00.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Reactive Forms" />
        <img src="https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS" />
        <img src="https://img.shields.io/badge/vitest-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
        <br/>
        <img src="https://img.shields.io/badge/angular%20cdk-%230081CB.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular CDK" />
        <img src="https://img.shields.io/badge/angular%20ssr-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular SSR" />
        <img src="https://img.shields.io/badge/custom%20pipes%20%26%20directives-%23512DA8.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Custom Pipes & Directives" />
        <img src="https://img.shields.io/badge/json%20server-%23000000.svg?style=for-the-badge&logo=json&logoColor=white" alt="JSON Server" />
    </div>
</div>

Teste prático para a vaga de **Desenvolvedor Front-end** na [Attus.ia](https://www.attus.ai/)

## 📋 Sobre o Projeto

Este é um projeto de teste que demonstra conhecimentos práticos em desenvolvimento Front-end moderno com Angular. O projeto consiste em uma aplicação de gerenciamento de usuários com autenticação, formulários reativos, state management com NgRx e testes automatizados.

## 🛠️ Principais Skills Utilizadas

- **Angular 21** - Framework principal com componentes standalone
- **TypeScript** - Linguagem de tipagem forte
- **NgRx** - Gerenciamento de estado centralizado (Store, Actions, Effects, Reducers, Selectors)
- **Angular Material** - Componentes de UI profissionais
- **Tailwind CSS** - Utility-first CSS framework
- **Reactive Forms** - Formulários reativos e validadores customizados
- **RxJS** - Programação reativa com Observables
- **Vitest** - Framework de testes de alta performance
- **Angular CDK** - Component Dev Kit para funcionalidades avançadas
- **Angular SSR** - Server-Side Rendering
- **Pipes e Directives Customizadas** - CPF e Phone Mask
- **JSON Server** - Mock API para desenvolvimento

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ e npm 10+

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/devLuanPaiva/attus-frontend-test.git
cd attus-frontend-test
```

2. **Instale as dependências**

```bash
npm install
```

## 🚀 Como Iniciar o Projeto

### Servidor de Desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

### API Mock (JSON Server)

Em outro terminal, execute:

```bash
npm run api
```

A API estará disponível em `http://localhost:3000`

### Testes Unitários

```bash
npm run test
```

### Cobertura de Testes

```bash
npm run test:coverage
```

### Build para Produção

```bash
npm run build
```

## 📂 Estrutura do Projeto

```
respostas-teste-pratico/       # Respostas das questões do documento
|
src/
├── app/
│   ├── core/
│   │   └── services/          # Serviços compartilhados
│   ├── features/
│   │   └── users/             # Feature module de usuários
│   │       ├── components/    # Componentes reutilizáveis
│   │       └── store/         # Estado NgRx
│   ├── shared/
│   │   ├── directives/        # Diretivas customizadas
│   │   ├── pipes/             # Pipes customizados
│   │   ├── validators/        # Validadores customizados
│   │   └── models/            # Modelos compartilhados
│   ├── app.ts                 # Componente raiz
│   └── app.routes.ts          # Configuração de rotas
├── test-setup.ts              # Configuração de testes
└── main.ts                     # Entry point
```

## 🧪 Testes

O projeto utiliza **Vitest** com **jsdom** para testes unitários. Os testes cobrem:

- Serviços
- Componentes
- Store (Actions, Reducers, Selectors, Effects)
- Validadores customizados

## 📝 Licença

Este projeto é parte de um processo seletivo e é fornecido apenas para fins de avaliação.

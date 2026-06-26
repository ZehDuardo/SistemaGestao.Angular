# 🅿️ Estacionamento Central Park — Angular

Sistema de gerenciamento de estacionamento desenvolvido em **Angular** com **TypeScript**, consumindo a API REST em **C# (ASP.NET Core)** com autenticação **JWT**.

---

## 🚀 Tecnologias utilizadas

- **Frontend:** Angular 22 + TypeScript
- **Backend:** C# / ASP.NET Core Web API (projeto separado)
- **Autenticação:** JWT (JSON Web Token)
- **HTTP:** HttpClient com Interceptor automático

---

## 📋 Funcionalidades

- ✅ Login com autenticação JWT
- ✅ Guard — protege rotas sem login
- ✅ Interceptor — envia token automaticamente
- ✅ Visualização de 18 vagas em tempo real
- ✅ Registro de entrada e saída de veículos
- ✅ Cadastro de veículos (Carro/Moto)
- ✅ Cadastro de clientes
- ✅ Relatório de entradas e saídas com tempo de permanência
- ✅ Gerenciamento de usuários (somente Admin)

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- API C# rodando (projeto SistemaGestao.API)

### Passo a passo

1. Inicie a API C# primeiro (obrigatório):
```
cd ..\SistemaGestao.API
dotnet run
```

2. Instale as dependências:
```
npm install
```

3. Inicie o Angular:
```
ng serve
```

4. Acesse no navegador:
```
http://localhost:4200
```

---

## 👤 Usuário padrão

| Campo | Valor |
|-------|-------|
| Usuário | admin |
| Senha | admin123 |

---

## 📁 Estrutura do projeto

```
src/app/
├── components/
│   ├── login/
│   ├── dashboard/
│   ├── cadastro-veiculo/
│   ├── cadastro-cliente/
│   ├── relatorio/
│   ├── usuario/
│   └── sidebar/
├── services/
│   ├── auth.ts
│   ├── veiculo.ts
│   ├── cliente.ts
│   └── ocupacao.ts
├── guards/
│   └── auth-guard.ts
├── interceptors/
│   └── auth-interceptor.ts
├── models/
│   ├── usuario.model.ts
│   ├── veiculo.model.ts
│   ├── cliente.model.ts
│   └── ocupacao.model.ts
├── app.routes.ts
├── app.config.ts
└── app.ts
```

---

## 🔗 Endpoints da API utilizados

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| /api/Auth/login | POST | Autenticação |
| /api/Auth/cadastro | POST | Criar usuário |
| /api/Auth/usuarios | GET | Listar usuários |
| /api/Veiculo | GET/POST/DELETE | CRUD veículos |
| /api/Cliente | GET/POST/DELETE | CRUD clientes |
| /api/Ocupacao/ativas | GET | Vagas ocupadas |
| /api/Ocupacao/entrada | POST | Registrar entrada |
| /api/Ocupacao/saida/{vaga} | POST | Registrar saída |
| /api/Ocupacao/historico | GET | Relatório completo |

---

Desenvolvido usando Angular + C# ASP.NET Core + SQL Server.

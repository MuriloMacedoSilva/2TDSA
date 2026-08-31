# Advanced Business Development com .NET - WhatsApp Gateway

## 📝 Objetivo
Este projeto tem como objetivo o desenvolvimento de uma API RESTful robusta para integração com o WhatsApp, utilizando ASP.NET Core. O sistema atua como um gateway, permitindo o envio de mensagens e gerenciamento de logs de comunicação, com persistência de dados em banco de dados Oracle.

## 🚀 Tecnologias Utilizadas
- **Linguagem/Framework**: .NET 8 / ASP.NET Core (Minimal APIs)
- **Persistência**: Entity Framework Core + Oracle
- **Containerização**: Docker (Docker Compose)
- **Documentação**: Swagger / Open API

## ⚙️ Instruções de Instalação e Execução

### Pré-requisitos
- .NET 8 SDK
- Docker & Docker Compose
- Acesso a um banco de dados Oracle

### Passos para Executar
1. **Configurar o Ambiente**: 
   - Certifique-se de que o Docker esteja rodando.
   - Navegue até a pasta `infra/` e suba o container do WppConnect:
     ```bash
     docker compose up -d
     ```
2. **Configurar o Banco de Dados**:
   - Ajuste a string de conexão no `appsettings.json` para o seu banco Oracle.
   - Execute as migrações:
     ```bash
     dotnet ef database update
     ```
3. **Rodar a Aplicação**:
   ```bash
   dotnet run
   ```
4. **Documentação**:
   - Acesse `http://localhost:<porta>/swagger` para visualizar e testar os endpoints.

## 🗺️ Rotas da API

| Método | Rota | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| POST | `/api/whatsapp/send/{number}` | Envia mensagem WhatsApp | 200, 400, 500 |
| GET | `/api/logs` | Lista todos os logs de envio | 200 |
| GET | `/api/logs/{id}` | Busca log por ID | 200, 404 |
| POST | `/api/logs` | Cria um novo log manualmente | 201 |
| PUT | `/api/logs/{id}` | Atualiza um log | 200, 404 |
| DELETE | `/api/logs/{id}` | Remove um log | 204, 404 |

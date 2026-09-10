# CLYVO - Estado Atual do Projeto

Este arquivo registra o estado funcional e arquitetural do CLYVO para continuidade entre sessoes. O workspace contem dois repositorios Git independentes: backend Java e aplicativo mobile.

## Estrutura do Workspace

- Backend: `Java/api`
- Frontend mobile: `Front/clyvo/clyvo-challenge-clyvo-vet`
- Backend package base: `com.FirstApiChallenge.api`
- API mobile: `Front/clyvo/clyvo-challenge-clyvo-vet/src/services/api.ts`

## Arquitetura Atual

### Backend

Stack:

- Java 21
- Spring Boot 4.0.6
- Spring MVC
- Spring Data JPA / Hibernate
- Bean Validation
- Lombok
- SpringDoc / Swagger
- H2 em memoria no desenvolvimento
- Driver Oracle disponivel em runtime

Organizacao:

- `model`: entidades JPA
- `dto`: records de request e response
- `repository`: interfaces Spring Data JPA
- `service`: regras de negocio e fronteiras transacionais
- `controller`: endpoints REST e `ResponseEntity`
- `enums`: estados de dominio e tipos de notificacao
- `exception`: `CustomException`, `ErrorResponse` e `GlobalExceptionHandler`

Configuracao principal: `Java/api/src/main/resources/application.properties`.

- Banco: `jdbc:h2:mem:clyvoVetDB`
- H2 Console: `/h2-console`
- `spring.jpa.hibernate.ddl-auto=update`
- `spring.jpa.show-sql=true`
- Nao ha Flyway ou Liquibase.

### Frontend

Stack:

- React Native 0.81
- React 19
- Expo 54
- TypeScript estrito
- React Navigation com Drawer e Native Stack
- Axios
- AsyncStorage
- Ionicons

Organizacao:

- `src/app/navigation`: stacks, drawers e tipos de rota
- `src/features/auth`: cadastro, login, contexto e tipos de usuario
- `src/features/tutorFlow`: telas e tipos do Tutor/Animal
- `src/features/vetFlow`: telas do Veterinario e formularios clinicos
- `src/features/appointment`: tipos de consulta
- `src/features/medicalRecord`: historico clinico e tipos
- `src/features/prescription`: prescricao, itens e secao visual
- `src/features/exam`: exames, tipos e secao visual
- `src/services/api.ts`: instancia Axios

A `baseURL` da API esta fixa em um IP local dentro de `src/services/api.ts`. Ajustar conforme o ambiente sem espalhar URLs pelas telas.

## Entidades e Relacionamentos

```text
Tutor 1 ----- N Animal

Veterinarian 1 ----- N VeterinarianTutorLink N ----- 1 Tutor

Tutor/Veterinarian 1 ----- N Notification
Notification N ----- 0..1 VeterinarianTutorLink

Appointment N ----- 1 Animal
Appointment N ----- 1 Tutor
Appointment N ----- 1 Veterinarian

MedicalRecord N ----- 1 Animal
MedicalRecord N ----- 1 Veterinarian
MedicalRecord 1 ----- 1 Appointment

Prescription 1 ----- 1 MedicalRecord
Prescription 1 ----- N PrescriptionItem

Exam N ----- 1 MedicalRecord
```

### Integridade relevante

- `Animal`: ID gerado pelo banco; FK obrigatoria para Tutor.
- `Animal`: unique `(tutor_id, name)`.
- `VeterinarianTutorLink`: unique `(veterinarian_id, tutor_id)`.
- `MedicalRecord`: unique `appointment_id`; uma consulta possui no maximo um prontuario.
- `Prescription`: unique `medical_record_id`; um prontuario possui no maximo uma prescricao.
- `PrescriptionItem`: lado proprietario da relacao com Prescription.
- `Prescription.items`: `cascade = ALL`, `orphanRemoval = true` e `@OrderColumn`.
- `Exam`: varios exames podem pertencer ao mesmo prontuario.
- Associacoes clinicas usam `LAZY` e responses usam DTOs.

## Autenticacao e Autorizacao

Nao existe Spring Security, JWT, sessao HTTP autenticada ou `@PreAuthorize`.

O login atual:

- recebe CPF e senha;
- compara a senha diretamente;
- retorna dados do usuario;
- o mobile persiste o usuario no AsyncStorage.

CPF e CRMV informados em path/query identificam o ator nas operacoes. Isso e uma limitacao academica deliberada, nao uma autenticacao segura.

Cuidados:

- Nunca remover as validacoes de propriedade, autoria e vinculo apenas porque o frontend esconde uma acao.
- Operacoes do Veterinario sobre dados de Tutor devem exigir `VeterinarianTutorLink.status == ACCEPTED`.
- Operacoes mutaveis de prontuario, prescricao e exame devem confirmar que o CPF corresponde ao Veterinario responsavel pelo atendimento.
- Tutores devem acessar apenas Animais que lhes pertencem.
- Senhas ainda sao armazenadas e retornadas em texto puro pelos DTOs antigos de Tutor/Veterinario. Nao ampliar essa exposicao em novos DTOs.

## Regras de Tutor e Veterinario

### Tutor

- Pode cadastrar, listar, editar e excluir seus Animais.
- Edicao e exclusao usam `animalId`, nunca nome.
- Tutor existente sem Animais recebe `200 []`.
- Pode visualizar notificacoes, marca-las como lidas e limpar somente as suas.
- Pode aceitar ou rejeitar solicitacoes de vinculo.
- Pode solicitar, listar e cancelar consultas permitidas.
- Pode visualizar historico clinico, prescricoes e exames dos proprios Animais.
- Nao pode criar, editar ou excluir prontuario, prescricao ou exame.

### Veterinario

- Pode pesquisar Tutor e enviar solicitacao de vinculo.
- Pode listar Tutores e Animais somente com vinculo `ACCEPTED`.
- Pode editar Animal somente com vinculo `ACCEPTED`.
- Pode confirmar ou cancelar consultas relacionadas.
- Pode criar/editar prontuario somente quando responsavel pela consulta e ainda vinculado.
- Pode criar/editar prescricao somente quando responsavel pelo prontuario e ainda vinculado.
- Pode solicitar, editar, concluir ou cancelar exame somente quando responsavel pelo prontuario e ainda vinculado.
- Veterinarios com outro vinculo `ACCEPTED` com o Tutor podem ler historico, prescricoes e exames anteriores, mas nao altera-los.

## Vinculos

Entidade: `VeterinarianTutorLink`.

Estados:

- `PENDING`
- `ACCEPTED`
- `REJECTED`

Fluxo:

```text
sem vinculo -> cria PENDING
PENDING -> nova solicitacao retorna 409
ACCEPTED -> nova solicitacao retorna 409
REJECTED -> reutiliza o mesmo registro e ID, volta para PENDING
```

O Tutor recebe notificacao com `linkId`; aceitar ou rejeitar atualiza o mesmo vinculo e notifica o Veterinario.

## Appointment

Entidade: `Appointment`.

Campos principais:

- Animal, Tutor e Veterinario
- `scheduledAt`
- `reason`
- `status`
- timestamps

Estados:

- `PENDING`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`

Regras:

- Tutor so agenda Animal proprio com Veterinario vinculado (`ACCEPTED`).
- Data deve estar no futuro.
- Nao pode haver outro Appointment ativo (`PENDING` ou `CONFIRMED`) para o mesmo Veterinario no horario exato.
- Veterinario confirma `PENDING -> CONFIRMED`.
- Tutor ou Veterinario relacionado cancela `PENDING/CONFIRMED -> CANCELLED`.
- A consulta passa `CONFIRMED -> COMPLETED` durante a criacao transacional do MedicalRecord.
- Nao existe mais conclusao manual separada sem prontuario.

## MedicalRecord

Entidade: `MedicalRecord`.

Campos:

- `appointment` unico
- `animal`
- `veterinarian`
- `diagnosis`
- `description`
- `weight` opcional e positivo
- `temperature` opcional e positiva
- `observations` opcional
- timestamps

Criacao transacional:

```text
Appointment CONFIRMED
-> valida Veterinario responsavel
-> valida vinculo ACCEPTED
-> cria MedicalRecord
-> Appointment vira COMPLETED
-> notifica Tutor
```

- Segundo prontuario para o mesmo Appointment retorna `409`.
- Edicao altera somente dados clinicos e exige autor/vinculo.
- Nao ha exclusao fisica.
- O campo legado `Animal.history` continua existindo para compatibilidade; novos atendimentos estruturados usam MedicalRecord.

## Prescription

Entidades: `Prescription` e `PrescriptionItem`.

- Um MedicalRecord possui zero ou uma Prescription.
- Uma Prescription possui um ou mais itens.
- Cada item possui medicamento, dosagem, frequencia, duracao, via e instrucoes opcionais.
- A prescricao so pode ser criada sobre MedicalRecord cujo Appointment esta `COMPLETED`.
- Criacao e edicao exigem Veterinario responsavel e vinculo `ACCEPTED`.
- Criacao salva Prescription, itens e notificacao na mesma transacao.
- Edicao substitui integralmente os itens; `orphanRemoval` remove os antigos.
- Ordem dos itens e persistida por `item_order`.
- Nao ha exclusao fisica.
- Ausencia de prescricao nas consultas especificas retorna `204 No Content`.
- Prescription e carregada separadamente ao expandir o MedicalRecord no mobile; nao esta embutida em `MedicalRecordResponseDTO`.

## Exam

Entidade: `Exam`.

Estados:

- `REQUESTED`
- `COMPLETED`
- `CANCELLED`

Campos:

- `medicalRecord`
- `examName` obrigatorio
- `examType` opcional
- `requestDate` controlada pelo backend
- `resultDate`
- `result` textual
- `observations`
- timestamps

Regras:

- MedicalRecord deve existir e seu Appointment deve estar `COMPLETED`.
- Somente o Veterinario responsavel, com vinculo `ACCEPTED`, solicita o exame.
- Criacao produz `REQUESTED` e notifica o Tutor.
- Somente `REQUESTED` pode ser editado.
- Resultado obrigatorio faz `REQUESTED -> COMPLETED`, define `resultDate` e notifica o Tutor.
- Cancelamento faz `REQUESTED -> CANCELLED` e notifica o Tutor.
- Exames concluidos ou cancelados nao podem sofrer novas transicoes.
- Mutacoes carregam o Exam com `PESSIMISTIC_WRITE` para serializar resultado/cancelamento concorrentes.
- Resultados sao somente texto; nao ha upload, PDF ou anexo.
- Exams sao carregados separadamente ao expandir o MedicalRecord; nao estao em `MedicalRecordResponseDTO`.

## Notificacoes

Tipos atuais:

- `LINK_REQUEST_SENT`
- `LINK_REQUEST_RECEIVED`
- `LINK_REQUEST_ACCEPTED`
- `LINK_REQUEST_REJECTED`
- `APPOINTMENT_REQUESTED`
- `APPOINTMENT_CONFIRMED`
- `APPOINTMENT_CANCELLED`
- `APPOINTMENT_COMPLETED` (legado, atualmente sem emissor)
- `MEDICAL_RECORD_CREATED`
- `PRESCRIPTION_CREATED`
- `EXAM_REQUESTED`
- `EXAM_RESULT_AVAILABLE`
- `EXAM_CANCELLED`

`NotificationResponseDTO` expoe `linkId`, mas nao possui `appointmentId`, `medicalRecordId`, `prescriptionId` ou `examId`. Notificacoes clinicas sao informativas e nao navegam diretamente ao recurso.

## Endpoints Implementados

### Tutor e Animal

```text
GET    /tutor/ping
POST   /tutor
POST   /tutor/login
GET    /tutor/{cpf}
POST   /tutor/{cpf}/create-animal
GET    /tutor/{cpf}/read-animals
PUT    /tutor/{cpf}/animals/{animalId}
DELETE /tutor/{cpf}/animals/{animalId}
```

### Veterinario

```text
POST /veterinarian
POST /veterinarian/login
GET  /veterinarian/{cpf}
GET  /veterinarian/{cpf}/tutors
PUT  /veterinarian/{cpf}/animals/{animalId}
```

### Vinculos

```text
POST  /v1/links/request?crmvNumber=&tutorCpf=
PATCH /v1/links/{linkId}/respond?tutorCpf=&accept=
GET   /v1/links/pending?tutorCpf=
GET   /v1/links/veterinarian/{veterinarianCpf}/tutor/{tutorCpf}/animals
GET   /v1/links/veterinarian/{veterinarianCpf}/tutors
```

### Notificacoes

```text
GET    /v1/notifications/tutor/{cpf}
GET    /v1/notifications/veterinarian/{cpf}
DELETE /v1/notifications/tutor/{cpf}
DELETE /v1/notifications/veterinarian/{cpf}
PATCH  /v1/notifications/{id}/read
```

### Consultas

```text
POST  /v1/appointments/tutor/{tutorCpf}
GET   /v1/appointments/tutor/{tutorCpf}
GET   /v1/appointments/tutor/{tutorCpf}/veterinarians
GET   /v1/appointments/veterinarian/{veterinarianCpf}
PATCH /v1/appointments/{appointmentId}/confirm?veterinarianCpf=
PATCH /v1/appointments/{appointmentId}/cancel/tutor?tutorCpf=
PATCH /v1/appointments/{appointmentId}/cancel/veterinarian?veterinarianCpf=
```

### Prontuario

```text
POST /v1/medical-records/appointments/{appointmentId}?veterinarianCpf=
PUT  /v1/medical-records/{recordId}?veterinarianCpf=
GET  /v1/medical-records/tutor/{tutorCpf}/animals/{animalId}
GET  /v1/medical-records/veterinarian/{veterinarianCpf}/animals/{animalId}
```

### Prescricoes

```text
POST /v1/prescriptions/medical-records/{medicalRecordId}?veterinarianCpf=
PUT  /v1/prescriptions/{prescriptionId}?veterinarianCpf=
GET  /v1/prescriptions/tutor/{tutorCpf}/medical-records/{medicalRecordId}
GET  /v1/prescriptions/veterinarian/{veterinarianCpf}/medical-records/{medicalRecordId}
```

### Exames

```text
POST  /v1/exams/medical-records/{medicalRecordId}?veterinarianCpf=
PUT   /v1/exams/{examId}?veterinarianCpf=
PATCH /v1/exams/{examId}/result?veterinarianCpf=
PATCH /v1/exams/{examId}/cancel?veterinarianCpf=
GET   /v1/exams/tutor/{tutorCpf}/medical-records/{medicalRecordId}
GET   /v1/exams/veterinarian/{veterinarianCpf}/medical-records/{medicalRecordId}
GET   /v1/exams/tutor/{tutorCpf}/animals/{animalId}
GET   /v1/exams/veterinarian/{veterinarianCpf}/animals/{animalId}
```

## Navegacao e Telas Mobile

Fluxo Tutor (`patient.routes.tsx`):

- `PatientHome`
- `HomePets`
- `RegisterPets`
- `PetDetails`
- `PetBlog`
- `TutorNotification`
- `TutorAppointments`
- `MedicalHistory`

Fluxo Veterinario (`vet.routes.tsx`):

- `VetHome`
- `SearchTutor`
- `VetNotification`
- `HomePetsVet`
- `PetDetails`
- `VetAppointments`
- `MedicalHistory`
- `MedicalRecordForm`
- `PrescriptionForm`
- `ExamForm`
- `ExamResultForm`

`PetDetails` e `MedicalHistory` sao compartilhadas entre os perfis. A tela usa `user.role` do `AuthContext` para escolher o endpoint e ocultar mutacoes do Tutor.

## Padroes de Implementacao

- Controllers novos retornam DTOs, nunca entidades JPA.
- Request e response DTOs sao separados.
- IDs, status e timestamps gerados pelo servidor nao ficam em DTOs de criacao.
- Regras de negocio ficam em Services com `@Transactional`.
- Operacoes que persistem dominio e Notification usam a mesma transacao.
- Erros previsiveis usam `CustomException` e status explicito.
- Bean Validation trata payloads; services repetem invariantes essenciais.
- Listas vazias retornam `200 []`.
- `404`: recurso principal inexistente.
- `400`: payload/transicao invalida.
- `403`: propriedade, autoria ou vinculo negado.
- `409`: duplicidade/conflito de integridade.
- Textos opcionais vazios sao normalizados para `null` nos modulos clinicos.
- Datas trafegam em ISO como `LocalDateTime`; frontend formata para `pt-BR`.
- Mobile usa formularios com `useState`, sem biblioteca externa de forms.
- Prescription e Exam sao carregados sob demanda para evitar ampliar o DTO de MedicalRecord.

## Tratamento de Erros

`GlobalExceptionHandler` preserva:

- status de `CustomException`;
- status de `ResponseStatusException`;
- `400` para Bean Validation, constraints e JSON malformado;
- `409` para `DataIntegrityViolationException`;
- `500` para excecoes inesperadas.

O frontend espera geralmente `{ message: string }` nos erros Axios.

## Funcionalidades Concluidas

- Cadastro e login simples de Tutor e Veterinario.
- CRUD de Animal por ID no fluxo disponivel.
- Vinculos `PENDING`, `ACCEPTED`, `REJECTED`, incluindo reenvio de rejeitado no mesmo registro.
- Notificacoes de vinculo e limpeza separada por perfil.
- Agendamento, listagem, confirmacao e cancelamento de consultas.
- Prontuario clinico estruturado vinculado a consulta concluida.
- Prescricao unica por prontuario com multiplos medicamentos ordenados.
- Solicitacao, edicao, resultado e cancelamento de exames.
- Visualizacao clinica pelo Tutor proprietario e Veterinario vinculado.
- DTOs clinicos sem grafos JPA e sem senhas.

## Funcionalidades Pendentes / Fora do Escopo Atual

- Autenticacao real, hash de senha e autorizacao por principal.
- Migracoes de schema e perfis separados de ambiente.
- Banco persistente configurado para producao.
- Remover senhas dos DTOs antigos de Tutor/Veterinario.
- Remover ou redefinir o campo legado `Animal.history`.
- Referencias genericas nas notificacoes para abrir Appointment/MedicalRecord/Prescription/Exam.
- Upload e visualizacao de laudos, imagens, PDFs e anexos.
- Prescricoes em PDF, assinatura digital e catalogo farmacologico.
- Vacinas, exames laboratoriais estruturados e valores de referencia.
- Paginacao e filtros de historicos clinicos.
- Auditoria de alteracoes clinicas.
- Disponibilidade avancada, duracao e recorrencia de consultas.
- Tratamento uniforme de timezone; atualmente cliente e servidor assumem horario local compativel.

## Cuidados para Nao Quebrar Comportamentos

- Nao voltar a identificar Animal por nome. Edicao e exclusao usam `animalId` da URL.
- Nao recolocar `id` em `AnimalDTO`; IDs de novos Animais sao gerados pelo banco.
- Nao retornar `404` para colecoes vazias.
- Nao expor entidades JPA nos controllers; isso reintroduz ciclos como `Animal -> Tutor -> Animals`.
- Nao incluir senha em novos DTOs.
- Nao criar segundo `VeterinarianTutorLink` apos `REJECTED`; reutilizar o mesmo ID.
- Nao remover as constraints unicas de vinculo, prontuario e prescricao.
- Nao concluir Appointment sem criar MedicalRecord.
- Nao permitir segundo MedicalRecord para o mesmo Appointment.
- Nao permitir segunda Prescription para o mesmo MedicalRecord.
- Na edicao de Prescription, manter `item.setPrescription(prescription)` e a mesma colecao gerenciada para o `orphanRemoval` funcionar.
- Nao permitir mutacoes clinicas por outro Veterinario, mesmo quando ele possui vinculo com o Tutor.
- Manter `PESSIMISTIC_WRITE` nas transicoes de Exam para evitar resultado/cancelamento simultaneos.
- Nao remover validacao de vinculo `ACCEPTED` de escrita ou leitura veterinaria.
- Nao adicionar Prescription ou Exams diretamente ao `MedicalRecordResponseDTO` sem avaliar N+1 e impacto no mobile.
- A exclusao de Animal com Appointment/MedicalRecord existente pode falhar por FK; nao adicionar cascade destrutivo sem decisao explicita de retencao clinica.
- O H2 e em memoria, enquanto o mobile persiste o usuario no AsyncStorage; reiniciar a API pode deixar uma sessao local apontando para usuario inexistente.

## Validacao e Comandos

Backend:

```bash
cd Java/api
./mvnw test
```

Estado atual conhecido: 13 testes passando apos a implementacao de Exam.

Frontend:

```bash
cd Front/clyvo/clyvo-challenge-clyvo-vet
./node_modules/.bin/tsc --noEmit --pretty false --ignoreDeprecations 5.0
```

O `tsconfig.json` possui `ignoreDeprecations: "6.0"`, invalido para o TypeScript 5.9 instalado. O override por CLI permite verificar os tipos sem alterar configuracao fora do escopo.

Antes de editar, executar `git status --short` separadamente nos dois repositorios. Eles sao repositorios independentes; nao misturar commits do backend e frontend inadvertidamente.

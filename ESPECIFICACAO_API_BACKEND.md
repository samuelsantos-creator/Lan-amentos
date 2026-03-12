# Especificação da API - Sistema de Apontamentos (Frontend ⇄ Backend)

Este documento dita as regras e estruturas de dados (rotas/endpoints) que o **Desenvolvedor do Backend** precisa fornecer para que o sistema de apontamentos se conecte ao banco de dados real.

A lógica a ser construída no Frontend prevê que `onKeyPress` da tecla **ENTER** (ou evento `onBlur` ao sair de um campo), o sistema dispare uma chamada HTTP (via `fetch`) a um endpoint do backend, auto-completando os detalhes pro usuário na mesma hora, eliminando a dependência de um arquivo javascript pesado em memória.

Todas as rotas devem usar `Content-Type: application/json` e retornar sempre um JSON de resposta.

---

## 1. Consulta de Autenticação / Colaborador
**Ação do Operador:** Digita `Matrícula` e `Senha` e dá Enter.
**Comportamento:** Retorna o Nome do colaborador associado caso as credenciais sejam validadas pela regra de negócio real.

- **URL:** `/api/colaboradores/auth`
- **Method:** `POST`
- **Request (Submetido pelo Front):**
```json
{
  "matricula": "101",
  "senha": "123"
}
```
- **Response (Esperado do Backend):**
```json
{
  "sucesso": true,
  "nome": "Samuel Inácio"
}
```
*(Caso a senha seja incorreta, devolver status HTTP 401 ou `{ "sucesso": false, "mensagem": "Senha incorreta" }`)*

---

## 2. Consulta de O.P. (Ordem de Produção)
**Ação do Operador:** Digita a O.P. e dá Enter.
**Comportamento:** Traz o código do Produto associado a OP, para já automatizar o fluxo da tela.

- **URL:** `/api/ordens-producao/{numero_op}` *(substituir {numero_op} na URL)*
- **Method:** `GET`
- **Request:** (Nenhum corpo, apenas a variável na URL)
- **Response Esperado:**
```json
{
  "sucesso": true,
  "codigo_produto": "P001",
  "descricao_produto": "Abraçadeira T10 Blue"
}
```

---

## 3. Consulta de Produto (Separada)
**Ação do Operador:** Digita um produto (sem informar OP) e dá Enter.
**Comportamento:** Resgata o título do produto.

- **URL:** `/api/produtos/{codigo_produto}`
- **Method:** `GET`
- **Response Esperado:**
```json
{
  "sucesso": true,
  "descricao": "Abraçadeira T10 Blue"
}
```

---

## 4. Consulta de Máquina / Recurso
**Ação do Operador:** Digita a injetora/máquina e dá Enter.

- **URL:** `/api/recursos/{codigo_recurso}`
- **Method:** `GET`
- **Response Esperado:**
```json
{
  "sucesso": true,
  "descricao": "Injetora Romi 130T"
}
```

---

## 5. Consulta de Motivo de Parada
**Ação do Operador:** Digita o código gerencial de uma parada e dá Enter.

- **URL:** `/api/motivos/{codigo_motivo}`
- **Method:** `GET`
- **Response Esperado:**
```json
{
  "sucesso": true,
  "descricao": "Manutenção Elétrica (ME)"
}
```

---

## 6. Registrar Produção (Gravação)
**Ação do Operador:** Formulário Validado -> Clicar em "Confirmar Registro" (Tela Produção).

- **URL:** `/api/apontamentos/producao`
- **Method:** `POST`
- **Request (Submetido pelo App):**
```json
{
  "matricula": "101",
  "turno": "1|06:00|14:00",
  "data_inicio": "12/03/2026",
  "data_fim": "12/03/2026",
  "hora_inicio": "06:00",
  "hora_fim": "10:00",
  "op": "998877",
  "codigo_produto": "P001",
  "codigo_recurso": "INJ-01",
  "quantidade_produzida": 1500.5,
  "quantidade_retrabalho": 10.0,
  "quantidade_setup": 5.0,
  "quantidade_rnc": 2.0,
  "quantidade_cestos": 10
}
```
- **Response:**
```json
{
  "sucesso": true,
  "id_inserido": 1045,
  "mensagem": "Produção registrada com sucesso nas tabelas de apontamentos."
}
```

---

## 7. Registrar Parada (Gravação)
**Ação do Operador:** Formulário Validado -> Clicar em "Confirmar Registro" (Tela Parada).

- **URL:** `/api/apontamentos/parada`
- **Method:** `POST`
- **Request (Submetido pelo App):**
```json
{
  "matricula": "101",
  "turno": "1|06:00|14:00",
  "data_inicio": "12/03/2026",
  "data_fim": "12/03/2026",
  "hora_inicio": "10:00",
  "hora_fim": "11:00",
  "op": "998877",
  "codigo_produto": "P001",
  "codigo_recurso": "INJ-01",
  "codigo_motivo": "ME"
}
```
- **Response:**
```json
{
  "sucesso": true,
  "id_inserido": 1046,
  "mensagem": "Parada oficializada no banco."
}
```

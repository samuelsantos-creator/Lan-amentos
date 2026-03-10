# 📋 Manual do Usuário — Sistema de Apontamentos
**Progeral · Produção e Horas Paradas**
Versão: 1.0 · Atualizado em: março/2026

---

## 🧭 Sumário
1. [O que é este sistema](#1-o-que-é-este-sistema)
2. [Como acessar](#2-como-acessar)
3. [Tela inicial](#3-tela-inicial)
4. [Apontamento de Produção](#4-apontamento-de-produção)
5. [Apontamento de Parada](#5-apontamento-de-parada)
6. [Regras e Validações](#6-regras-e-validações)
7. [Turnos disponíveis](#7-turnos-disponíveis)
8. [Códigos de Motivo de Parada](#8-códigos-de-motivo-de-parada)
9. [Indicadores visuais dos campos](#9-indicadores-visuais-dos-campos)
10. [Dicas de uso rápido](#10-dicas-de-uso-rápido)
11. [Perguntas frequentes (FAQ)](#11-perguntas-frequentes-faq)

---

## 1. O que é este sistema

O **Sistema de Apontamentos** é uma ferramenta para registro de:
- **Produção**: quantidade produzida por máquina, produto e período
- **Horas Paradas**: motivo, máquina e período de parada

O sistema utiliza o **Modelo de Subtração**: você registra o tempo total de produção e, separadamente, os períodos de parada ocorridos dentro dessa produção. O tempo líquido produtivo é calculado automaticamente.

> ⚠️ **Todos os dados ficam apenas na sessão do navegador.** Ao fechar ou recarregar a página, os registros são enviados ao sistema e a sessão é limpa.

---

## 2. Como acessar

Abra o endereço do sistema no navegador **Chrome** ou **Edge** (recomendados).

### Instalar como aplicativo (opcional)
**No Android (Chrome):** Toque nos três pontos ⋮ → "Instalar aplicativo"  
**No iPhone (Safari):** Toque em Compartilhar → "Adicionar à Tela de Início"  
**No computador:** Clique no ícone de instalação na barra de endereços

---

## 3. Tela inicial

Ao abrir o sistema, você verá três opções:

| Opção | O que faz |
|---|---|
| 🏭 **Apontar Produção** | Registrar produção de peças |
| ⏸ **Apontar Parada** | Registrar horas paradas da máquina |
| ❓ **Dúvidas** | Ver regras, turnos e exemplos práticos |

---

## 4. Apontamento de Produção

### Campos obrigatórios (fundo amarelo = ainda vazio, verde = correto)

| Campo | Obrigatório | Observação |
|---|---|---|
| Usuário | ✅ Sim | Matrícula do operador |
| Senha | ✅ Sim | Senha do operador |
| Nome do Colaborador | — | Preenchido automaticamente |
| Turno | ✅ Sim | Selecione o turno do dia |
| Data Inicial | ✅ Sim | Padrão: hoje |
| Data Final | ✅ Sim | Padrão: hoje |
| Hora Inicial | ✅ Sim | Formato HH:MM (ex: 06:00) |
| Hora Final | ✅ Sim | Formato HH:MM (ex: 14:00) |
| **O.P.** | ❌ Opcional | Se informada, deve existir no cadastro |
| Produto | ✅ Sim | Código do produto (ex: P001) |
| Descrição | — | Preenchida automaticamente pelo produto |
| Cód. Recurso | ✅ Sim | Código da máquina (ex: INJ-01) |
| Recurso | — | Preenchido automaticamente |
| Qtd. Produzida | ✅ Sim | Deve ser maior que zero |
| Qtd. Retrabalhada | ❌ Opcional | Peças reprocessadas |
| Peças Setup | ❌ Opcional | Peças descartadas no setup |
| Peças NC (RNC) | ❌ Opcional | Peças não conformes |
| Qtde Cestos | ❌ Opcional | Quantidade de cestos usados |

### Fluxo de registro

```
1. Preencha Usuário + Senha → nome aparece automaticamente
2. Selecione o Turno e confirme as datas
3. Informe as horas (Inicial e Final)
4. Informe o Produto e o Recurso (máquina)
5. Informe a quantidade produzida
6. Clique em CONFIRMAR (ou pressione Enter no último campo)
7. Revise o resumo e confirme o lançamento
8. O sistema limpa os campos e já preenche a hora inicial com a hora final anterior
```

### Botões disponíveis
- **Sair** — Limpa tudo e volta à tela inicial (troca de operador)
- **Limpar** — Apaga os campos do formulário atual
- **Testar** — Valida os dados sem registrar (exibe erros se houver)
- **Confirmar** — Valida e registra o apontamento

---

## 5. Apontamento de Parada

### Campos obrigatórios

| Campo | Obrigatório | Observação |
|---|---|---|
| Usuário | ✅ Sim | Mesmo operador da produção |
| Senha | ✅ Sim | |
| Turno | ✅ Sim | Deve ser o mesmo da produção |
| Data Inicial / Final | ✅ Sim | |
| Hora Inicial / Final | ✅ Sim | |
| O.P. | ❌ Opcional | |
| **Produto** | ✅ Sim | Produto em que ocorreu a parada |
| Cód. Motivo | ✅ Sim | Código do motivo (ex: ST, PR) |
| Descrição Motivo | — | Preenchida automaticamente |
| Cód. Recurso | ✅ Sim | Máquina parada |

### Lógica de Pulo (agilidade)
Após confirmar uma parada, o sistema automaticamente:
- Mantém o **produto** e o **recurso** preenchidos
- Preenche a **hora inicial** com a hora final da parada anterior
- Você só precisa informar o novo motivo e a nova hora final

### Botões disponíveis
- **Sair** — Limpa tudo e volta à tela inicial
- **Limpar** — Apaga todos os campos (incluindo produto)
- **Testar** — Valida os dados sem registrar
- **Confirmar** — Valida e registra a parada

---

## 6. Regras e Validações

### Regras de Produção

**R1 — Sem sobreposição**
Dois registros de produção não podem ter horários sobrepostos na mesma máquina.

**R2 — Continuidade obrigatória**
O horário de início de cada novo registro deve ser igual ao horário de fim do registro anterior. Se houver uma lacuna (gap) sem produção nem parada, o sistema alertará.

**R3 — Início no horário do turno**
A primeira produção do turno deve iniciar exatamente no horário de início do turno selecionado.

**R4 — Duração máxima**
Nenhum apontamento pode ter mais de 12 horas de duração.

**R5 — Dentro do turno**
Todos os horários devem estar dentro do intervalo do turno selecionado.

**R6 — Cadência (ritmo)**
Se a quantidade produzida resultar em ritmo acima de 12.000 pç/h, o sistema exibirá um aviso de cadência elevada.

---

### Regras de Parada

**P1 — Parada dentro da produção**
Toda parada deve estar completamente contida dentro de um período de produção ativo da mesma máquina.

**P2 — Duração mínima**
Paradas com duração **igual ou menor que 5 minutos** não devem ser registradas (o sistema bloqueia).

**P3 — Produto obrigatório**
O produto em que ocorreu a parada deve ser informado.

**P4 — Dentro do turno**
O período da parada deve estar dentro do turno selecionado.

---

### Validação do Turno Completo (botão "Validar turno completo")

Após registrar todas as produções do turno, clique em **Validar turno completo**. O sistema verificará:

1. ✅ Se a primeira produção começa no horário do turno
2. ✅ Se não há gaps entre as produções
3. ✅ Se não há sobreposições
4. ✅ Se todas as paradas estão dentro de períodos de produção válidos
5. ✅ Se a última produção cobre até o fim do turno

---

## 7. Turnos disponíveis

| Código | Descrição | Horário | Duração |
|---|---|---|---|
| 1 | 1º Turno | 06:00 – 14:00 | 480 min |
| S1 | Sab. 1º Turno | 06:00 – 16:00 | 600 min |
| 2 | 2º Turno | 14:00 – 22:00 | 480 min |
| S2 | Sab. 2º Turno | 09:00 – 19:00 | 600 min |
| 3 | 3º Turno † | 22:00 – 06:00 | 480 min |
| A | Administrativo | 07:00 – 16:48 | 588 min |
| 121 | Turno 12h (manhã) | 06:00 – 18:00 | 720 min |
| 122 | Turno 12h (noite) † | 18:00 – 06:00 | 720 min |

> † **Turno noturno**: a data de referência é o dia de **início** (ex: terça às 22h), e o término ocorre na madrugada do dia seguinte. O sistema ajusta a data final automaticamente.

---

## 8. Códigos de Motivo de Parada

| Código | Descrição |
|---|---|
| AM | Amostra |
| FR | Ferramental |
| IP | Inspeção |
| LE | Falta de Embalagem |
| LM | Falta de Matéria Prima |
| LP | Falta de Programação |
| ME | Manutenção Elétrica |
| MM | Manutenção Mecânica |
| MP | Manutenção Preventiva |
| MU | Pane em Utilidades |
| PC | Processo Subsequente Cheio |
| PD | Mão de Obra Deslocada |
| PJ | Ajuste de Operação |
| PL | Limpeza / Organização |
| PM | Falta de Mão de Obra (Operador) |
| PR | Refeição / Necessidades Pessoais |
| PT | Protótipo |
| QM | Matéria Prima Não Conforme |
| QP | Produto Não Conforme |
| ST | Set-Up |
| TO | Try-Out |
| TR | Treinamento / Reunião |

---

## 9. Indicadores visuais dos campos

| Cor do campo | Significado |
|---|---|
| 🟡 **Fundo amarelo** | Campo obrigatório ainda vazio |
| 🟢 **Fundo verde + ✓** | Valor válido e reconhecido |
| 🔴 **Fundo vermelho + ✗** | Valor inválido ou não encontrado |
| ⚪ **Fundo branco** | Campo opcional (sem validação visual) |

---

## 10. Dicas de uso rápido

- ⌨️ **Tecla Enter** avança automaticamente para o próximo campo. No **último campo**, pressionar Enter dispara o Confirmar diretamente.
- 🔤 Os campos de **produto**, **recurso** e **motivo** preenchem a descrição automaticamente ao digitar o código.
- 🗓️ As **datas** já vêm preenchidas com a data de hoje.
- ⏭️ Após confirmar uma parada, a **hora inicial** do próximo registro já vem preenchida com a hora final anterior.
- 📊 A **barra de timeline** mostra visualmente o preenchimento do turno em tempo real.
- ⚠️ Se aparecer o alerta **"HÁ UM GAP"** na timeline, significa que há um intervalo não coberto no turno.

---

## 11. Perguntas frequentes (FAQ)

**P: O que acontece se eu fechar o navegador?**
R: Os dados da sessão atual são perdidos. Sempre confirme todos os apontamentos antes de fechar.

**P: Posso deixar o campo O.P. em branco?**
R: Sim, a O.P. é opcional na tela de produção. Se preenchida, deve ser um código válido no cadastro.

**P: Por que meu apontamento foi bloqueado com "Fora do Turno"?**
R: Os horários informados devem estar dentro do intervalo do turno selecionado. Verifique se selecionou o turno correto.

**P: Posso registrar uma parada que começa antes da produção?**
R: Não. Toda parada deve estar completamente dentro de um período de produção da mesma máquina.

**P: O que é o "Modelo de Subtração"?**
R: É a metodologia usada: você registra o tempo total de presença na produção e desconta os períodos de parada para calcular o tempo líquido produtivo.

**P: A senha fica salva no sistema?**
R: Não. A autenticação é feita em memória apenas durante a sessão. Ao sair ou recarregar, é necessário informar as credenciais novamente.

---

*Este documento deve ser atualizado sempre que houver alterações nas regras ou no funcionamento do sistema.*
*Dúvidas: entre em contato com a equipe de TI ou com o responsável pelo sistema.*

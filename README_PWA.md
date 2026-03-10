# Apontamentos · Produção & Horas Paradas (PWA)

Sistema de registro de apontamentos industriais utilizando o **Modelo de Subtração**.  
Desenvolvido para uso interno na **Progeral**.

---

## 📁 Estrutura do Projeto

```
Lançamentos/
├── index.html          → Aplicação principal (HTML + CSS + JS tudo-em-um)
├── db-data.js          → Base de dados gerada (colaboradores, produtos, recursos, OPs)
├── generate_db.js      → Script Node.js para gerar db-data.js a partir do Excel
├── extract_data.js     → Script auxiliar de extração de dados do Excel
├── read_excel.py       → Script Python alternativo para leitura do Excel
├── dados_app.xlsx      → Planilha fonte dos dados cadastrais
├── manifest.json       → Configuração PWA (ícone, nome, cores)
├── sw.js               → Service Worker para funcionalidade offline
├── icons/              → Ícones do app (logo, favicon)
├── README_PWA.md       → Este arquivo (documentação técnica)
└── MANUAL_USUARIO.md   → Manual completo para usuários finais
```

---

## ✨ Funcionalidades

- **PWA (Progressive Web App)**: instalável em celular e desktop como app nativo
- **Offline First**: funciona sem internet via Service Worker
- **Autenticação por matrícula + senha**: validação contra base de dados local
- **Auto-preenchimento inteligente**: produto, recurso, colaborador e descrições
- **Validação em tempo real**: cores indicativas em cada campo (amarelo/verde/vermelho)
- **Pulo automático de foco**: ao validar um campo, o cursor avança sozinho
- **Enter para confirmar**: no último campo, Enter dispara o Confirmar
- **Timeline visual**: barra de progresso do turno em tempo real
- **Alerta de GAP**: aviso visual de lacunas no preenchimento do turno
- **Lógica de continuidade**: hora final torna-se hora inicial do próximo registro
- **Lógica de pulo (paradas)**: produto e recurso são mantidos entre paradas consecutivas
- **Validação de turno completo**: verifica gaps, sobreposições e cobertura total do turno

---

## 🗂️ Organização do JavaScript (`index.html`)

O script principal é organizado nas seguintes seções identificadas por comentários `// ══`:

| Seção | Descrição |
|---|---|
| `STATE` | Arrays de sessão: `produções[]` e `paradas[]` |
| `DB — DADOS ESTÁTICOS` | Motivos de parada fixos (não dependem do Excel) |
| `DB — MERGE COM EXCEL` | Mescla dados do `db-data.js` com os estáticos |
| `AUTO-FILL` | Funções de preenchimento automático por código |
| `VALIDAÇÃO VISUAL` | `updateFieldClass()` e `validateLive()` |
| `NAVIGATION` | `goTo(screenId)` — troca entre telas |
| `MODAL` | `showModal(type, title, html, callback)` |
| `OPERADOR` | Login, logout e limpeza de sessão |
| `TIMELINE` | Renderização da barra de progresso do turno |
| `HELPERS` | `maskTime()`, `isValidTimeStr()`, `parseDateTime()`, `fmt()`, `today()` |
| `SYNC` | `syncLists()` — atualiza tabelas e timeline |
| `TESTAR PRODUÇÃO` | Validação pré-confirmação sem gravar |
| `CONFIRMAR PRODUÇÃO` | Validação completa + gravação em `state.produções` |
| `TESTAR PARADA` | Validação pré-confirmação de parada |
| `CONFIRMAR PARADA` | Validação completa + gravação em `state.paradas` |
| `RENDERIZAR LISTAS` | `renderProdLista()` / `renderParadaLista()` |
| `LIMPAR FORMS` | `limparFormProd()` / `limparFormParada()` / `limparFormParadaCompleto()` |
| `VALIDAR TURNO` | `validarTudo()` — checagem completa de gaps e cobertura |
| `ENTER/CONFIRM` | Navegação por teclado e atalho Enter → Confirmar |
| `SERVICE WORKER` | Registro do SW para modo offline |

---

## 🏷️ Prefixos de IDs HTML

Os IDs dos elementos seguem um padrão de prefixo para facilitar a localização:

| Prefixo | Tela |
|---|---|
| `p-` | Tela de **P**rodução (ex: `p-matricula`, `p-produto`) |
| `s-` | Tela de **S**top/Parada (ex: `s-matricula`, `s-motivo-cod`) |

---

## 🔄 Como atualizar a base de dados

1. Edite a planilha `dados_app.xlsx` com os novos colaboradores, produtos, recursos ou OPs
2. Execute no terminal:
   ```bash
   node generate_db.js
   ```
3. O arquivo `db-data.js` será recriado automaticamente
4. Recarregue o sistema no navegador

---

## 🚀 Como Abrir Localmente

Basta abrir o arquivo `index.html` no Chrome ou Edge.  
> ⚠️ Para funcionar com o `db-data.js`, abra via servidor local ou via link publicado (Vercel, etc.)

---

## 📲 Instalação como PWA

| Plataforma | Instruções |
|---|---|
| Android (Chrome) | Toque em ⋮ → "Instalar aplicativo" |
| iPhone (Safari) | Compartilhar → "Adicionar à Tela de Início" |
| Computador | Clique no ícone de instalação na barra de endereços |

---

## 🛠 Tecnologias

- HTML5 / CSS3 (Vanilla, sem frameworks)
- JavaScript ES6 (Vanilla, sem bibliotecas externas)
- Font Awesome 6 (ícones)
- Google Fonts — IBM Plex Sans / IBM Plex Mono
- Service Workers (modo offline)
- PWA Manifest

---

## 📝 Histórico de Alterações

| Data | Descrição |
|---|---|
| Mar/2026 | Separação dos botões Testar e Confirmar (ambos visíveis simultaneamente) |
| Mar/2026 | Botão "Sair" — limpa sessão e retorna à tela inicial |
| Mar/2026 | Remoção do botão de deslogar no campo de colaborador |
| Mar/2026 | Lógica de pulo nas paradas: mantém produto entre registros consecutivos |
| Mar/2026 | Produto obrigatório na tela de parada |
| Mar/2026 | Enter no último campo dispara Confirmar automaticamente |
| Mar/2026 | Campo O.P. na produção: totalmente opcional, sem indicador visual de cor |
| Mar/2026 | Adição de senha no login de operador |
| Mar/2026 | Exportação Excel removida (aguardando solução sem interação do usuário) |
| Mar/2026 | Configuração PWA e deploy no Vercel |
| Fev/2026 | Versão inicial do sistema |

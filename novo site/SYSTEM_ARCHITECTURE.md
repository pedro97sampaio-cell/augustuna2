# Augustuna Web Platform — System Architecture & Admin Hub

> [!IMPORTANT]  
> **CONTEXT FOR THE AI:** Este documento mapeia a estrutura física dos ficheiros do Website da Augustuna (frontend) e detalha o funcionamento e a arquitetura do painel de administração (Admin Hub), criados para gestão local dos ficheiros JSON. 

---

## 1. Estrutura do Site (Frontend)
O site baseia-se num sistema *Vanilla SPA* gerido localmente, sem dependências de compilação como Webpack ou Node.js (necessita apenas de um Live Server genérico).

```text
/ (Root Directory)
├── index.html        # Estrutura principal DOM (sitemap e secções invisíveis/visíveis)
├── styles.css        # Variáveis de Design System, Root Colors, Breakpoints e Lógicas Visuais
├── script.js         # Motor JavaScript: manipula o DOM, gere Carrinho, Fetch Local e Filtros
├── DESIGN.md         # Documento do Manual de Identidade Visual (The Digital Atelier)
│
├── /data/            # "Base de Dados Local" com os ficheiros JSON
│   ├── atuacoes.json
│   ├── membros.json
│   ├── noticias.json
│   ├── loja.json
│   └── eventos.json
│
└── /assets/          # Imagens, SVG e recursos visuais
    ├── /merch/       # Fotos para a Loja
    ├── /news/        # Fotos das Notícias
    └── /members/     # Fotos da secção Parede
```

### 1.1 Regras de Manipulação do Sistema
- Ao editar o site, a IA **não** deve utilizar npm, bundlers, ou injetar pacotes React. Todo o código corre diretamente no Browser do cliente.
- A navegação não recarrega páginas (todas as âncoras na navbar comunicam através da função _showSection_ presente no `script.js`).

---

## 2. Estrutura do Admin Hub (CMS Local)
O "Admin Hub" foi construído para servir como um *Content Management System* minimalista que corre localmente. A interface lê, introduz, edita e apaga objetos dentro da diretoria `/data/*.json` do website.

```text
/admin_hub/
├── admin_hub.py           # Código fonte do CMS (Python + SDK Tkinter ou similar)
├── icon.ico               # Ícone do executável gerado
├── requirements.txt       # Ex: PyQt5, Tkinter, ou CustomTkinter dependendo do build
│
├── /build/ & /dist/       # Assets gerados pelo 'PyInstaller' durante a compilação
│   └── Augustuna Admin Hub.exe # Executável autônomo (Portable) usado pelo Utilizador final
│
└── run_admin.bat / criar_atalho.bat # Scripts de manutenção para facilitar gestão no Windows
```

### 2.1 Funcionamento do Admin Hub
1. **Ambiente Executivo:** O `admin_hub.py` foi empacotado através do `PyInstaller`, gerando um executável que pode ser colocado no Ambiente de Trabalho (`Desktop`).
2. **Lógica de Leitura:** O painel usa a biblioteca nativa `json` do Python. Ao abrir, navega caminhos relativos ao executável (`../data/`) e mapeia-os na interface gráfica. Múltiplas abas correspondem aos arrays JSON:
   * Aba "Membros" converte inputs para adicionar/remover de `membros.json`
   * Aba "Atuações" gere (Magna Augusta, Festa do Semina, Festivais Concurso, Convite, Outras) empurrando dados para `atuacoes.json` e `eventos.json`.
3. **Persistência de Dados (Save State):** Quando o utilizador clica em "Guardar", o Python faz parse (com o método `json.dump()`) e re-guarda o objeto completo serializado, preservando o schema necessário para que o `script.js` consiga processar perfeitamente o website ao lado do cliente.

### 2.2 Notas para a IA na Manutenção do Admin Hub
- **Não destruir as Chaves (Keys):** Ao atualizar o `admin_hub.py`, nunca deixes de incluir campos obrigatórios ("temOpcoes", "categoria"). O JavaScript vai *crashar* ou gerar HTML `<undefined>` se faltarem chaves geradas pelo painel Python.
- **Formulários Mapeados:** Se adicionares um novo campo visual no website (ex: Redes Sociais nos Augustunos), **tens obrigatoriamente** de alterar o `admin_hub.py` para injetar essa "key" no JSON e permitir a sua submissão.

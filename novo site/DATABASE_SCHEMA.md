# Augustuna Web Platform — Database & Content Structure

> [!IMPORTANT]  
> **CONTEXT FOR THE AI:** Este documento contém o mapa da base de dados e os formatos corretos dos arrays que o `script.js` necessita para renderizar o conteúdo do site. Se precisares de migrar ou recriar o projeto, segue estritamente a arquitetura de **estruturas JSON** descrita em baixo, guardada na pasta `/data`.

O website da Augustuna não depende de um backend SQL tradicional. Em vez disso, extrai a "base de dados" local via chamadas `fetch()` a **ficheiros JSON estáticos**. 

---

## 1. Eventos e Festivais (`data/atuacoes.json`)
O sistema de atuações divide as atuações em 3 arrays principais para compatibilidade de dropdowns na secção `#atuacoes`. O objeto não deve ser alterado (mesmo se os arrays estiverem vazios).

**Estrutura Principal:**
```json
{
  "festivais_concurso": [
    {
      "id": "a000",
      "data": "24 Out 2025",
      "titulo": "V Incognifest",
      "descricao": "Prémios: Melhor instrumental, Melhor pandeireta",
      "localizacao": "Vila Nova de Famalicão"
    }
  ],
  "festivais_convite": [
     // ... Mesmo objeto que concurso
  ],
  "outras": [
     // ... Mesmo objeto que concurso (para atuações de rua, casamentos, etc.)
  ]
}
```

## 2. Parede das Gerações / Membros (`data/membros.json`)
Para renderizar todos os "Augustunos" distribuídos pelas diferentes gerações históricas. Esta é a secção `#membros`.

**Estrutura Principal:**
```json
{
  "geracoes": [
    {
      "nome": "1ª Geração (Fundadores)",
      "elementos": [
        {
          "nome": "João 'O Poeta' Silva",
          "alcunha": "O Poeta",
          "instrumento": "Guitarra",
          "curso": "Direito",
          "data_passagem": "1996",
          "evento": "I Convívio",
          "foto": "link_ou_path_da_foto.jpg"
        }
      ]
    },
    {
      "nome": "2ª Geração",
      "elementos": [
         // ...
      ]
    }
  ]
}
```
*Atenção:* O `script.js` usa a chave `geracoes` para preencher as opções do `<select>` e usa `.reduce()` para criar um super-array unificado se o utilizador selecionar a categoria "Todos".

## 3. Notícias (`data/noticias.json`)
O array dinâmico da página inicial (`#newsContent`).

**Estrutura Principal:**
```json
[
  {
    "id": 1,
    "titulo": "Celebração Magna Augusta",
    "corpo": "A edição de comemoração de 30 anos...",
    "data": "12 Mar 2026",
    "imagem": "images/news/30anos.jpg",
    "categoria": "destaque" 
  },
  {
    "id": 2, // ...
    "categoria": "cultura"
  },
  {
    "id": 3, // ...
    "categoria": "recrutamento"
  }
]
```
*Atenção:* O valor `"categoria"` é interpretado pelo javascript para gerar estilos de ícones ou degradês diferentes caso `"imagem"` não exista, devendo os valores ser unicamente baseados nos *switch cases* do javascript (`destaque`, `recrutamento`, `cultura`).

## 4. Merchandising / Loja (`data/loja.json`)
Os produtos que vão alimentar o carrinho de checkout gerido pelo `EmailJS`.

**Estrutura Principal:**
```json
[
  {
    "id": "merch_pino",
    "nome": "Pin Augustuna Tradicional",
    "preco": 3.5,
    "imagem": "merch_1.jpg",
    "categoria": "Acessórios",
    "temOpcoes": false,
    "emStock": true
  },
  {
    "id": "merch_sweat",
    "nome": "Sweatshirt Bordada",
    "preco": 25.0,
    "imagem": "merch_2.jpg",
    "categoria": "Vestuário",
    "temOpcoes": true,
    "opcoes": ["S", "M", "L", "XL"],
    "emStock": true
  }
]
```
*Atenção:* `"temOpcoes"` e `"opcoes"` ativam automaticamente um menu Dropdown `<select>` abaixo do item do carrinho para escolher o tamanho da roupa.

## 5. Próprios Eventos (`data/eventos.json`)
Estes são os eventos **hospedados pela Tuna** (ao contrário das atuações, onde a tuna vai). Engloba o **Magna Augusta** e a **Festa do Semina**.

**Estrutura Principal:**
```json
{
  "magna_augusta": [
    {
      "edicao": "IX",
      "ano": "2026",
      "data": "10 a 12 de Abril",
      "local": "Theatro Circo",
      "tunas_convidadas": ["Azeituna", "Gatuna", "Afonsina"],
      "vencedora": "Azeituna"
    }
  ],
  "festa_semina": [
    {
       // (Mapeamento análogo dedicado ao evento interno)
    }
  ]
}
```

---
*Para reconstruir o projeto, cada objeto `.json` acima mapeado deve estar guardado dentro da pasta raiz `./data/` para satisfazer as chamadas `Promise.all` na função `fetchWebsiteData()`.*

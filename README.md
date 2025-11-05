# Frontend - Segmentação de Imagens de Satélite

Interface web React + TypeScript + Tailwind CSS para o modelo de segmentação.

## Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── ImageUpload.tsx    # Componente de upload com drag-and-drop
│   │   └── ResultModal.tsx    # Modal para exibir resultado
│   ├── App.tsx                # Componente principal
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais com Tailwind
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Setup e Execução

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

**Importante:** A API backend deve estar rodando em `http://localhost:3338` (configurado como proxy no Vite).

### 3. Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Funcionalidades

- **Upload de imagem**: Arraste e solte ou clique para selecionar
- **Preview**: Visualização da imagem antes do processamento
- **Loading state**: Indicador visual durante o processamento
- **Modal de resultado**: Exibe a máscara predita em tela cheia
- **Download**: Botão para baixar a imagem segmentada
- **Legenda de classes**: Exibe as 6 classes com suas cores
- **Tratamento de erros**: Mensagens claras em caso de falha

## Integração com a API

O frontend faz requisições para `/api/predict` que são automaticamente redirecionadas para `http://localhost:3338/predict` via proxy do Vite.

Para usar em produção, ajuste o `vite.config.ts` ou configure um servidor nginx/apache para proxy reverso.

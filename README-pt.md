# 👨‍💻 Leonardo Silvatti | Personal Portfolio

Repositório oficial do meu portfólio pessoal. Construído para ser não apenas uma vitrine dos meus projetos e currículo, mas também uma demonstração prática de arquitetura front-end escalável, limpa e performática. 

O projeto adota uma abordagem rigorosa de **Atomic Design**, tipagem estrita, testes automatizados e integração contínua com serviços externos. Não se destina a contribuições abertas, servindo exclusivamente como meu espaço digital hospedado em [leonardo.silvatti.com.br](https://leonardo.silvatti.com.br).

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Stack Tecnológico](#-stack-tecnológico)
- [Destaques da Arquitetura](#-destaques-da-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Manutenção e Conteúdo](#-manutenção-e-conteúdo)
- [Qualidade e Testes](#-qualidade-e-testes)
- [Licença](#-licença)

## 🔭 Visão Geral

- **Propósito:** Apresentar trajetória profissional, currículo e detalhamento técnico de projetos pessoais e profissionais.
- **Design System:** Estética escura e moderna (com toques sutis de Vaporwave), focada em alto contraste e acessibilidade.
- **Performance:** Otimização agressiva de assets, lazy-loading para bibliotecas pesadas (como o parser de Markdown) e SSR/SSG nativos do Next.js.

## 🛠 Stack Tecnológico

| Categoria | Tecnologia |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Linguagem** | TypeScript |
| **Estilização** | TailwindCSS + CVA + tailwind-merge |
| **Internacionalização** | `next-intl` (pt-BR / en-US) |
| **Ícones** | Lucide React |
| **Testes Unitários** | Jest + React Testing Library |
| **Testes E2E** | Cypress |
| **Documentação UI** | Storybook |
| **Integrações** | GitHub GraphQL API |

## ✨ Destaques da Arquitetura

1. **Design Atômico Estrito:** A interface é estritamente dividida em `atoms`, `molecules`, `organisms` e `templates`. Isso garante um alto nível de reutilização e facilita testes isolados.
2. **Integração Dinâmica (GitHub):** A página de projetos consome a API do GitHub para buscar repositórios, métricas (stars, forks) e o conteúdo dos `README.md` em tempo real.
3. **Markdown Visualizer:** Motor próprio de renderização de Markdown usando `react-markdown` e `remark-gfm`, com Syntax Highlighting avançado (tema Dracula) para blocos de código importados do GitHub.
4. **Resiliência a Erros:** Tratamento robusto de hidratação e fallback de rotas.

## 📁 Estrutura do Projeto

```text
portfolio/
├── app/                  # Next.js App Router (Rotas e configuração de Locale)
├── components/           # UI Componentizada (Atomic Design)
│   ├── atoms/            # Elementos base (Buttons, Typography, Chips)
│   ├── molecules/        # Composições simples (NavMenu, ProjectActions)
│   ├── organisms/        # Seções complexas (HeroSection, ProjectHero)
│   └── templates/        # Layouts de página (CenteredLayout)
├── constants/            # Variáveis globais e temas
├── contexts/             # React Contexts (ThemeContext)
├── cypress/              # Casos de teste End-to-End
├── i18n/                 # Configuração de roteamento e setup do next-intl
├── lib/                  # Utilitários e integrações (API do GitHub, helpers)
├── messages/             # Dicionários JSON de tradução (br, en)
├── public/               # Assets estáticos (PDFs do CV, favicon, imagens)
└── __tests__/            # Suíte de testes unitários
```

## 📝 Manutenção e Conteúdo

O fluxo de atualização de dados foi desenhado para exigir o mínimo de atrito possível:

- **Projetos Dinâmicos:** Novos repositórios aparecem automaticamente ao ajustar as tags/topics no GitHub. O conteúdo exibido na página de detalhes é o próprio `README.md` do repositório correspondente, processado de forma segura e responsiva.
- **Traduções (i18n):** Todo o texto estático do site reside no diretório `messages/`. Para adicionar ou alterar textos, edite os arquivos `common.json`, `components.json`, `layout.json` ou `pages.json` dentro do respectivo locale (`br` ou `en`).
- **Currículo:** Os arquivos físicos estão localizados em `public/Resume_Leonardo_Silvatti_Silva.pdf` e `Curriculo_Leonardo_Silvatti_Silva.pdf`.

## 🧪 Qualidade e Testes

A qualidade do código é garantida por três pilares de verificação:

1. **Testes Unitários (`__tests__/`):** Focados no comportamento individual de Átomos e Moléculas, executados via Jest. Mocks estruturados garantem o isolamento de dependências como o `next-intl` e `next/image`.
2. **Testes End-to-End (`cypress/`):** Garantem que os fluxos críticos de navegação (como a troca de idiomas, acesso ao currículo e formulários de contato) funcionam perfeitamente no ambiente real.
3. **Storybook (`.storybook/`):** Usado para desenvolvimento orientado a componentes (CDD). Permite visualizar todos os estados das variantes do TailwindCSS e validar a responsividade isoladamente.

## ⚖️ Licença

Todo o conteúdo pessoal, textos, currículo e design lógico deste repositório são propriedade de Leonardo Silvatti. O código-fonte é aberto para estudo, mas o uso, reprodução ou implantação da totalidade deste portfólio para uso pessoal de terceiros não é autorizado.

Para contato, utilize os links disponíveis na seção de Connect do site.
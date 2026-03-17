# 👨‍💻 Leonardo Silvatti | Personal Portfolio

Official repository for my personal portfolio. Built not just to showcase my projects and resume, but to serve as a practical demonstration of a scalable, clean, and highly performant front-end architecture.

The project adopts a strict **Atomic Design** approach, strong typing, automated testing, and continuous integration with external services. It is not intended for open-source contributions, serving exclusively as my digital space hosted at [leonardo.silvatti.com.br](https://leonardo.silvatti.com.br).

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture Highlights](#-architecture-highlights)
- [Project Structure](#-project-structure)
- [Maintenance & Content](#-maintenance--content)
- [Quality & Testing](#-quality--testing)
- [License](#-license)

## 🔭 Overview

- **Purpose:** Present my professional journey, resume, and technical details of both personal and professional projects.
- **Design System:** Modern, dark aesthetic (with subtle Vaporwave touches), focused on high contrast and accessibility.
- **Performance:** Aggressive asset optimization, lazy-loading for heavy libraries (like the Markdown parser), and native Next.js SSR/SSG.

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS + CVA + tailwind-merge |
| **Internationalization** | `next-intl` (pt-BR / en-US) |
| **Icons** | Lucide React |
| **Unit Testing** | Jest + React Testing Library |
| **E2E Testing** | Cypress |
| **UI Documentation** | Storybook |
| **Integrations** | GitHub GraphQL API |

## ✨ Architecture Highlights

1. **Strict Atomic Design:** The interface is strictly divided into `atoms`, `molecules`, `organisms`, and `templates`. This ensures a high level of reusability and facilitates isolated testing.
2. **Dynamic Integration (GitHub):** The projects page consumes the GitHub API to fetch repositories, metrics (stars, forks), and `README.md` content in real-time.
3. **Markdown Visualizer:** Custom Markdown rendering engine using `react-markdown` and `remark-gfm`, featuring advanced Syntax Highlighting (Dracula theme) for code blocks imported from GitHub.
4. **Error Resilience:** Robust hydration handling and route fallbacks.

## 📁 Project Structure

```text
portfolio/
├── app/                  # Next.js App Router (Routes and Locale configuration)
├── components/           # Componentized UI (Atomic Design)
│   ├── atoms/            # Base elements (Buttons, Typography, Chips)
│   ├── molecules/        # Simple compositions (NavMenu, ProjectActions)
│   ├── organisms/        # Complex sections (HeroSection, ProjectHero)
│   └── templates/        # Page layouts (CenteredLayout)
├── constants/            # Global variables and themes
├── contexts/             # React Contexts (ThemeContext)
├── cypress/              # End-to-End test cases
├── i18n/                 # Routing setup and next-intl config
├── lib/                  # Utilities and integrations (GitHub API, helpers)
├── messages/             # JSON translation dictionaries (br, en)
├── public/               # Static assets (CV PDFs, favicon, images)
└── __tests__/            # Unit test suite
```

## 📝 Maintenance & Content

The data update flow was designed to require minimal friction:

- **Dynamic Projects:** New repositories appear automatically by adjusting tags/topics on GitHub. The content displayed on the details page is the repository's own `README.md`, processed securely and responsively.
- **Translations (i18n):** All static text on the site resides in the `messages/` directory. To add or change text, edit the `common.json`, `components.json`, `layout.json`, or `pages.json` files within the respective locale (`br` or `en`).
- **Resume:** The physical PDF files are located at `public/Resume_Leonardo_Silvatti_Silva.pdf` and `public/Curriculo_Leonardo_Silvatti_Silva.pdf`.

## 🧪 Quality & Testing

Code quality is guaranteed by three pillars of verification:

1. **Unit Tests (`__tests__/`):** Focused on the individual behavior of Atoms and Molecules, executed via Jest. Structured mocks ensure the isolation of dependencies like `next-intl` and `next/image`.
2. **End-to-End Tests (`cypress/`):** Ensure that critical navigation flows (like switching languages, accessing the resume, and contact forms) work perfectly in a real environment.
3. **Storybook (`.storybook/`):** Used for Component-Driven Development (CDD). It allows visualizing all TailwindCSS variant states and validating responsiveness in isolation.

## ⚖️ License

All personal content, texts, resume, and logical design of this repository are the property of Leonardo Silvatti. The source code is open for study, but the use, reproduction, or deployment of this portfolio in its entirety for personal use by third parties is not authorized.

For contact, please use the links available in the Connect section of the site.
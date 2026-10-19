import type { Locale } from '@/i18n/config';

export interface LocalizedContent {
  en: string;
  br: string;
}

export interface FreelanceProject {
  id: string;
  title: LocalizedContent;
  summary: LocalizedContent;
  overviewMarkdown: LocalizedContent;
  highlights: LocalizedContent[];
  technologies: string[];
  listImage: {
    src: string;
    alt: LocalizedContent;
  };
  overviewImages: Array<{
    src: string;
    alt: LocalizedContent;
  }>;
  projectUrl?: string;
  repositoryUrl?: string;
}

export interface LocalizedFreelanceProject {
  id: string;
  title: string;
  summary: string;
  overviewMarkdown: string;
  highlights: string[];
  technologies: string[];
  listImage: {
    src: string;
    alt: string;
  };
  overviewImages: Array<{
    src: string;
    alt: string;
  }>;
  projectUrl?: string;
  repositoryUrl?: string;
}

export const freelanceProjects: FreelanceProject[] = [
  {
    id: 'autoria-marginal',
    title: {
      br: 'Autoria Marginal',
      en: 'Autoria Marginal',
    },
    summary: {
      br: 'Aplicação web para distribuição de um guia ilustrado sobre direitos autorais, com integração de analytics e gerenciamento de downloads.',
      en: 'Web application for distributing an illustrated copyright guide, featuring analytics integration and download management.',
    },
    overviewMarkdown: {
      br: `## Sobre o projeto
Plataforma desenvolvida para distribuir uma cartilha ilustrada sobre direitos autorais, focada em performance, escaneabilidade e conversão de leads.

## O que implementei
- Interface responsiva com foco na apresentação do conteúdo e facilidade de leitura
- Sistema de gerenciamento e tracking de downloads do material
- Integração com Supabase para armazenamento e captação de dados
- Configuração de analytics para monitoramento de métricas e acessos
`,
      en: `## About the project
Platform developed to distribute an illustrated copyright guide, focused on performance, scannability, and lead conversion.

## What I implemented
- Responsive interface focused on content presentation and readability
- Material download management and tracking system
- Supabase integration for data storage and lead capture
- Analytics configuration for monitoring metrics and access
`,
    },
    highlights: [
      {
        br: 'Distribuição automatizada do guia ilustrado de direitos autorais.',
        en: 'Automated distribution of the illustrated copyright guide.',
      },
      {
        br: 'Gerenciamento de banco de dados e captação via Supabase.',
        en: 'Database management and lead capture via Supabase.',
      },
      {
        br: 'Monitoramento detalhado de tráfego e downloads via analytics.',
        en: 'Detailed traffic and download monitoring via analytics.',
      },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Analytics'],
    listImage: {
      src: '/freelance/autoria-marginal/preview.jpg',
      alt: {
        br: 'Preview do projeto Autoria Marginal.',
        en: 'Autoria Marginal project preview.',
      },
    },
    overviewImages: [
      {
        src: '/freelance/autoria-marginal/1.png',
        alt: {
          br: 'Visão geral da home do projeto Autoria Marginal.',
          en: 'Autoria Marginal homepage overview.',
        },
      },
      {
        src: '/freelance/autoria-marginal/2.png',
        alt: {
          br: 'Visão geral da home do projeto Autoria Marginal.',
          en: 'Autoria Marginal homepage overview.',
        },
      },
      {
        src: '/freelance/autoria-marginal/3.png',
        alt: {
          br: 'Visão geral da home do projeto Autoria Marginal.',
          en: 'Autoria Marginal homepage overview.',
        },
      },
    ],
    projectUrl: 'https://autoriamarginal.com.br',
  },
  {
    id: 'a-jornada-da-psique',
    title: {
      br: 'A Jornada da Psique',
      en: 'The Journey of the Psyche',
    },
    summary: {
      br: 'Blog e plataforma de conteúdo com foco em psicologia Junguiana, otimizado com dados estruturados para máxima performance de SEO.',
      en: 'Blog and content platform focusing on Jungian psychology, optimized with structured data for maximum SEO performance.',
    },
    overviewMarkdown: {
      br: `## Sobre o projeto
Blog focado em psicologia Junguiana, construído com arquitetura moderna e foco em alta performance, indexação e experiência do usuário.

## O que implementei
- Arquitetura robusta utilizando o App Router do Next.js
- Otimização avançada de SEO com implementação de dados estruturados JSON-LD (schema.org)
- Gerenciamento de estado eficiente utilizando Zustand
- Estilização de interface sofisticada com uso de gradientes customizados no Tailwind CSS
`,
      en: `## About the project
Blog focused on Jungian psychology, built with a modern architecture emphasizing high performance, indexing, and user experience.

## What I implemented
- Robust architecture utilizing Next.js App Router
- Advanced SEO optimization implementing JSON-LD structured data (schema.org)
- Efficient state management using Zustand
- Sophisticated UI styling using custom gradients in Tailwind CSS
`,
    },
    highlights: [
      {
        br: 'SEO técnico otimizado com schema.org e JSON-LD.',
        en: 'Technical SEO optimized with schema.org and JSON-LD.',
      },
      {
        br: 'Arquitetura de alta performance com Next.js App Router.',
        en: 'High-performance architecture with Next.js App Router.',
      },
      {
        br: 'Interface moderna com gradientes usando Tailwind CSS.',
        en: 'Modern interface with gradients using Tailwind CSS.',
      },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React'],
    listImage: {
      src: '/freelance/a-jornada-da-psique/preview.jpg',
      alt: {
        br: 'Preview do blog A Jornada da Psique.',
        en: 'The Journey of the Psyche blog preview.',
      },
    },
    overviewImages: [
      {
        src: '/freelance/a-jornada-da-psique/1.png',
        alt: {
          br: 'Visão geral da página de artigos do A Jornada da Psique.',
          en: 'Overview of The Journey of the Psyche articles page.',
        },
      },
       {
        src: '/freelance/a-jornada-da-psique/2.png',
        alt: {
          br: 'Visão geral da página de artigos do A Jornada da Psique.',
          en: 'Overview of The Journey of the Psyche articles page.',
        },
      },
       {
        src: '/freelance/a-jornada-da-psique/3.png',
        alt: {
          br: 'Visão geral da página de artigos do A Jornada da Psique.',
          en: 'Overview of The Journey of the Psyche articles page.',
        },
      },
       {
        src: '/freelance/a-jornada-da-psique/4.png',
        alt: {
          br: 'Visão geral da página de artigos do A Jornada da Psique.',
          en: 'Overview of The Journey of the Psyche articles page.',
        },
      },
       {
        src: '/freelance/a-jornada-da-psique/5.png',
        alt: {
          br: 'Visão geral da página de artigos do A Jornada da Psique.',
          en: 'Overview of The Journey of the Psyche articles page.',
        },
      },
    ],
    projectUrl: 'https://ajornadadapsique.com.br',
  },
];

function getLocalizedText(content: LocalizedContent, locale: Locale) {
  return locale === 'br' ? content.br : content.en;
}

export function getFreelanceProjects(locale: Locale): LocalizedFreelanceProject[] {
  return freelanceProjects.map((project) => ({
    id: project.id,
    title: getLocalizedText(project.title, locale),
    summary: getLocalizedText(project.summary, locale),
    overviewMarkdown: getLocalizedText(project.overviewMarkdown, locale),
    highlights: project.highlights.map((highlight) => getLocalizedText(highlight, locale)),
    technologies: project.technologies,
    listImage: {
      src: project.listImage.src,
      alt: getLocalizedText(project.listImage.alt, locale),
    },
    overviewImages: project.overviewImages.map((image) => ({
      src: image.src,
      alt: getLocalizedText(image.alt, locale),
    })),
    projectUrl: project.projectUrl,
    repositoryUrl: project.repositoryUrl,
  }));
}

export function getFreelanceProjectById(locale: Locale, id: string): LocalizedFreelanceProject | null {
  const localizedProjects = getFreelanceProjects(locale);
  return localizedProjects.find((project) => project.id === id) ?? null;
}

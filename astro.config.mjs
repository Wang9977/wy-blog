// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://wang9977.github.io',
  base: '/wy-blog',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    starlight({
      title: 'Blog',
      description: '个人技术博客，分享前端、CSS、Git等技术知识',
      logo: {
        src: './src/assets/logo.webp',
        alt: ' Blog Logo'
      },
      social: {
        github: 'https://github.com/Wang9977/wy-blog',
      },
      editLink: {
        baseUrl: 'https://github.com/Wang9977/wy-blog/edit/main/'
      },
      lastUpdated: true,
      pagination: true,
      sidebar: [
        {
          label: '首页',
          link: '/'
        },
        {
          label: 'CSS',
          autogenerate: { directory: 'css' }
        },
        {
          label: 'Git',
          autogenerate: { directory: 'git' }
        },
        {
          label: 'Fomily 表单框架',
          autogenerate: { directory: 'fomily' }
        },
        {
          label: 'JavaScript',
          autogenerate: { directory: 'js' }
        },
        {
          label: '工程化',
          autogenerate: { directory: 'engineering' }
        },
        {
          label: '指南',
          autogenerate: { directory: 'guides' }
        },
        {
          label: '参考',
          autogenerate: { directory: 'reference' }
        }
      ],
      customCss: [
        './src/styles/custom.css'
      ]
    }),
  ],
});
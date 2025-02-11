// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Blog',
			logo: {src:'./src/assets/logo.webp'},
			social: {
				github: 'https://github.com/Wang9977/wy-blog',
			},
			// sidebar: [
			// 	// {
			// 	// 	// label:"首页",
			// 	// 	slug: 'home/home'
			// 	// },
			// 	// {
			// 	// 	label: 'Guides',
			// 	// 	items: [
			// 	// 		// Each item here is one entry in the navigation menu.
			// 	// 		{ label: 'Example Guide1', slug: 'guides/example' },
			// 	// 	],
			// 	// },
			// 	// {
			// 	// 	label: 'Reference',
			// 	// 	autogenerate: { directory: 'reference' },

			// 	// },
			// ],
		}),
	],
});

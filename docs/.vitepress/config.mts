import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Nice Validate",
  description: "Nice Validation package for Vue, Support directive + data based validation,",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { 
			text: 'Introduction', 
			link: '/guide/introduction',
		  },
		  { 
			text: 'Getting Started', 
			link: '/guide/getting-started',
		  },
		  { 
			text: 'Syntax', 
			link: '/guide/syntax',
		  },
		  { 
			text: 'Displaying Errors', 
			link: '/guide/displaying-errors',
		  },
		  { 
			text: 'Error Messages', 
			link: '/guide/error-messages',
		  },
		  { 
			text: 'Validation Rules', 
			link: '/guide/validation-rules',
		  },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yogeshgalav/vue-nice-validate' },
      { icon: 'discord', link: 'https://discord.com/channels/1193587847165378670/1193587848402714666' }
    ]
  }
})

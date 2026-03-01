import { getPermalink, getBlogPermalink } from './utils/permalinks';
import { SITE } from 'astrowind:config';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getBlogPermalink(),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Archive',
      href: getPermalink('/tags'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Pages',
      links: [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
      ],
    },
    {
      title: 'Explore',
      links: [{ text: 'Archive', href: '/tags' }],
    },
    {
      title: 'Connect',
      links: [
        { text: 'GitHub', href: 'https://github.com/your-username/your-repo' },
        { text: 'Reddit', href: 'https://www.reddit.com/r/your_subreddit' },
        { text: 'Email', href: 'mailto:your-email@example.com' },
      ],
    },
  ],

  secondaryLinks: [],

  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/your-username/your-repo' },
    { ariaLabel: 'Reddit', icon: 'tabler:brand-reddit', href: 'https://www.reddit.com/r/your_subreddit' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:your-email@example.com' },
  ],

  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="${SITE.site}"> ${SITE.name}</a> · All rights reserved.
  `,
};

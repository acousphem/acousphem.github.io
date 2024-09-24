import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink(''),
    },
    {
      text: 'Research',
      href: getPermalink('/research'),
    },
    {
      text: 'Publications',
      href: getPermalink('/publications'),
    },
    {
      text: 'Members',
      href: getPermalink('/members'),
    },
    {
      text: 'Collaborations',
      href: getPermalink('/collabs'),
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog List',
          href: getBlogPermalink(),
        },
        {
          text: 'Categories',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Tags',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
  ],
  // actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Lab',
      links: [
        { text: 'Home', href: '' },
        { text: 'Research', href: '/research' },
        { text: 'Publications', href: '/publications' },
        { text: 'Members', href: '/members' },
        { text: 'Collaborations', href: '/collabs' },
      ],
    },
    {
      title: 'Blog',
      links: [
        { text: 'Blog', href: '#' },
        { text: 'Categories', href: '#' },
        { text: 'Tags', href: '#' },
        { text: 'News', href: '#' },
      ],
    },
    {
      title: 'Lab',
      links: [
        //{ text: 'About Us', href: '#' },
        { text: 'Contact', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    //{ text: 'Terms', href: getPermalink('/terms') },
    //{ text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/acousphem' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/acousphem' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/profile.php?id=61563897180246' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
   // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    Made by AcousPhem 🔉 | All rights reserved.
  `,
};

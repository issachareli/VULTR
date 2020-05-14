export default {sponsor:{
  top: [
    {
      name: 'Dashboard',
      url: '/sponsor',
      icon: 'Home',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'Reports',
      url: '/sponsor/reports',
      icon: 'Folder',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'Generated Tests',
      url: '/sponsor/generated-tests',
      icon: 'Edit',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'eLearning Sphere',
      url: 'https://ewealthcollege.thinkific.com',
      icon: 'Book',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO'],
      external: true,
      target: '_blank'
    },
        {
      name: 'Latest',
      url: '/sponsor/home',
      icon: 'Book',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO'],
    },
    {
      name: 'Video Resources',
      url: '/sponsor/video-resources',
      icon: 'Youtube',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'Create Sponsor',
      url: '/sponsor/create-sponsor',
      icon: 'Target',
      allowed:['SYSTEM', 'MANAGEMENT']
    },
        {
      name: 'Sub Sponsor',
      url: '/sponsor/subsponsor',
      icon: 'Users',
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE']
    },
    {
      name: 'Management Dashboard',
      url: '/sponsor/management',
      icon: 'Command',
      allowed:['SYSTEM', 'MANAGEMENT']
    },
    // {
    //   name: 'UI Elements',
    //   icon: 'Layers',
    //   children: [
    //     {
    //       name: 'Buttons',
    //       url: '/elements/buttons',
    //     },
    //     {
    //       name: 'Grid',
    //       url: '/elements/grid',
    //     },
    //     {
    //       name: 'Alerts',
    //       url: '/elements/alerts',
    //     },
    //     {
    //       name: 'Typography',
    //       url: '/elements/typography',
    //     },
    //     {
    //       name: 'Cards',
    //       url: '/elements/cards',
    //     },
    //     {
    //       name: 'Tabs',
    //       url: '/elements/tabs',
    //     },
    //     {
    //       name: 'Tables',
    //       url: '/elements/tables',
    //     },
    //     {
    //       name: 'Breadcrumbs',
    //       url: '/elements/breadcrumbs',
    //     },
    //     {
    //       name: 'Forms',
    //       url: '/elements/forms',
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/elements/modals',
    //     },
    //     {
    //       name: 'Loaders',
    //       url: '/elements/loaders',
    //     },
    //     {
    //       name: 'Avatars',
    //       url: '/elements/avatars',
    //     },
    //     {
    //       name: 'Progress Bars',
    //       url: '/elements/progressbars',
    //     },
    //     {
    //       name: 'Pagination',
    //       url: '/elements/pagination',
    //     },
    //   ],
    // },
    // {
    //   name: 'Pages',
    //   icon: 'File',
    //   children: [
    //     {
    //       name: 'Blank',
    //       url: '/pages/blank',
    //     },
    //     {
    //       name: 'Sub Navigation',
    //       url: '/pages/subnav',
    //     },
    //     {
    //       name: '404',
    //       url: '/pages/404',
    //     },
    //     {
    //       name: 'Reports',
    //       url: '/pages/reports',
    //     }
    //   ]
    // },
    // {
    //   name: 'Apps',
    //   icon: 'Cloud',
    //   children: [
    //     {
    //       name: 'SponsorDashboard',
    //       url: '/apps/analytics',
    //     },
    //     {
    //       name: 'Invoice',
    //       url: '/apps/invoice',
    //     },
    //     {
    //       name: 'Activity Feed',
    //       url: '/apps/feed',
    //     },
    //     {
    //       name: 'CMS',
    //       url: '/apps/cms',
    //     },
    //   ],
    // },
    // {
    //   divider: true,
    // },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'Package',
    //   badge: {
    //     text: 'NEW',
    //   },
    // },
  ],
  bottom: [
    {
      name: 'Profile',
      url: '/sponsor/profile',
      icon: 'User',
    },
  ]

},
user:{
  top:[{
    name: 'Dashboard',
    url: '/user',
    icon: 'Home',
  },
  {
    name: 'Test Results',
    url: '/user/reports',
    icon: 'File'
  },
],
  bottom:[
    {
      name: 'Profile',
      url: '/user/profile',
      icon: 'User',
    },
  ]
}};

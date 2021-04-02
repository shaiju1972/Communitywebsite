// application
import { IMainMenuLink } from '~/interfaces/main-menu-link';

const dataHeaderMainMenu: IMainMenuLink[] = [
    {
        title: 'Home',
        url: '/',
       
    },
    {
        title: 'Best Deals',
        url: '/best-deals',
    },
    {
        title: 'My Malls',
        url: '/malls',
        submenu: {
            type: 'menu',
            links: [
                {
                    title: 'Malls',
                },
                
            ],
        },
    },
    {
        title: 'Jobs',
        url: '/jobs',
      
    },
    {
        title: 'Properties',
        url: '/properties',
        submenu: {
            type: 'menu',
            links: [],
        },
        
    },
    {
        title: 'Vehicles',
        url: '/vehicles',
       
    },
    {
        title: 'Products',
        url: '/products',
       
    },
    {
        title: 'Services',
        url: '/Services',
       
    },
    {
        title: 'News & Articles',
        url: '/News-Articles',
       
    },
    {
        title: 'My Directory',
        url: '/directory',
       
    },
    {
        title: 'My Gallery',
        url: '/my-gallery',
       
    },
];

export default dataHeaderMainMenu;

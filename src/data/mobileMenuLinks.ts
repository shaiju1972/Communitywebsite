// application
import { IMobileMenuLink } from '~/interfaces/mobile-menu-link';

const dataMobileMenuLinks: IMobileMenuLink[] = [
    {
        title: 'Home',
        url: '/',
        // submenu: {
        //     type: 'menu',
        //     links: [
        //         { title: 'Home One', url: '/' },
        //         { title: 'Home Two', url: '/demo/home-two' },
        //         {
        //             title: 'Header Spaceship',
        //             url: '/demo/header-spaceship-variant-one',
        //             links: [
        //                 { title: 'Variant One', url: '/demo/header-spaceship-variant-one' },
        //                 { title: 'Variant Two', url: '/demo/header-spaceship-variant-two' },
        //                 { title: 'Variant Three', url: '/demo/header-spaceship-variant-three' },
        //             ],
        //         },
        //         {
        //             title: 'Header Classic',
        //             url: '/demo/header-classic-variant-one',
        //             links: [
        //                 { title: 'Variant One', url: '/demo/header-classic-variant-one' },
        //                 { title: 'Variant Two', url: '/demo/header-classic-variant-two' },
        //                 { title: 'Variant Three', url: '/demo/header-classic-variant-three' },
        //                 { title: 'Variant Four', url: '/demo/header-classic-variant-four' },
        //                 { title: 'Variant Five', url: '/demo/header-classic-variant-five' },
        //             ],
        //         },
        //         {
        //             title: 'Mobile Header',
        //             url: '/demo/mobile-header-variant-one',
        //             links: [
        //                 { title: 'Variant One', url: '/demo/mobile-header-variant-one' },
        //                 { title: 'Variant Two', url: '/demo/mobile-header-variant-two' },
        //             ],
        //         },
        //     ],
        // },
    },

    {
        title: 'Best Deals',
        url: '/best-deals',
    },
   
    {
        title: 'My Malls',
        url: '/malls',
        submenu: [
            {
            title: 'Malls', url:'/malls'
            },
        ]
    },
    {
        title: 'Jobs',
        url: '/jobs',
      
    },
    {
        title: 'Properties',
        url: '/properties',
        submenu: [
            {
            title: 'Sub page', url:'/sub-pages'
            }, 
        ]
        
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

export default dataMobileMenuLinks;

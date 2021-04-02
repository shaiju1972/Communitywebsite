/* eslint-disable @typescript-eslint/no-unused-vars */

// application
import { IAddress } from '~/interfaces/address';
import { IAppLinkHref } from '~/components/shared/AppLink';
import { IBrand } from '~/interfaces/brand';
import { ICategory, IShopCategory } from '~/interfaces/category';
import { IOrder } from '~/interfaces/order';
import { IPost } from '~/interfaces/post';
import { IProduct } from '~/interfaces/product';

const url = {
    // common
    home: () => '/',
    category: (category: ICategory): IAppLinkHref => {
        if (category.type === 'shop') {
            return url.shopCategory(category);
        }

        return '/';
    },

    // shop pages
    shop: () => '/catalog',
    shopCategory: (category: IShopCategory): IAppLinkHref => ({
        href: `/catalog/[slug]${category.layout === 'products' ? '/products' : ''}?slug=${category.slug}`,
        as: `/catalog/${category.slug}${category.layout === 'products' ? '/products' : ''}`,
    }),
    products: ({ filters }: { filters?: Record<string, string>} = {}): IAppLinkHref => ({
        href: {
            pathname: '/catalog/products',
            query: {
                ...filters,
            },
        },
    }),
    product: (product:any): IAppLinkHref => ({
        href: `/products/[slug]?slug=${product._id}`,
        as: `/products/${product._id}`,
    }),
    brand: (brand: IBrand) => '/',
    cart: () => '/cart',
    checkout: () => '/cart/checkout',
    checkoutSuccess: (order: IOrder): IAppLinkHref => ({
        href: `/cart/checkout/[token]?token=${order.token}`,
        as: `/cart/checkout/${order.token}`,
    }),
    wishlist: () => '/wishlist',
    compare: () => '/compare',
    trackOrder: () => '/track-order',

    // blog pages
    blog: () => '/demo/blog/classic-right-sidebar',
    post: (post: IPost) => '/demo/blog/post-full-width',

    // auth pages
    signIn: () => '/account/login',
    signUp: () => '/',
    passwordRecovery: () => '/',

    // account pages
    accountDashboard: (): IAppLinkHref => '/account/dashboard',
    accountGarage: () => '404',
    accountProfile: () => '404',
    accountPassword: () => '404',
    accountOrders: () => '404',
    accountOrderView: (order: Partial<IOrder>): IAppLinkHref => ({
        href: `/account/orders/[id]?id=${order.id}`,
        as: `/account/orders/${order.id}`,
    }),
    // accountAddresses: () => '404',
    accountAddressNew: (): IAppLinkHref => ({
        href: '/account/addresses/[id]?id=new',
        as: '/account/addresses/new',
    }),
    accountAddressEdit: (address: IAddress): IAppLinkHref => ({
        href: `/account/addresses/[id]?id=${address.id}`,
        as: `/account/addresses/${address.id}`,
    }),

    // site pages
    pageAboutUs: () => '/about-us',
    pageContactUs: () => '/contact-us',
    pageStoreLocation: () => '/',
    pageTerms: () => '/terms',

    // my community navigations
    accountProperties: ():IAppLinkHref => '/account/properties',
    accountVehicles: ():IAppLinkHref => '/vehicles',
    accountServices: ():IAppLinkHref => '/services',
    accountJobs: ():IAppLinkHref => '/jobs',
    accountFeeds: ():IAppLinkHref => '/feeds',
    accountOrderHistory: ():IAppLinkHref => '/order-history',
    accountAddresses: () => '/addresses',
    properties: (): IAppLinkHref => '/properties',
    propertiesDetails: (product:any): IAppLinkHref => ({
        href: `/properties/[slug]?slug=${product._id}`,
        as: `/properties/${product._id}`,
    }),

};

export default url;

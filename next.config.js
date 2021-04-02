const locales = ['en', 'ru', 'ar'];
const defaultLocale = 'en';

// noinspection JSUnusedGlobalSymbols
module.exports = {
    env: {
        basePath: process.env.BASE_PATH || '',
        GOOGLE_MAP_API_KEY: 'AIzaSyArQKFGg9sgZ_Gxrkx9Fa6doFF7H64dng4',
        API_URL: 'http://175.41.176.135:3000'
    },
    basePath: process.env.BASE_PATH || '',
    async rewrites() {
        return [
            ...locales.filter((locale) => locale !== defaultLocale).map((locale) => [
                { source: `/${locale}{/}?`, destination: '/' },
                { source: `/${locale}/:path*`, destination: '/:path*' },
            ]).reduce((acc, cur) => [...acc, ...cur], []),
        ];
    },
    async redirects() {
        return [
            {
                source: `/${defaultLocale}{/}?`,
                destination: '/',
                permanent: true,
            },
            {
                source: `/${defaultLocale}/:path*`,
                destination: '/:path*',
                permanent: true,
            },
        ];
    },
};

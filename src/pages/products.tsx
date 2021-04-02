import React, { useEffect, useMemo } from 'react'
import {
    IShopPageGridLayout,
    IShopPageLayout,
    IShopPageOffCanvasSidebar,
    IShopPageSidebarPosition,
} from '~/interfaces/pages';
import { useIntl } from 'react-intl';
import { useAppRouter } from '~/services/router';
import { useShop } from '~/store/shop/shopHooks';
import { buildQuery } from '~/store/shop/shopHelpers';
import { removePrefix } from '~/services/i18n/utils';
import { baseUrl, getCategoryParents } from '~/services/utils';
import queryString from 'query-string';
import { ILink } from '~/interfaces/link';
import BlockHeader from '~/components/blocks/BlockHeader';
import url from '~/services/url';
import ShopSidebar from '~/components/shop/ShopSidebar';
import classNames from 'classnames';
import BlockSpace from '~/components/blocks/BlockSpace';
import ProductsView from '~/components/shop/ProductsView';
import { CurrentVehicleScopeProvider } from '~/services/current-vehicle';
import { SidebarProvider } from '~/services/sidebar';
import BlockSlideshow from '~/components/blocks/BlockSlideshow';
import { wrapper } from '~/store/store';
import getShopPageData from '~/store/shop/shopHelpers';
import ShopPageShop from '~/components/shop/ShopPageShop';
import AddressCard from '~/components/shared/AddressCard';
import FilterBySearch from '~/components/filters/FilterBySearch';
import BlockGift from '~/components/blocks/BlockGift';
import BlockFeeds from '~/components/blocks/BlockFeeds';
import BlockLatestJob from '~/components/blocks/BlockLatestJob';
import BlockBestDeals from '~/components/blocks/BlockBestDeals';
import { useDeferredData } from '~/services/hooks';
import { shopApi } from '~/api';


interface Props {
    layout: IShopPageLayout;
    gridLayout: IShopPageGridLayout;
    sidebarPosition?: IShopPageSidebarPosition;
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    await getShopPageData(context, 'engine-drivetrain');
});


export default function products(props: Props) {

    const {
        layout = "grid",
        gridLayout = "grid-4-sidebar",
        sidebarPosition = "end"
    } = props;
    const intl = useIntl();
    const router = useAppRouter();
    const shopState = useShop();


    // Replace current url.
    useEffect(() => {
        const query = buildQuery(shopState.options, shopState.filters);

        const href = queryString.stringifyUrl({
            ...queryString.parseUrl(router.asPath),
            query: queryString.parse(query),
        }, { encode: false });

        router.replace({
            pathname: router.pathname,
            query: {
                slug: router.query.slug,
            },
        }, removePrefix(href), {
            shallow: true,
        }).then(() => {
            // This is necessary for the "History API" to work.
            window.history.replaceState(
                {
                    ...window.history.state,
                    options: {
                        ...window.history.state.options,
                        shallow: false,
                    },
                },
                '',
                baseUrl(href),
            );
        });
    }, [shopState.options, shopState.filters]);

    const hasSidebar = ['grid-3-sidebar', 'grid-4-sidebar'].includes(gridLayout);
    const offCanvasSidebar: IShopPageOffCanvasSidebar = [
        'grid-4-full',
        'grid-5-full',
        'grid-6-full',
    ].includes(gridLayout) ? 'always' : 'mobile';

    const pageHeader = useMemo(() => {
        let pageTitle = intl.formatMessage({ id: 'HEADER_SHOP' });
        const breadcrumb: ILink[] = [
            { title: intl.formatMessage({ id: 'LINK_HOME' }), url: url.home() },
            { title: intl.formatMessage({ id: 'LINK_SHOP' }), url: url.shop() },
        ];


        if (shopState.category) {
            getCategoryParents(shopState.category).forEach((parent) => {
                breadcrumb.push({ title: parent.name, url: url.category(parent) });
            });

            breadcrumb.push({ title: shopState.category.name, url: url.category(shopState.category) });

            pageTitle = shopState.category.name;
        }

        return <BlockHeader pageTitle={pageTitle} breadcrumb={breadcrumb} />;
    }, [intl, shopState.category]);

    const slides = useMemo(() => [
        {
            url: '404',
            desktopImage: '/images/slides/slide-1.jpg',
            mobileImage: '/images/slides/slide-1-mobile.jpg',
            offer: '30% OFF',
            title: 'Big Choice Of <br>Sound System',
            details: 'Installation of parts in the services of <br>our partners.',
            buttonLabel: 'View More',
        },
        {
            url: '404',
            desktopImage: '/images/slides/slide-2.jpg',
            mobileImage: '/images/slides/slide-2-mobile.jpg',
            offer: '25% OFF',
            title: 'Big Choice of <br>Vehicles in Qatar',
            details: 'We have everything you need – replacement parts, <br>performance parts, accessories, oil & fluids, <br>tools and much more...',
            buttonLabel: 'View More',
        },
        {
            url: '404',
            desktopImage: '/images/slides/slide-3.jpg',
            mobileImage: '/images/slides/slide-3-mobile.jpg',
            offer: '40% OFF',
            title: 'Big Choice of<br>Properties in Qatar',
            details: 'Any size and diameter, with or without spikes, <br>summer or winter, rain or snow.',
            buttonLabel: 'View More',
        },
    ], []);

    const newArrivals = useDeferredData(() => shopApi.getLatestProducts(12), []);

    //   if (shopState.categoryIsLoading || (shopState.productsListIsLoading && !shopState.productsList)) {
    //     // return null;
    // }

    const sidebar = (
        <>
            {/* <BlockBestDeals
                fullWidth={true}
                blockTitle={intl.formatMessage({ id: 'TEXT_BEST_DEAILS' })}
                products={newArrivals.data} />
            <BlockGift blockTitle="New Gifts" page={true} />
            <BlockLatestJob width={true} blockTitle={intl.formatMessage({ id: 'TEXT_LATEST_JOBS' })} /> */}

        </>
    );

    const blockSplitClasses = classNames('block-split', {
        'block-split--has-sidebar': hasSidebar,
    });

    return (
        <React.Fragment>
            <BlockSpace layout="divider-xs" />
            <BlockSlideshow slides={slides} />
            <SidebarProvider>
                <CurrentVehicleScopeProvider>
                    {pageHeader}
                    <div className={blockSplitClasses}>
                        {offCanvasSidebar === 'always' && sidebar}
                        <div className="container">
                            <div className="block-split__row row no-gutters">
                                {sidebarPosition === 'start' && hasSidebar && (
                                    <div className="block-split__item block-split__item-sidebar col-auto">
                                        {sidebar}
                                    </div>)}
                                <div className="block-split__item block-split__item-content col-auto flex-grow-1">
                                    <div className="block">
                                        <FilterBySearch />
                                        <ProductsView
                                            layout={layout}
                                            gridLayout={gridLayout}
                                            offCanvasSidebar={offCanvasSidebar}
                                        />

                                    </div>
                                </div>

                                {sidebarPosition === 'end' && hasSidebar && (
                                    <div className="block-split__item block-split__item-sidebar col-auto">
                                        {sidebar}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <BlockSpace layout="before-footer" />
                </CurrentVehicleScopeProvider>
            </SidebarProvider>
        </React.Fragment>
    )
}

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
import { ILink } from '~/interfaces/link';
import BlockHeader from '~/components/blocks/BlockHeader';
import url from '~/services/url';
import classNames from 'classnames';
import BlockSpace from '~/components/blocks/BlockSpace';
import ProductsView from '~/components/shop/ProductsView';
import { SidebarProvider } from '~/services/sidebar';
import BlockSlideshow from '~/components/blocks/BlockSlideshow';
import { wrapper } from '~/store/store';
import getShopPageData from '~/store/shop/shopHelpers';
import FilterBySearch from '~/components/filters/FilterBySearch';
import BlockGift from '~/components/blocks/BlockGift';
import BlockLatestJob from '~/components/blocks/BlockLatestJob';
import BlockBestDeals from '~/components/blocks/BlockBestDeals';
import { useDeferredData } from '~/services/hooks';
import { shopApi } from '~/api';
import { useRouter, withRouter } from 'next/router'
interface Props {
    layout: IShopPageLayout;
    gridLayout: IShopPageGridLayout;
    sidebarPosition?: IShopPageSidebarPosition;
}
import {useSelector, useDispatch} from 'react-redux'
import { getCategoriesFilter } from '~/store/properties/propertiesActions'

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//     await getShopPageData(context, 'engine-drivetrain');
// });


const properties = (props: any) =>{
    const dispatch = useDispatch();
    const getPropertiesFilter = React.useCallback((e)=> dispatch(getCategoriesFilter(e)),[dispatch])
    const {
        layout = "list",
        gridLayout = "grid-4-sidebar",
        sidebarPosition = "end"
    } = props;
    const intl = useIntl();
    const router = useAppRouter();
    const shopState = useShop();

    const[filter, setFilter]=React.useState({})

    useEffect(()=>{
        if(router.query.categoryId){
            getPropertiesFilter({categoryId:router.query.categoryId})
            setFilter({categoryId:router.query.categoryId})
        }
    },[router])


    const hasSidebar = ['grid-3-sidebar', 'grid-4-sidebar'].includes(gridLayout);
    const offCanvasSidebar: IShopPageOffCanvasSidebar = [
        'grid-4-full',
        'grid-5-full',
        'grid-6-full',
    ].includes(gridLayout) ? 'always' : 'mobile';

    const pageHeader = useMemo(() => {
        let pageTitle = intl.formatMessage({ id: 'HEADER_PROPERTIES' });
        const breadcrumb: ILink[] = [
            { title: intl.formatMessage({ id: 'HEADER_PROPERTIES' }), url: url.properties() }
        ];


        if (shopState.category) {
            // getCategoryParents(shopState.category).forEach((parent) => {
            //     breadcrumb.push({ title: parent.name, url: url.category(parent) });
            // });

            // breadcrumb.push({ title: shopState.category.name, url: url.category(shopState.category) });

            // pageTitle = shopState.category.name;
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
    const searchFilter = e =>{
        setFilter({
            ...filter,
            ...e
        })
        getPropertiesFilter(e)
    }
    const handlePaginateChange=e=>{
        getPropertiesFilter({...filter, ...e})
    }


    const sidebar = ()=> (
        <>
            <div className="container properties-list">
                <BlockBestDeals
                    fullWidth={true}
                    blockTitle={intl.formatMessage({ id: 'TEXT_BEST_DEAILS' })}
                    products={newArrivals.data} />
                <BlockGift blockTitle="New Gifts" fullWidth={true} />
                <BlockLatestJob fullWidth={true} blockTitle={intl.formatMessage({ id: 'TEXT_LATEST_JOBS' })} />
            </div>
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
                    {pageHeader}
                    <div className={blockSplitClasses}>
                        {offCanvasSidebar === 'always' && sidebar}
                        <div className="container">
                            <div className="block-split__row row no-gutters">
                                {sidebarPosition === 'start' && hasSidebar && (
                                    <div className="block-split__item block-split__item-sidebar col-auto">
                                        {sidebar()}
                                    </div>)}
                                <div className="block-split__item block-split__item-content col-auto flex-grow-1">
                                    <div className="block">
                                        <FilterBySearch filter={(e)=>searchFilter(e)} filterParams={filter} />
                                        <ProductsView
                                            layout={layout}
                                            gridLayout={gridLayout}
                                            offCanvasSidebar={offCanvasSidebar}
                                            pagination={handlePaginateChange}
                                        />

                                    </div>
                                </div>

                                {sidebarPosition === 'end' && hasSidebar && (
                                    <div className="block-split__item block-split__item-sidebar col-auto">
                                        {sidebar()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <BlockSpace layout="before-footer" />
            </SidebarProvider>
        </React.Fragment>
    )
}


export default properties
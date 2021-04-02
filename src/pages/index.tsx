// react
import React, { useMemo } from 'react';
// third-party
import { useIntl } from 'react-intl';
// application
import BlockFeatures from '~/components/blocks/BlockFeatures';
import BlockSlideshow from '~/components/blocks/BlockSlideshow';
import BlockTopFeatures from '~/components/blocks/BlockTopFeatures';
import BlockBestDeals from '~/components/blocks/BlockBestDeals';
import BlockGift from '~/components/blocks/BlockGift';
import BlockFeeds from '~/components/blocks/BlockFeeds';
import BlockLatestJob from '~/components/blocks/BlockLatestJob';

import BlockSpace from '~/components/blocks/BlockSpace';
import { shopApi } from '~/api';
import { useDeferredData } from '~/services/hooks';

function Page() {
    const intl = useIntl();
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
  
    return (
        <React.Fragment>
            {/* <BlockFinder /> */}
            <BlockSpace layout="divider-xs" />
            <BlockSlideshow slides={slides} />
            <BlockFeatures layout="top-strip" />
            <BlockSpace layout="divider-nl" />
            <div className="inline-features">
                <div className="container top-blocks">
                    <BlockTopFeatures
                        blockTitle={intl.formatMessage({ id: 'HEADER_TOP_FEATURES' })}
                        />
                    <BlockBestDeals 
                        blockTitle={intl.formatMessage({ id: 'TEXT_BEST_DEAILS' })}
                        products={newArrivals.data}/>
                </div>
            </div>
       
            <BlockSpace layout="divider-nl" />
            <div className="container feeds-container">
                <BlockGift blockTitle={intl.formatMessage({ id: 'TEXT_SURPRISE_GIFT' })} />
                <BlockFeeds blockTitle={intl.formatMessage({ id: 'TEXT_LATEST_FEEDS' })} />
                <BlockLatestJob blockTitle={intl.formatMessage({ id: 'TEXT_LATEST_JOBS' })} />
            </div>
         
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;

// react
import React, { ReactNode } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
import SectionHeader from '~/components/shared/SectionHeader';
import {  Search20Svg } from '~/svg';

// application
import {
    Fi24Hours48Svg,
    FiFreeDelivery48Svg,
    FiPaymentSecurity48Svg,
    FiTag48Svg,
} from '~/svg';

export type IBlockFeaturesLayout = 'top-strip' | 'bottom-strip';

interface Props {
    blockTitle: ReactNode;
}

const feeds =[
    {
        image:'https://imagevars.gulfnews.com/2019/07/24/Abu-Dhabi-skyline_16c24a05731_large.jpg',
        name:'Abu Dhabi',
        timestamp:'40 minutes ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        image:'https://i.imgur.com/aoKusnD.jpg',
        name:'James Ben',
        timestamp:'1 hour ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU',
        name:'James Ben',
        timestamp:'1 hour ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
]

function BlockFeeds(props: Props) {
    const { blockTitle } = props;

    return (
        <div className={`block block-features block-latest-feeds`}>
            <div className="container">
                <div className="view-badge">
                    <SectionHeader
                        sectionTitle={blockTitle}
                    />
                    <div className="tag-badge tag-badge--add">
                        <FormattedMessage id="TEXT_ADD" />
                    </div>
                </div>
                <div className="header__enquiry">
                    <div className="enquiry">
                            <button className="enquiry__button enquiry__button--end">
                                <label htmlFor="">What are you looking for?</label>
                                <span> (Please send your inqueries here)</span>
                            </button>
                    </div>
                </div>
                <div className="block-latest-feeds_content">
                    <div className="container feed-container mt-4 mb-5">
                        <div className="d-flex justify-content-center row">
                            {feeds && feeds.map((feed, index)=>(
                                <div className="col-md-12 feed-item" key={index}>
                                    <div className="feed p-2">                                
                                        <div className="bg-white border mt-2">
                                            <div>
                                                <div className="d-flex flex-row justify-content-between align-items-center top-container">
                                                
                                                    <div className="d-flex flex-row align-items-center feed-text">
                                                        <img className="rounded-circle" src={feed.image} width="65" height="65" />
                                                        <div className="d-flex flex-column flex-wrap ml-2 title"><span className="font-weight-bold">{feed.name}</span><span className="text-black-50 time description">{feed.timestamp}</span>
                                                        </div>
                                                    </div>
                                                    <div className="feed-icon px-2">
                                                        <i className="fa fa-ellipsis-v text-black-50"></i>
                                                    </div>
                                                </div>
                                                <div className="p-2 px-3"><span>{feed.description}</span></div>
                                            </div>
                                            <div className="feed-image">
                                                <img className="img-fluid img-responsive" src={feed.image} />
                                            </div>
                                            <div className="d-flex justify-content-end socials p-2 py-3">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default React.memo(BlockFeeds);

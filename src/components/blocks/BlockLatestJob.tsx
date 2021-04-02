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
    fullWidth?:boolean;
}

const jobListing =[
    {
        title: 'Operation Manager',
        description: 'Lorem ipsum is simply dummy text of the printing and typing...',
        timestamp:'3 minutes ago',
        location:'Doha'
    },
    {
        title: 'Site Supervisor',
        description: 'Lorem ipsum is simply dummy text of the printing and typing...',
        timestamp:'25 minutes ago',
        location:'Al Rayyan'
    },
    {
        title: 'Account Manager',
        description: 'Lorem ipsum is simply dummy text of the printing and typing...',
        timestamp:'25 hours ago',
        location:'Al Wakrah'
    },
]
function BlockLatestJob(props: Props) {
    const { blockTitle, fullWidth } = props;

    return (
        <div className={`block block-jobs block-latest-jobs ${fullWidth ? 'w-100':''}`}>
            <div className="container">
                <div className="view-badge">
                    <SectionHeader
                        sectionTitle={blockTitle}
                    />
                    <div className="tag-badge tag-badge--view">
                        <FormattedMessage id="TEXT_VIEW_ALL" />
                    </div>
                </div>
                <div className="latest-jobs">
                    {jobListing && jobListing.map((job, index)=>(
                        <React.Fragment key={index}>
                            <div className="job-item">
                                <div className="job-title">{job.title}</div>
                                <div className="job-description">{job.description}</div>
                                <div className="job-meta">
                                    <span>{job.timestamp}</span>
                                    <span>at {job.location}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>                  
            </div>
        </div>
    );
}

export default React.memo(BlockLatestJob);

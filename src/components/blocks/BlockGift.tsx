// react
import React from 'react';
// third-party
// application
import AppLink from '~/components/shared/AppLink';
import SectionHeader from '~/components/shared/SectionHeader';
import AppImage from '~/components/shared/AppImage';
import { FormattedMessage } from 'react-intl';

interface Props {
    blockTitle: React.ReactNode;
    fullWidth?:boolean
}

function BlockGift(props: Props) {
    const { blockTitle, fullWidth } = props;
    return (
        <div className={`block block-gifts ${fullWidth ? 'w-100':''}`}>
            <div className="container">
                <div className="section-header">
                    <div className="section-header__body">
                        <h2 className="section-header__title">{blockTitle}</h2>
                        <div className="section-header__divider" />
                    </div>
                </div>

                <div className="block-gifts_content">
                    <div className={`item ${fullWidth ? 'w-100':''}`}>
                        <div className="cover-image">
                            <div className="image-container">
                                <AppImage className="image__tag" src={'/images/offergift/offer-gifr-1.jpg'} />
                            </div>
                        </div>
                        <div className="title">
                            <label>30% OFF</label>
                            <span>On all jeans</span>
                            <AppLink href={'/my-malls'}>
                                <div className="tag-badge tag-badge--gift">
                                    <FormattedMessage id="TEXT_OPEN_ME" />
                                </div>
                            </AppLink>
                        </div>
                    </div>
                    <div className="item">
                        <div className="cover-image">
                            <div className="image-container">
                                <AppImage className="image__tag" src={'/images/offergift/offer-gifr-1.jpg'} />
                            </div>
                        </div>
                        <div className="title">
                            <label>30% OFF</label>
                            <span>On all jeans</span>
                            <AppLink href={'/my-malls'}>
                                <div className="tag-badge tag-badge--gift">
                                    <FormattedMessage id="TEXT_OPEN_ME" />
                                </div>
                            </AppLink>
                        </div>
                    </div>
                    <div className="item">
                        <div className="cover-image">
                            <div className="image-container">
                                <AppImage className="image__tag" src={'/images/offergift/offer-gifr-1.jpg'} />
                            </div>
                        </div>
                        <div className="title">
                             <label>30% OFF</label>
                            <span>On all jeans</span>
                            <AppLink href={'/my-malls'}>
                                <div className="tag-badge tag-badge--gift">
                                    <FormattedMessage id="TEXT_OPEN_ME" />
                                </div>
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockGift);

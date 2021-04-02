// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import Decor from '~/components/shared/Decor';
import FooterContacts from '~/components/footer/FooterContacts';
import FooterLinks from '~/components/footer/FooterLinks';
import FooterNewsletter from '~/components/footer/FooterNewsletter';
// data
import theme from '~/data/theme';

export function Footer() {
    return (
        <div className="site-footer">
            <Decor className="site-footer__decor" type="bottom" />
            <div className="site-footer__widgets">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <FooterContacts className="site-footer__widget" />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <FooterLinks
                                className="site-footer__widget"
                                header={<FormattedMessage id="HEADER_INFORMATION" />}
                                links={[
                                    { title: <FormattedMessage id="LINK_ABOUT_US" /> },
                                    { title: <FormattedMessage id="LINK_CONTACT_US" /> },
                                    { title: <FormattedMessage id="TEXT_REGISTER_NOW" /> },
                                    { title: <FormattedMessage id="TEXT_DOWNLOAD_APP" /> },
                                    { title: <FormattedMessage id="LINK_DELIVERY_INFORMATION" /> },
                                    { title: <FormattedMessage id="LINK_PRIVACY_POLICY" /> },
                                    { title: <FormattedMessage id="TEXT_RETURN_POLICY" /> },
                                ]}
                            />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <FooterLinks
                                className="site-footer__widget"
                                header={<FormattedMessage id="TEXT_QUICK_LINKS" />}
                                links={[
                                    { title: <FormattedMessage id="TEXT_BEST_DEAILS" /> },
                                    { title: <FormattedMessage id="TEXT_MALLS" /> },
                                    { title: <FormattedMessage id="TEXT_PRODUCTS" /> },
                                    { title: <FormattedMessage id="TEXT_SERVICES" /> },
                                    { title: <FormattedMessage id="TEXT_VEHICLES" /> },
                                    { title: <FormattedMessage id="TEXT_PROPERTIES" /> },
                                    { title: <FormattedMessage id="TEXT_JOBS" /> },
                                ]}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                            <FooterNewsletter className="site-footer__widget" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="site-footer__bottom-row">
                        <div className="site-footer__copyright">
                            {/* copyright */}
                            {'© Copyrights '}
                            <AppLink href="https://reactjs.org/" target="_blank" rel="noreferrer">MyCommunity.Qa</AppLink>
                            {' / '}
                            <AppLink href="https://nextjs.org/" target="_blank" rel="noreferrer">.</AppLink>
                            {'. '}
                            <AppLink href={theme.author.profile_url} target="_blank" rel="noreferrer">
                                {theme.author.name}
                            </AppLink>
                            {/* copyright / end */}
                        </div>
                        <div className="site-footer__payments">
                            <AppImage src="/images/payments.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Footer);

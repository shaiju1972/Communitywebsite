// react
import React, {useRef} from 'react';
// third-party
// application
import SectionHeader from '~/components/shared/SectionHeader';
// third-party
import classNames from 'classnames';
import Slick from 'react-slick';
import { FormattedMessage } from 'react-intl';
// application
import AppLink from '~/components/shared/AppLink';
import AppSlick, { ISlickProps } from '~/components/shared/AppSlick';
import Arrow from '~/components/shared/Arrow';
import Decor from '~/components/shared/Decor';
import SingleProductCard from '~/components/shared/SingleProductCard';
import Timer from '~/components/shared/Timer';
import { baseUrl } from '~/services/utils';
import { IProduct } from '~/interfaces/product';

interface Props {
    blockTitle: React.ReactNode;
    products: IProduct[];
    loading?: boolean;
    fullWidth?:boolean
}

const slickSettings: ISlickProps = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
};


function BlockBestDeals(props: Props) {
    const { products, loading = false, blockTitle, fullWidth} = props;
    const slickRef = useRef<Slick>(null);

    const rootClasses = classNames('block', 'block-best__deal', { 'block-sale--loading': loading });

    return (
        <div className={`${rootClasses} ${fullWidth ? 'w-100':''}`}>
            <div className="block-best_deal__content">
                <div className="view-badge">
                    <SectionHeader
                        sectionTitle={blockTitle}
                    />
                    <div className="tag-badge tag-badge--view">
                        <FormattedMessage id="TEXT_VIEW_ALL" />
                    </div>
                </div>
                <div className="block-best_deal__body">
                    <div className="block-best_deal__loader" />
                    <div className="container">
                        <div className="block-best_deal__carousel">
                            <AppSlick ref={slickRef} {...slickSettings}>
                                {products.map((product) => (
                                    <div key={product.id} className="block-best_deal__item">
                                        <SingleProductCard
                                            product={product}
                                            exclude={['features', 'list-buttons']}
                                        />
                                    </div>
                                ))}
                            </AppSlick>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockBestDeals);

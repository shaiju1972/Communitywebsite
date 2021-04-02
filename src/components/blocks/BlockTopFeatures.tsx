// react
import React from 'react';
// third-party
// application
import AppLink from '~/components/shared/AppLink';
import SectionHeader from '~/components/shared/SectionHeader';
import AppImage from '~/components/shared/AppImage';
import classNames from 'classnames';


interface Props {
    blockTitle: React.ReactNode;
}
const subcategories=[
    {
        id:1,
        image:'/images/topfeatures/my-malls-1.jpg',
        name:'My Malls',
        link:'',
    },
    {
        id:22,
        image:'/images/topfeatures/my-supermarket.jpg',
        name:'My Supermarket',
        link:'',
    },
    {
        id:321,
        image:'/images/topfeatures/my-directory.jpg',
        name:'My Dictionary',
        link:'',
    },
    {
        id:132,
        image:'/images/topfeatures/arround-me.jpg',
        name:'Around Me',
        link:'',
    }
]

function BlockTopFeatures(props: Props) {
    const { blockTitle } = props;
    return (
        <div className="block block-top-features">
            <div className="container">
                <SectionHeader
                    sectionTitle={blockTitle}
                />
                <div className="block-top__features_content">
                   <div className="block">
                <div className={`categories-list categories-list--layout--columns-4-sidebar`}>
                    <ul className="categories-list__body">
                        {subcategories.map((subcategory) => (
                            <React.Fragment key={subcategory.id}>
                                <li
                                    className={classNames('categories-list__item', {
                                        'categories-list__item--has-image': subcategory.image,
                                    })}
                                >
                                    <AppLink href={subcategory.link}>
                                        {subcategory.image && (
                                            <div className="image image--type--category">
                                                <div className="image__body">
                                                    <AppImage
                                                        className="image__tag"
                                                        src={subcategory.image}
                                                        alt={subcategory.name}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="categories-list__item-name">
                                            {subcategory.name}
                                        </div>
                                    </AppLink>
                                </li>
                                <li className="categories-list__divider" />
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
                       
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockTopFeatures);

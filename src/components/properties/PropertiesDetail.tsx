// react
import React, { useEffect, useState, useMemo } from 'react';
// third-party
import classNames from 'classnames';
import { Controller, FormProvider } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import AppLink from '~/components/shared/AppLink';
import AsyncAction from '~/components/shared/AsyncAction';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
import CurrencyFormat from '~/components/shared/CurrencyFormat';
import InputNumber from '~/components/shared/InputNumber';
import PageTitle from '~/components/shared/PageTitle';
import ProductGallery, { IProductGalleryLayout } from '~/components/shop/ProductGallery';
import ProductSidebar from '~/components/shop/ProductSidebar';
import ShareLinks from '~/components/shared/ShareLinks';
import StockStatusBadge from '~/components/shared/StockStatusBadge';
import url from '~/services/url';
import { getCategoryPath } from '~/services/utils';
import { IProduct } from '~/interfaces/product';
import { IProductPageLayout, IProductPageSidebarPosition } from '~/interfaces/pages';
import { shopApi } from '~/api';
import { useCompareAddItem } from '~/store/compare/compareHooks';
import { useProductForm } from '~/services/forms/product';
import { useWishlistAddItem } from '~/store/wishlist/wishlistHooks';
import { Modal } from 'reactstrap';

import {
    Compare16Svg,
    Fi24Hours48Svg,
    FiFreeDelivery48Svg,
    FiPaymentSecurity48Svg,
    FiTag48Svg,
    Wishlist16Svg,
} from '~/svg';
import BlockBestDeals from '../blocks/BlockBestDeals';
import BlockGift from '../blocks/BlockGift';
import BlockLatestJob from '../blocks/BlockLatestJob';
import { useDeferredData } from '~/services/hooks';
import BlockMap from '../blocks/BlockMap';
import dataBlogPosts from '~/data/blogPosts';
import AppImage from '../shared/AppImage';
import GoogleMapReact from 'google-map-react';
import { Cross12Svg } from '~/svg';


interface Props {
    product: any;
    layout: IProductPageLayout;
    sidebarPosition?: IProductPageSidebarPosition;
}

function PropertiesDetails(props: Props) {
    const[open, setOpen] = useState(false);
    const {
        product,
        layout = "sidebar",
        sidebarPosition = "start"
    } = props;
    const intl = useIntl();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    const galleryLayout = `product-${layout}` as IProductGalleryLayout;
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const productForm = useProductForm(product);
    const posts = useMemo(() => dataBlogPosts.slice(0, 4), []);
    const [mapOptions, setMapOPtions] = useState({
        center: {
            lat: 24.343175,
            lng: 54.405406
        },
        zoom: 11
    });
   

    useEffect(() => {
        let canceled = false;

        shopApi.getRelatedProducts(product.id, 8).then((result) => {
            if (canceled) {
                return;
            }
            setRelatedProducts(result);
        });

        return () => {
            canceled = true;
        };
    }, [product]);


    if (!product) {
        return null;
    }

    useEffect(() => {
        setMapOPtions({
            ...mapOptions, center: {
            lat: product?.mapDetails?.lat ||24.343175,
            lng:product?.mapDetails?.lng || 54.405406 ,
        }
        })
      
    }, [product?.mapDetails])



    const newArrivals = useDeferredData(() => shopApi.getLatestProducts(12), []);
    const breadcrumb = [
        { title: intl.formatMessage({ id: 'LINK_HOME' }), url: url.home() },
        ...getCategoryPath(product.categories && product.categories[0]).map((x) => ({
            title: x.name,
            url: url.category(x),
        })),
        { title: product.name, url: url.product(product) },
    ];

    const toggle = ()=>{
            setOpen(!open);
    };

    // const featuredAttributes = product.imageFiles.filter((x) => x.url);

    const shopFeatures = (
        <div className="product__shop-features shop-features">
            <ul className="shop-features__list">
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiFreeDelivery48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_FREE_SHIPPING_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_FREE_SHIPPING_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <Fi24Hours48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SUPPORT_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiPaymentSecurity48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SECURITY_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SECURITY_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiTag48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_HOT_OFFERS_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_HOT_OFFERS_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
            </ul>
        </div>
    );

    const productInfoBody = (
        <div className="product__info-body">
            {product.compareAtPrice && (
                <div className="product__badge tag-badge tag-badge--sale">
                    <FormattedMessage id="TEXT_BADGE_SALE" />
                </div>
            )}

            <div className="product__prices-stock">
                <div className="product__prices">
                    {product.compareAtPrice && (
                        <React.Fragment>
                            <div className="product__price product__price--old">
                                <CurrencyFormat value={product.compareAtPrice} />
                            </div>
                            <div className="product__price product__price--new">
                                <CurrencyFormat value={product.price} />
                            </div>
                        </React.Fragment>
                    )}
                    {!product.compareAtPrice && (
                        <div className="product__price product__price--current">
                            <CurrencyFormat value={product.price} />
                        </div>
                    )}
                </div>
                <StockStatusBadge className="product__stock" stock={product.stock} />
            </div>

            <div className="product__meta">
                <table> 
                    <tbody>
                        <tr>
                            <th>
                                <FormattedMessage id="TABLE_SKU" />
                            </th>
                            <td>{product.sku}</td>
                        </tr>
                        {product.brand && (
                            <React.Fragment>
                                <tr>
                                    <th>
                                        <FormattedMessage id="TABLE_BRAND" />
                                    </th>
                                    <td>
                                        <AppLink href={url.brand(product.brand)}>
                                            {product.brand.name}
                                        </AppLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <FormattedMessage id="TABLE_COUNTRY" />
                                    </th>
                                    <td>
                                        <FormattedMessage id={`COUNTRY_NAME_${product.brand.country}`} />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )}
                        <tr>
                            <th>
                                <FormattedMessage id="TABLE_PART_NUMBER" />
                            </th>
                            <td>{product.partNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    const productActions = (
        <div className="product__actions">
            {product.stock !== 'out-of-stock' && (
                <React.Fragment>
                    <div className="product__actions-item product__actions-item--quantity">
                        <Controller
                            name="quantity"
                            rules={{
                                required: true,
                            }}
                            render={({ value, onChange, onBlur }) => (
                                <InputNumber
                                    size="lg"
                                    min={1}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </div>
                    <div className="product__actions-item product__actions-item--addtocart">
                        <button
                            type="submit"
                            className={classNames('btn', 'btn-primary', 'btn-lg', 'btn-block', {
                                'btn-loading': productForm.submitInProgress,
                            })}
                        >
                            <FormattedMessage id="BUTTON_ADD_TO_CART" />
                        </button>
                    </div>
                    <div className="product__actions-divider" />
                </React.Fragment>
            )}
            <AsyncAction
                action={() => wishlistAddItem(product)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        className={classNames('product__actions-item', 'product__actions-item--wishlist', {
                            'product__actions-item--loading': loading,
                        })}
                        onClick={run}
                    >
                        <Wishlist16Svg />
                        <span>
                            <FormattedMessage id="BUTTON_ADD_TO_WISHLIST" />
                        </span>
                    </button>
                )}
            />
            <AsyncAction
                action={() => compareAddItem(product)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        className={classNames('product__actions-item', 'product__actions-item--compare', {
                            'product__actions-item--loading': loading,
                        })}
                        onClick={run}
                    >
                        <Compare16Svg />
                        <span>
                            <FormattedMessage id="BUTTON_ADD_TO_COMPARE" />
                        </span>
                    </button>
                )}
            />
        </div>
    );

    const productTagsAndShareLinks = (
        <div className="product__tags-and-share-links">
            {product.tags && product.tags.length > 0 && (
                <div className="product__tags tags tags--sm">
                    <div className="tags__list">
                        {product.tags.map((tag, index) => (
                            <AppLink href="/" key={index}>
                                {tag}
                            </AppLink>
                        ))}
                    </div>
                </div>
            )}
            <ShareLinks className="product__share-links" />
        </div>
    );

    const handleApiLoaded = (map, maps) => {

    }
    const sidebar = (
        <>
            <div className="p-1">
                <BlockBestDeals
                    fullWidth={true}
                    blockTitle={intl.formatMessage({ id: 'TEXT_BEST_DEAILS' })}
                    products={newArrivals.data} />
            </div>
            <div className="card mt-1 p-2">
                <BlockGift blockTitle="Surprise Gifts!" fullWidth={true} />
            </div>
            <div className="card mt-1 p-2">
                <BlockLatestJob fullWidth={true} blockTitle={intl.formatMessage({ id: 'TEXT_LATEST_JOBS' })
                } />
            </div>

        </>
    );
    const contactComponent = (
        <>
            {product.contactDetails && <div className="block">
                <div className="container">
                    <div className="section-header__divider" />
                    <div className="row ml-auto mt-20" style={{padding:'20px 0'}}>
                        <h6 className="">Contact between {product.contactDetails.contactTimeFrom} to {product.contactDetails.contactTimeTo}</h6>
                    </div>
                    <div className="table user-call-block">
                        <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                                <div className="prop-detail user-avatar">
                                    <AppImage src={posts[0].image} />
                                    <span className="user-avatar-title">{product.contactDetails.contactName}</span>
                                </div>
                            <div>
                                <button type="button" className={`btn btn-primary btn-lg`} onClick={()=>toggle()}>Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            } 
             <Modal isOpen={open} toggle={()=>toggle()} centered className="quickview">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Contact Details
                        </h5>
                        <button type="button" className="quickview__close" onClick={()=>toggle()}>
                            <Cross12Svg />
                        </button>
                    </div>
            
                <div className="modal-body">
                    <div className="row">
                        <div className="container">
                            <div className="col-md-12">
                                {product?.contactDetails && (
                                    <table className="table">
                                        <tr>
                                            <td>Contact Name:</td>
                                            <td>{product.contactDetails.contactName}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact Number:</td>
                                            <td>{product.contactDetails.contactNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact between:</td>
                                            <td>{product.contactDetails.contactTimeFrom} - {product.contactDetails.contactTimeTo}</td>
                                        </tr>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>            
        </>
    )

    const DetailsofVilla = (
        <>
            <div className="col-md-12 pl-0 mb-4">
                <h5 className="product__title">Details of Villa</h5>
            </div>
            <div className="row ">
                <div className="col-md-4">
                    <p> <strong>Type</strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p> strong
                    </p>
                </div>
            </div>
            <div className="row ">
                <div className="section-header__divider mt-0 mb-2 " />
                <div className="col-md-4">
                    <p>
                        <strong>
                            No.of Rooms
                        </strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        {product.noOfRooms} BHK
                    </p>
                </div>

            </div>
            <div className="row ">
                <div className="section-header__divider mt-0 mb-2" />
                <div className="col-md-4">
                    <p>
                        <strong>
                            No.of Bathrooms
                        </strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>{product.noOfBathrooms}
                    </p></div>
            </div>
            <div className="row ">
                <div className="section-header__divider mt-0 mb-2" />
                <div className="col-md-4">
                    <p><strong>
                        Furniture
                    </strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        {product.furnitureStatus == 1 ? 'Furnished' : product.furnitureStatus == 2 ? 'Semi furnished' : 'Unfurnished'}
                    </p>
                </div>
            </div>
            <div className="row ">
                <div className="section-header__divider mt-0 mb-2" />
                <div className="col-md-4">
                    <p><strong>   Commission</strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        {product.commissionRequired == 0 ? 'Commision not required' : 'Commision required'}

                    </p>
                </div>
            </div>
            {product.commissionRequired == 1 && <div className="row ">
                <div className="section-header__divider mt-0 mb-2" />
                <div className="col-md-4">
                    <p><strong>Commission Amount</strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        {product.commissionAmount}

                    </p>
                </div>
            </div>}
            <div className="row ">
                <div className="section-header__divider mt-0 mb-2" />
                <div className="col-md-4">
                    <p><strong>   Deposit</strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        {product.depositRequired == 0 ? ' Deposit not required' : ' Deposit required'}
                    </p>
                </div>
            </div>
            {product.depositRequired == 1 && <div className="row ">
                <div className="section-header__divider mt-0 mb-2" />
                <div className="col-md-4">
                    <p><strong>Deposit Amount</strong>
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        {product.depositAmount}

                    </p>
                </div>
            </div>}
        </>)

    function createMarkup() {
        return { __html: product.description };
    }
    const MapMarker = ({ text }) => (
        <div style={{
            color: 'white',
            background: 'grey',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
            {text}
        </div>
    );
  
    return (
        <React.Fragment>
            <PageTitle>{product.name}</PageTitle>
            <BlockHeader breadcrumb={breadcrumb} />
            <div className={classNames('block-split', { 'block-split--has-sidebar': layout === 'sidebar' })}>
                <div className="container ">
                    <div className="block-split__row row no-gutters">
                        {/* {layout === 'sidebar' && sidebarPosition === 'start' && (
                            <div className="block-split__item block-split__item-sidebar col-auto">
                                <ProductSidebar />
                            </div>
                        )} */}

                        <div className="block-split__item block-split__item-content   w-100 col-auto">
                            <div className={`product product--layout--${layout}`}>
                                <div className="product__body">
                                    <div className="col card p-5">
                                        <div className="product__header pl-0">
                                            <h1 className="product__title">{product.name}</h1>
                                            <h5 className="product__title title-purple">
                                                <CurrencyFormat value={product.price} />
                                            </h5>
                                             <div className="section-header__divider" />
                                            <div className="product__subtitle">
                                                <div className="product__rating">
                                                    {/* <div className="product__rating-stars">
                                                    <Rating value={product.rating || 0} />
                                                </div> */}
                                                    <div className="product__rating-label">

                                                        {product.locationDetails && <a>{product.locationDetails.locationName}</a>}
                                                        {/* <AppLink href={{ href: { hash: 'product-tab-reviews' } }}>
                                                        <FormattedMessage
                                                            id="TEXT_RATING_LABEL"
                                                            values={{
                                                                rating: product.rating,
                                                                reviews: product.reviews,
                                                            }}
                                                        />
                                                    </AppLink> */}
                                                    </div>
                                                </div>

                                                {/* <CompatibilityStatusBadge className="product__fit" product={product} /> */}
                                            </div>
                                        </div>
                                        <div className="product__card product__card--one" />
                                        <div className="product__card product__card--two" />
                                        { product.imageFiles && product.imageFiles.length > 0 &&(
                                            <ProductGallery
                                                images={product?.imageFiles || []}
                                                layout={galleryLayout}
                                                className="product__gallery"
                                            />
                                        )}            
                                        <div className="section-header__divider" />
                                        <div className="product__main">
                                            <h5 className="product__title">Description</h5>
                                            {product.description && (
                                                <div className="product__excerpt">
                                                    <div dangerouslySetInnerHTML={createMarkup()} />
                                                </div>)}
                                            
                                            {/* {featuredAttributes.length > 0 && (
                                                <div className="product__features">
                                                    <div className="product__features-title">
                                                        <FormattedMessage id="TEXT_KEY_FEATURES" />
                                                    </div>
                                                </div>)} */}
                                            <BlockSpace layout="divider-nl" />
                                            {contactComponent}
                                            <BlockSpace layout="divider-nl" />
                                            {DetailsofVilla}
                                            <BlockSpace layout="divider-nl" />
                                            <div className="col-md-12 pl-0 mb-4">
                                                <h5 className="product__title">Location Map</h5>
                                            </div>

                                            <div className="col-lg-12" style={{ height: "200px" }}>
                                                <div className="form-group" style={{ height: "200px" }}>
                                                    <GoogleMapReact
                                                        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY || '' }}
                                                             defaultCenter={mapOptions.center}
                                                            defaultZoom={mapOptions.zoom}
                                                        yesIWantToUseGoogleMapApiInternals
                                                        // onClick={handleMapClick}
                                                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                                                    >
                                                        <MapMarker text={'Here'} />
                                                    </GoogleMapReact>
                                                </div>
                                            </div>

                                            {/* <BlockMap mapDetails={product.mapDetails} /> */}
                                        </div>
                                    </div>
                                    <div className="product__info">
                                        {sidebar}
                                        {/* <FormProvider {...productForm.methods}>
                                            <form onSubmit={productForm.submit} className="product__info-card">
                                                {productInfoBody}
                                                  {product.options.length > 0 && (
                                                    <ProductForm
                                                        options={product.options}
                                                        className="product__form"
                                                        namespace="options"/>)}
                                               {productActions}
                                           {productTagsAndShareLinks}
                                            </form>
                                        </FormProvider>
                                                 {shopFeatures} */}
                                    </div>
                                    {/* <ProductTabs className="product__tabs" product={product} layout={layout} /> */}
                                </div>
                            </div>

                            {/* {relatedProducts.length > 0 && (
                                <React.Fragment>
                                    <BlockSpace layout="divider-nl" />
                                        <BlockProductsCarousel
                                        blockTitle={intl.formatMessage({ id: 'HEADER_RELATED_PRODUCTS' })}
                                        products={relatedProducts}
                                        layout={layout === 'sidebar' ? 'grid-4-sidebar' : 'grid-5'}
                                    />
                                </React.Fragment>
                            )} */}
                        </div>
                        {layout === 'sidebar' && sidebarPosition === 'end' && (
                            <div className="block-split__item block-split__item-sidebar col-auto">
                                <ProductSidebar />
                            </div>)}
                    </div>
                </div>
            </div>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default PropertiesDetails;

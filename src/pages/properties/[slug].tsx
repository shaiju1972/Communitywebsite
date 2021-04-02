// react
import React, { useEffect, useCallback,useState } from 'react';
// third-party
import { GetServerSideProps } from 'next';
// application
import ShopPageProduct from '~/components/shop/ShopPageProduct';
import { IProduct } from '~/interfaces/product';
import { shopApi } from '~/api';
import SitePageNotFound from '~/components/site/SitePageNotFound';
import PropertiesDetails from '~/components/properties/PropertiesDetail';
import { getpropertiesById } from '~/store/properties/propertiesActions'
import { useDispatch } from 'react-redux'



interface Props {
    product: any | null;
}

export const getServerSideProps: any = async ({ params }) => {
    const slug = typeof params?.slug === 'string' ? params?.slug : null;

    return {
        props: {
            slug
        }
    }
};

function Page(props: any) {

    const { slug } = props;
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})


    const data = async () => {
        const response = await dispatch(getpropertiesById(slug))
        setProduct(response)
    }

    if (product === null) {
          return <SitePageNotFound />;
      }
    useEffect(() => {
        data()
    }, [slug])


    return (
       
        <PropertiesDetails
            product={product}
            layout="sidebar"
            sidebarPosition="start"

        />
    );
}

export default Page;

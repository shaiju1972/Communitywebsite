/* eslint-disable no-alert */

// react
import { useEffect, useMemo, useRef } from 'react';
// third-party
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
// application
// import { ICartItemOption } from '~/store/cart/cartTypes';
// import { IProduct } from '~/interfaces/product';
import { useAsyncAction } from '~/store/hooks';
import { usePropertiesAddItem } from '~/store/properties/propertiesHooks';

// export interface IProductForm {
//     options: Record<string, any>;
//     quantity: number | string;
// }

export function usePropertiesForm(properties: any | null) {
    const intl = useIntl();
    // const cartAddItem = useCartAddItem();
    const addProperties = usePropertiesAddItem()
    const methods = useForm();
    const { handleSubmit } = methods;
    const { submitCount } = methods.formState;
    const prevSubmitCount = useRef(0);

    useEffect(() => {
        if (prevSubmitCount.current !== submitCount && Object.keys(methods.errors).length > 0) {
            console.log(methods.errors)
            if (methods.errors.propertyName) {
                alert(intl.formatMessage({ id: 'ERROR_ADD_PROPERTY' }));
            } else if (methods.errors.options) {
                alert(intl.formatMessage({ id: 'ERROR_ADD_TO_CART_OPTIONS' }));
            }
        }

        prevSubmitCount.current = submitCount;
    }, [intl, submitCount, methods.errors]);

    const [submit, submitInProgress] = useAsyncAction(async (data:any) => {
        console.log(properties)
        if (!properties) {
            return null;
        }

        return addProperties(data);
    }, [properties, addProperties]);

    return {
        submit: useMemo(() => handleSubmit(submit), [handleSubmit, submit]),
        submitInProgress: submitInProgress || methods.formState.isSubmitting,
        errors: methods.errors,
        register: methods.register,
        watch: methods.watch,
        methods,
    };
}

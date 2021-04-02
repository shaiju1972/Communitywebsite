// application
import { addProperties } from '~/store/properties/propertiesActions';
import { useAppAction, useAppSelector } from '~/store/hooks';

export const usePropertiesAddItem = () => useAppAction(addProperties);

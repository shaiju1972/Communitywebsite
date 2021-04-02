import { IDesktopHeaderVariant, IMobileHeaderVariant } from '~/store/options/optionsTypes';

interface IConfig {
    desktopHeaderVariant: IDesktopHeaderVariant;
    mobileHeaderVariant: IMobileHeaderVariant;
}

const config: IConfig = {
    desktopHeaderVariant: 'classic/five',
    // desktopHeaderVariant: 'spaceship/one',
    mobileHeaderVariant: 'one',
};

export default config;

// react
import { useMemo, useState } from 'react';
// third-party
import { useForm } from 'react-hook-form';
// application
import { useAsyncAction } from '~/store/hooks';
import { useUserSignIn } from '~/store/user/userHooks';

interface ISignInFormOptions {
    onSuccess?: () => void;
}

export interface ISignInForm {
    username: string;
    password: string;
    remember: boolean;
}

export function useSignInForm(options: ISignInFormOptions = {}) {
    const signIn = useUserSignIn();
    const { onSuccess } = options;
    const [serverError, setServerError] = useState<string | null>(null);
    const methods = useForm<ISignInForm>({
        defaultValues: {
            username: '',
            password: '',
            remember: false,
        },
    });
    const { handleSubmit } = methods;
    const [submit, submitInProgress] = useAsyncAction((data: ISignInForm) => {
        setServerError(null);

        return signIn(data.username, data.password).then(
            () => {
                if (onSuccess) {
                    onSuccess();
                }
            },
            (error: Error) => {
                setServerError(`ERROR_API_${error.message}`);
            },
        );
    }, [signIn, setServerError, onSuccess]);

    return {
        submit: useMemo(() => handleSubmit(submit), [handleSubmit, submit]),
        submitInProgress: submitInProgress || methods.formState.isSubmitting,
        serverError,
        errors: methods.errors,
        register: methods.register,
        watch: methods.watch,
    };
}

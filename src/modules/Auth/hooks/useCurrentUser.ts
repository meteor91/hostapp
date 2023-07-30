import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../api';
import { User } from 'core/models';
import { clearAuthorized, setAuthorized } from '../slices';

export const useCurrentUser = (
    onSuccess: () => void,
    onError: () => void,
) => {
    const dispatch = useDispatch();
    const { isLoading } = useQuery('currentUser', getCurrentUser, {
        onSuccess: (user: User) => {
            dispatch(setAuthorized(user));
            onSuccess();
        },
        onError: () => {
            dispatch(clearAuthorized());
            onError();
        },
    });

    return isLoading;
};
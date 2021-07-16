import { useCallback, useEffect, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { throttle } from 'lodash';

const API_ENDPOINT = 'https://api.github.com/search/users';
const CANCELED_BY_USER_MESSAGE = 'Operation canceled by the user.';
const CancelTokenFactory = axios.CancelToken;
let cancelTokenSource: CancelTokenSource | null;

export type User = {
  id: string;
  login: string;
  url: string;
  avatar_url: string;
};

export default function useUserSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchUsers = (query: string) => {
    //always cancel pending requests before executing a new one
    if (cancelTokenSource) {
      cancelTokenSource.cancel(CANCELED_BY_USER_MESSAGE);
    }

    //reset error state
    setError(undefined);

    if (query === '') {
      setUsers([]);
    } else {
      // get a new cancel token
      cancelTokenSource = CancelTokenFactory.source();

      //execute the request
      //the user qualifier is set because we want to search for usernames explicitly
      setLoading(true);
      axios
        .get(API_ENDPOINT, {
          params: { q: query, type: 'user' },
          cancelToken: cancelTokenSource.token,
        })
        .then((res) => {
          cancelTokenSource = null;
          setUsers(res?.data?.items || []);
          setLoading(false);
        })
        .catch((err) => {
          cancelTokenSource = null;
          if (err.message !== CANCELED_BY_USER_MESSAGE) {
            setError(err);
            setLoading(false);
          }
        });
    }
  };

  //this could also be debounced instead of just throttled
  const searchUsers = useCallback(throttle(fetchUsers, 1000), []);

  //cleanup on unmount
  useEffect(() => {
    return function cleanup() {
      if (cancelTokenSource) {
        cancelTokenSource.cancel(CANCELED_BY_USER_MESSAGE);
      }
    };
  }, []);

  return {
    searchUsers,
    users,
    error,
    loading,
  };
}

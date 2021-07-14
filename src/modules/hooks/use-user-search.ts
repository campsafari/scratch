import { useEffect, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';

const API_ENDPOINT = 'https://api.github.com/search/users';
const CANCEL_ERROR_MESSAGE = 'Operation canceled by the user.';
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

  const searchUsers = (query: string) => {
    //always cancel pending requests before executing a new one
    if (cancelTokenSource) {
      cancelTokenSource.cancel(CANCEL_ERROR_MESSAGE);
    }

    //reset error state
    setError(undefined);

    if (query === '') {
      setUsers([]);
    } else {
      // get a new cancel token
      cancelTokenSource = CancelTokenFactory.source();

      //execute the request
      axios
        .get(`${API_ENDPOINT}?q=${query}`, {
          cancelToken: cancelTokenSource.token,
        })
        .then((res) => {
          cancelTokenSource = null;
          setUsers(res?.data?.items || []);
        })
        .catch((err) => {
          cancelTokenSource = null;
          if (err.message !== CANCEL_ERROR_MESSAGE) {
            setError(err);
          }
        });
    }
  };

  //cleanup on unmount
  useEffect(() => {
    return function cleanup() {
      if (cancelTokenSource) {
        cancelTokenSource.cancel(CANCEL_ERROR_MESSAGE);
      }
    };
  }, []);

  return {
    searchUsers,
    users,
    error,
  };
}

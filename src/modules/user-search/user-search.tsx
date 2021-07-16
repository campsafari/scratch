import { StyleSheet, css } from 'aphrodite/no-important';
import { useEffect, useState } from 'react';
import UserList from 'modules/user-search/user-list/user-list';
import UserSearchInput from 'modules/user-search/user-search-input';
import useUserSearch from 'hooks/use-user-search';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyItems: 'stretch',
    flexDirection: 'column',
    width: 300,
  },
  listContainer: {
    position: 'absolute',
    top: 35,
    width: '100%',
    maxHeight: 200,
    borderRadius: 8,
    overflowY: 'auto',
    boxSizing: 'border-box',
    backgroundColor: 'white',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    padding: 8,
    margin: 0,
  },
});

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const { searchUsers, users, error } = useUserSearch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO any preconditions that should be met (i.e min query length)
    setQuery(e.target.value);
  };

  const handleOnKeyDown = (e: { keyCode: number }) => {
    // up/down arrow buttons select next/previous user item
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < users.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      window.open(users[cursor].url, '_blank');
    }
  };

  const handleOnBlur = () => {
    setCursor(0);
    setQuery('');
  };

  const handleClear = () => {
    setCursor(0);
    setQuery('');
  };

  useEffect(() => {
    searchUsers(query);
  }, [query, searchUsers]);

  useEffect(() => {
    setCursor(0);
  }, [users]);

  return (
    <div className={css(styles.container)}>
      <UserSearchInput
        InputProps={{
          value: query,
          onChange: handleOnChange,
          onKeyDown: handleOnKeyDown,
          onBlur: handleOnBlur,
        }}
        onClear={handleClear}
      />
      <div className={css(styles.listContainer)}>
        <UserList users={users} cursor={cursor} query={query} />
      </div>
      {error && <p className={css(styles.errorMessage)}>{error.message}</p>}
    </div>
  );
};

export default UserSearch;

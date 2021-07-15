import { FC, useEffect, useState } from 'react';
import UserListItem from 'modules/user-search/user-list/user-list-item';
import { StyleSheet, css } from 'aphrodite';
import { User } from 'hooks/use-user-search';

const styles = StyleSheet.create({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
});

type Props = {
  users: User[];
  cursor: number;
  query: string;
};

const UserList: FC<Props> = ({ users, cursor, query, children }) => {
  return (
    <ul className={css(styles.list)}>
      {users.map((user, index) => (
        <UserListItem
          key={user.id}
          user={user}
          focused={cursor === index}
          query={query}
        />
      ))}
    </ul>
  );
};

export default UserList;

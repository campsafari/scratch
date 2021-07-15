import { FC, useEffect, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { User } from 'hooks/use-user-search';

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 2,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#222',
    backgroundColor: '#eee',
  },
  itemFocused: {
    color: '#fefefe',
    backgroundColor: '#4976BA',
  },
  link: {
    color: 'inherit',
  },
  avatar: {
    backgroundColor: 'white',
    marginRight: 10,
    width: 40,
    height: 40,
  },
});

type Props = {
  user: User;
  query?: string;
  focused?: boolean;
};

function renderUsername(username: string, query: string | undefined) {
  const matches = match(username, query || '');
  const parts = parse(username, matches);
  return parts.map((part, index) => (
    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
      {part.text}
    </span>
  ));
}

const UserListItem: FC<Props> = ({ user, focused, query }) => {
  const itemStyles = css(styles.item, focused && styles.itemFocused);
  const itemRef = useRef<null | HTMLLIElement>(null);

  useEffect(() => {
    if (focused) {
      itemRef?.current?.scrollIntoView({
        block: 'start',
      });
    }
  }, [focused]);

  return (
    <li ref={itemRef} key={user.id} className={css(styles.itemContainer)}>
      <div className={itemStyles}>
        <img className={css(styles.avatar)} src={user.avatar_url} />
        <a
          className={css(styles.link)}
          href={user.url}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
        >
          {renderUsername(user.login, query)}
        </a>
      </div>
    </li>
  );
};

export default UserListItem;

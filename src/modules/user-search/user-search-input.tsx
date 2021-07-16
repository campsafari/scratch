import { StyleSheet, css } from 'aphrodite/no-important';
import { FC, InputHTMLAttributes } from 'react';
import searchIcon from 'assets/search_black_24dp.svg';
import clearIcon from 'assets/clear_black_24dp.svg';
import spinner from 'assets/spinner.svg';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    padding: '8px 28px 8px 28px',
    flex: 1,
    borderRadius: 16,
    border: '1px solid grey',
    outline: 'none',
    ':focus-visible': {
      borderColor: '#4976BA',
    },
  },
  leftIcon: {
    position: 'absolute',
    left: 8,
    width: 22,
    height: 22,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
    width: 22,
    height: 22,
  },
});

type Props = {
  InputProps: InputHTMLAttributes<HTMLInputElement>;
  onClear?: () => void;
  loading?: boolean;
};

const UserSearchInput: FC<Props> = ({ InputProps, onClear, loading }) => {
  return (
    <div className={css(styles.container)}>
      <img src={searchIcon} className={css(styles.leftIcon)} />
      <input className={css(styles.input)} type="text" {...InputProps} />
      {InputProps.value && !loading && (
        <img
          onClick={onClear}
          src={clearIcon}
          className={css(styles.rightIcon)}
        />
      )}

      {loading && <img src={spinner} className={css(styles.rightIcon)} />}
    </div>
  );
};

export default UserSearchInput;

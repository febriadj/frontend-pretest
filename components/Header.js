import { useState } from 'react';
import { BiSearch, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styles from '../styles/components/Header.module.css';

function Header({ params, setParams, movies }) {
  const [title, setTitle] = useState('');

  return (
    <div className={styles.header}>
      <div className={styles['search-bar']}>
        <i className={styles.icon}><BiSearch /></i>
        <input
          type="search"
          placeholder="Enter the title of the movie you want to search for"
          className={styles.control}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              setParams((prev) => ({
                ...prev, title,
              }));
            }
          }}
        />
        <button
          type="button"
          className={styles['submit-btn']}
          onClick={() => {
            setParams((prev) => ({
              ...prev, title,
            }));
          }}
        >
          Submit
        </button>
      </div>
      <div className={styles.pagination}>
        <button
          type="button"
          className={`${styles.btn} ${params.page === 1 && styles.off}`}
          onClick={() => {
            if (params.page > 1) {
              setParams((prev) => ({
                ...prev,
                page: prev.page - 1,
              }));
            }
          }}
        >
          <i className={styles.icon}><BiChevronLeft /></i>
        </button>
        <button
          type="button"
          className={`
            ${styles.btn}
            ${movies && movies.Response === 'False' && styles.off}
          `}
          onClick={() => {
            if (params.page < 100 && movies.Response === 'True') {
              setParams((prev) => ({
                ...prev,
                page: prev.page + 1,
              }));
            }
          }}
        >
          <i className={styles.icon}><BiChevronRight /></i>
        </button>
      </div>
      <div className={styles.bottom}>
        <p className={styles.count}>{`Page ${params.page}`}</p>
        {
          movies && movies.Response === 'True' && (
            <p className={styles.length}>{`${movies.totalResults} results`}</p>
          )
        }
      </div>
    </div>
  );
}

export default Header;

import Link from 'next/link';
import { BiArrowBack, BiErrorCircle } from 'react-icons/bi';
import Image from 'next/image';
import styles from '../styles/components/List.module.css';

function List({
  setModal,
  movies,
  setParams,
  params,
}) {
  const handleOpenModal = (args) => {
    setModal((prev) => ({
      ...prev,
      isOpen: true,
      data: args,
    }));
  }

  return (
    <div className={styles.list}>
      {
        params.title.length === 0 && (
          <div className={styles.null}>
            <h3 className={styles.desc}>
              Please enter the title of the movie you want to search for
            </h3>
          </div>
        )
      }
      <div className={styles['list-wrap']}>
        {
          movies && movies.Response === 'True' && movies.Search.map((item) => (
            <div className={styles.card} key={item.imdbID}>
              <div className={styles.poster}>
                {
                  item.Poster !== 'N/A' ? (
                    <Image
                      src={item.Poster}
                      alt={item.Poster}
                      layout="fill"
                      objectFit="cover"
                      priority
                      className={styles.image}
                      onClick={() => handleOpenModal(item)}
                    />
                  ) : (
                    <span className={styles['image-null']}>
                      <i className={styles.icon}><BiErrorCircle /></i>
                    </span>
                  )
                }
                <div className={styles.body}>
                  <Link href={`/${item.imdbID}`} passHref><h4 className={styles.title}>{item.Title}</h4></Link>
                  <p className={styles.year}>{item.Year}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        params.title.length > 0
        && movies
        && movies.Response === 'False'
        && (
          <div className={styles.null}>
            <h1 className={styles.title}>Oops.</h1>
            <h3 className={styles.desc}>The list of movies no longer exists</h3>
            <button
              type="button"
              className={styles.btn}
              onClick={() => {
                setParams((prev) => ({
                  ...prev, page: 1,
                }));
              }}
            >
              <i className={styles.icon}><BiArrowBack /></i>
              <p>Back to first page</p>
            </button>
          </div>
        )
      }
    </div>
  );
}

export default List;

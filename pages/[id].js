import Link from 'next/link';
import { BiArrowBack, BiTime } from 'react-icons/bi';
import styles from '../styles/Details.module.css';

export async function getServerSideProps(context) {
  const { id } = context.query;

  const url = `${process.env.OMDB_API_KEY}&i=${id}&plot=full`;
  const movie = await (await fetch(url)).json();

  return {
    props: {
      movie,
    },
  }
}

function Details({ movie }) {
  return (
    <div className={styles.details}>
      <div className={styles['details-wrap']}>
        <div className={styles.nav}>
          <Link href="/" passHref>
            <i className={styles.btn}><BiArrowBack /></i>
          </Link>
        </div>
        <div className={styles.main}>
          <div className={styles.poster}>
            <img
              src={movie.Poster}
              alt={movie.Poster}
              className={styles.image}
            />
          </div>
          <div className={styles.body}>
            <p className={styles.released}>{movie.Released}</p>
            <h1 className={styles.title}>{movie.Title}</h1>
            <div className={styles.info}>
              <div className={styles.time}>
                <i className={styles.icon}><BiTime /></i>
                <p className={styles.runtime}>{movie.Runtime}</p>
              </div>
              <span className={styles.strip}>-</span>
              <p className={styles.votes}>{`${movie.imdbVotes} votes`}</p>
              <div className={styles.rating}>
                <span className={styles.logo}>IMDb</span>
                <span className={styles.value}>{movie.Ratings[0].Value}</span>
              </div>
            </div>
            <p className={styles.desc}>
              <span className={styles.type}>{movie.Type}</span>
              <span className={styles.strip}>-</span>
              <span className={styles.plot}>{movie.Plot}</span>
            </p>
            <div className={styles.genres}>
              {
                movie.Genre.split(/[\s,]+/g).map((genre) => (
                  <span className={styles.btn} key={genre}>{genre}</span>
                ))
              }
            </div>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.row}>
                  <td className={styles.column}>Actors</td>
                  <td className={styles.column}>:</td>
                  <td className={styles.column}>{movie.Actors}</td>
                </tr>
                <tr className={styles.row}>
                  <td className={styles.column}>Director</td>
                  <td className={styles.column}>:</td>
                  <td className={styles.column}>{movie.Director}</td>
                </tr>
                <tr className={styles.row}>
                  <td className={styles.column}>Writer</td>
                  <td className={styles.column}>:</td>
                  <td className={styles.column}>{movie.Writer}</td>
                </tr>
                <tr className={styles.row}>
                  <td className={styles.column}>Country</td>
                  <td className={styles.column}>:</td>
                  <td className={styles.column}>{movie.Country}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

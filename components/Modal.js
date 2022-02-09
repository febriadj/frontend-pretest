import Image from 'next/image';
import styles from '../styles/components/Modal.module.css';

function Modal({ modal, setModal }) {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-wrap']}>
        {
          modal.data && (
            <Image
              src={modal.data ? modal.data.Poster : ''}
              alt={modal.data ? modal.data.Poster : ''}
              layout="fill"
              objectFit="contain"
              className={styles.image}
            />
          )
        }
      </div>
      <span
        className={styles['close-zone']}
        onClick={() => {
          setModal((prev) => ({
            ...prev,
            isOpen: false,
            data: null,
          }));
        }}
        aria-hidden="true"
      >
      </span>
    </div>
  );
}

export default Modal;

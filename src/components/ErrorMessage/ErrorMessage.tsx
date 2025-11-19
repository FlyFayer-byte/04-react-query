import styles from './ErrorMessage.module.css';

// Типізація пропсів: message — не обовʼязковий
export interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong!',
}: ErrorMessageProps) {
  return <p className={styles.error}>{message}</p>;
}

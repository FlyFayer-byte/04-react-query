import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong',
}: ErrorMessageProps) {
  return (
    <p role="alert" className={styles.error}>
      ❌ {message}
    </p>
  );
}

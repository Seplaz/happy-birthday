import styles from './button.module.css';
import { forwardRef } from 'react';

type ButtonProps = {
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { title, onClick } = props;
  return (
    <button ref={ref} className={styles.button} onClick={onClick}>{title}</button>
  )
})
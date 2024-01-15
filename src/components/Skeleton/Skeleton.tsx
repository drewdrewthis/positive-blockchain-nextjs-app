import React from 'react';
import styles from "./styles.module.scss";

interface SkeletonProps {
  width?: number;
  height?: number;
  key?: string;
}

const Skeleton = ({ width = 200, height = 200, key }: SkeletonProps) => {
  return (
    <div key={key} className={styles['Skeleton__container']} style={{ width, height }}/>
  )
};

export default Skeleton;

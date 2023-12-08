import React from 'react';
import styles from "./styles.module.scss";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface KpiBadgeProps {
  title: string;
  number?: number;
  children?: React.ReactNode;
  tooltip?: string;
}

const KpiBadge = ({ title, number, children, tooltip }: KpiBadgeProps) => {
  return (
    <div className={styles['KpiBadge__container']}>
      <div className="flex items-center">
        <h3>{title}</h3>
        <Tooltip title={tooltip}>
          <HelpOutlineIcon sx={{ marginLeft: '8px', width: 16 }} />
        </Tooltip>
      </div>
      <div className={styles['KpiBadge__content']}>
        {number && (<h2>{number}</h2>)}
        {children}
      </div>
    </div>
  )
};

export default KpiBadge;

import KpiBadge from '@/components/KpiMetrics/KpiBadge';
import React from 'react';
import styles from "./styles.module.scss";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Skeleton from '@/components/Skeleton';

interface KpiMetricsProps {
  allProjectData: any;
  isLoading: boolean;
}

const ACTIVE_PROJECTS_TOOLTIP = 'The Database contains active projects but also some that no longer use blockchain or are not longer active. Use the filters below to see all'
const LEADING_PLATFORMS_TOOLTIP = 'Based on Active projects only. Use the filters to sort by technology platform! Working for one of them? Make sure your ecosystem is represented!'
const LEADING_CATEGORIES_TOOLTIP = 'Based on Active projects only; Learn more about our Database category schema and how it ties to SDG on our Data WIKI.'

const getTopKeys = (data: any, key: string, isArray: boolean) => {
  const countObject: any = [];

  const insertToCount = (item: string) => {
    const normalizedItem = item.trim();
    const foundItem = countObject.find((i: any) => i.key === normalizedItem);
    if (foundItem) {
      foundItem.count += 1;
    } else {
      countObject.push({ key: normalizedItem, count: 1 })
    }
  }

  data.forEach((item: any) => {
    let itemsArray = [];

    if (item[key] && item.active === 'Active') {
      itemsArray = item[key];

      if (!isArray) {
        itemsArray = itemsArray.split(',');
      }
      itemsArray.forEach((i: string) => insertToCount(i))
    }
  })

  const sortedArray = countObject.sort((a: any,b: any) => b.count - a.count);
  const filteredArray = sortedArray.filter((i: any) => i.key !== 'Not Known');

  return filteredArray;
}

const getActiveProjectsNumber = (data: any) => {
  const activeProjects = data.filter((i: any) => i.active === 'Active');

  return activeProjects.length;
}

const KpiMetrics = ({ allProjectData, isLoading }: KpiMetricsProps) => {
  const numberOfProjects = allProjectData.length;
  const topTechnologies = getTopKeys(allProjectData, 'blockchain_technology', false);
  const topCategories = getTopKeys(allProjectData, 'categories_list', true)
  const activePercentage = getActiveProjectsNumber(allProjectData);

  return (
    <div className={styles['NumberBadge__wrapper']}>
      {isLoading ? (
        <>
          <Skeleton width="100%" height={154}/>
          <Skeleton width="100%" height={154}/>
          <Skeleton width="100%" height={154}/>
        </>
      ) : (
        <>
          <div className={styles['NumberBadge__container']}>
            <div className="flex items-center">
              <h3 className="mr-2">Active Projects</h3>
              <Tooltip title={ACTIVE_PROJECTS_TOOLTIP}>
                <HelpOutlineIcon sx={{ marginLeft: '8px', width: 16 }} />
              </Tooltip>
            </div>
            <div className="flex gap-2 items-end">
              <h1 className="text-green-600">{activePercentage}</h1>
              <span>/{numberOfProjects} listed</span>
            </div>
          </div>
          <KpiBadge title="Leading Platforms" tooltip={LEADING_PLATFORMS_TOOLTIP}>
            {topTechnologies.slice(0, 3).map((item: any) => (
              <div key={item.key} className={styles['KpiBadge__single-badge']}>
                {item.key}
                <h3 className="text-green-600">{item.count}</h3>
              </div>
            ))}
          </KpiBadge>
          <KpiBadge title="Leading Categories" tooltip={LEADING_CATEGORIES_TOOLTIP}>
            {topCategories.slice(0, 3).map((item: any) => (
              <div key={item.key} className={styles['KpiBadge__single-badge']}>
                {item.key}
                <h3 className="text-green-600">{item.count}</h3>
              </div>
            ))}
          </KpiBadge>
        </>
      )}
    </div>
  )
};

export default KpiMetrics;

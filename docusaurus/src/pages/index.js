import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

import { folderMapping, languageMapping } from '../../constants';

const Feature = ({ title }) => {
  const platform = `${title.toLowerCase().replace(' ', '')}`;
  return (
    <div className={clsx('col col--2', styles.feature)}>
      <div className={styles.buttons}>
        <Link
          className={clsx(
            'button button--outline button--secondary button--lg',
            styles.getStarted
          )}
          to={useBaseUrl(`${platform}/?language=${languageMapping[platform]}`)}
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export const Home = () => {
  const { siteConfig = {} } = useDocusaurusContext();
  const globalData = useGlobalData();

  const SDK_FOLDERS = Object.values(
    globalData['docusaurus-plugin-content-docs'] || {}
  ).map(({ path }) => folderMapping[path.substring(path.lastIndexOf('/') + 1)]);

  return (
    <Layout
      description="Description will go into a meta tag in <head />"
      title={`Hello from ${siteConfig.title}`}
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        {SDK_FOLDERS.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {SDK_FOLDERS.map((folder, idx) => (
                  <Feature key={idx} title={folder} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default Home;

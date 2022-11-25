import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

import { folderMapping } from '../../constants';

const TUTORIALS = [
  {
    sdk: 'React',
    link: 'react/basics/tutorial',
    description: "Let's build an 1:1 video calling web app",
  },
  {
    sdk: 'React Native',
    link: 'react-native/basics/tutorial',
    description: "Let's build an 1:1 video calling mobile app",
  },
  {
    sdk: 'iOS',
    link: 'ios/basics/tutorial',
    description: "Let's build an 1:1 video calling mobile app",
  },
  {
    sdk: 'Android',
    link: 'android/basics/tutorial',
    description: "Let's build an 1:1 video calling mobile app",
  },
  {
    sdk: 'Flutter',
    link: 'flutter/basics/tutorial',
    description: "Let's build an 1:1 video calling mobile app",
  },
  {
    sdk: 'Angular',
    link: 'angular/basics/tutorial',
    description: "Let's build an 1:1 video calling web app",
  },
];

// { name: '1:1 Calls' },
// { name: 'Screensharing' },
// { name: 'Livestreaming' },
// { name: 'Edge network' },
// { name: 'Audio rooms, large calls' },
// { name: 'Stats' },
// { name: 'Custom Events' },
// { name: 'Breakout rooms' },
// { name: 'Geofencing' },
// { name: 'Transcriptions' },
// { name: 'Recording' },
// { name: 'Webhooks/SQS' },
// { name: 'Dynascale' },
const FEATURES = [
  {
    name: 'Group Calls',
    link: 'TODO',
    description: 'TODO',
    icon: 'TODO',
    links: [
      { name: 'React', link: 'TODO' },
      { name: 'Angular', link: 'TODO' },
      { name: 'iOS', link: 'TODO' },
    ],
  },
  {
    name: '1:1 Calls',
    link: 'TODO',
    description: 'TODO',
    icon: 'TODO',
    links: [
      { name: 'React', link: 'TODO' },
      { name: 'Angular', link: 'TODO' },
      { name: 'iOS', link: 'TODO' },
    ],
  },
  {
    name: 'Edge network',
    link: 'TODO',
    description: 'TODO',
    icon: 'TODO',
    links: [
      { name: 'React', link: 'TODO' },
      { name: 'Angular', link: 'TODO' },
      { name: 'iOS', link: 'TODO' },
    ],
  },
];

const Tutorial = ({ title, description, link }) => (
  <a href={link} className={styles.tutorialTile}>
    <div className="tutorial-tile">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </a>
);

export const Home = () => {
  const { siteConfig = {} } = useDocusaurusContext();
  const globalData = useGlobalData();

  return (
    <Layout description="TODO" title={`TODO`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        What's that?
      </header>
      <main>
        <h2>Get Started</h2>
        <p>
          Get some quick taste of the capabilities of the Stream video platfom
          with our interactive tutorials.
        </p>
        <div class={styles.tutorialBlock}>
          {TUTORIALS.map(({ sdk, link, description }) => (
            <Tutorial title={sdk} link={link} description={description} />
          ))}
        </div>
        <hr />
        <h2>Features Overview</h2>

        <div class={styles.featureBlock}>
          {FEATURES.map(({ name, link, description, icon, links }) => (
            <div className={styles.featureTile}>
              <h3>{name}</h3>
              <p>{description}</p>
              {links.map(({ name, link }) => (
                <li>
                  <a href={link}>{name}</a>
                </li>
              ))}
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;

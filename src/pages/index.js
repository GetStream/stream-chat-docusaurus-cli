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

const SAMPLE_APPS = [
  {
    name: 'Zoom Clone',
    description: 'TODO',
    implementations: [
      {
        name: 'React',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
      {
        name: 'Angular',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
      { name: 'iOS', description: 'TODO', demoLink: 'TODO', codeLink: 'TODO' },
      {
        name: 'Android',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
      {
        name: 'Flutter',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
    ],
  },
  {
    name: 'Messenger Clone',
    description: 'TODO',
    implementations: [
      {
        name: 'React',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
      {
        name: 'Angular',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
      { name: 'iOS', description: 'TODO', demoLink: 'TODO', codeLink: 'TODO' },
      {
        name: 'Android',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
      {
        name: 'Flutter',
        description: 'TODO',
        demoLink: 'TODO',
        codeLink: 'TODO',
      },
    ],
  },
];

const SDK_DOCS = [
  {
    name: 'React',
    link: 'react/basics/getting-started',
    icon: 'TODO',
    highlights: [
      { name: 'Overview', link: 'TODO' },
      { name: 'Architecture', link: 'TODO' },
    ],
  },
  {
    name: 'React Native',
    link: 'react-native/basics/getting-started',
    icon: 'TODO',
    highlights: [{ name: 'Overview' }, { name: 'Architecture' }],
  },
  {
    name: 'iOS',
    link: 'ios/basics/getting-started',
    icon: 'TODO',
    highlights: [
      { name: 'Overview', link: 'TODO' },
      { name: 'Architecture', link: 'TODO' },
    ],
  },
  {
    name: 'Android',
    link: 'android/basics/getting-started',
    icon: 'TODO',
    highlights: [
      { name: 'Overview', link: 'TODO' },
      { name: 'Architecture', link: 'TODO' },
    ],
  },
  {
    name: 'Flutter',
    link: 'flutter/basics/getting-started',
    icon: 'TODO',
    highlights: [
      { name: 'Overview', link: 'TODO' },
      { name: 'Architecture', link: 'TODO' },
    ],
  },
  {
    name: 'Angular',
    link: 'flutter/basics/getting-started',
    icon: 'TODO',
    highlights: [
      { name: 'Overview', link: 'TODO' },
      { name: 'Architecture', link: 'TODO' },
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

        <hr />
        <h2>Example Applications</h2>
        {SAMPLE_APPS.map(({ name, description, implementations }) => (
          <>
            <h3>{name}</h3>
            <p>{description}</p>
            <div class={styles.sampleAppImplementationsBlock}>
              {implementations.map(
                ({ name, description, demoLink, codeLink }) => (
                  <div className={styles.sampleAppImplementationTile}>
                    <h4>{name}</h4>
                    <p>{description}</p>
                    <ul className={styles.demoCodePair}>
                      <li>
                        <a href={demoLink}>Demo</a>
                      </li>
                      <li>
                        <a href={codeLink}>Code</a>
                      </li>
                    </ul>
                  </div>
                )
              )}
            </div>
          </>
        ))}

        <hr />
        <h2>SDK Docs</h2>
        <div class={styles.sdkBlock}>
          {SDK_DOCS.map(({ name, link, icon, highlights }) => (
            <div className={styles.sdkTile}>
              {icon}
              <h3>
                <a href={link}>{name}</a>
              </h3>
              <ul>
                {highlights.map(({ name, link }) => (
                  <li>
                    <a href={link}>{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;

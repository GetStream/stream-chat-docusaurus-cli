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
    description: 'Build a video calling web appplication for the browser.',
  },
  {
    sdk: 'React Native',
    link: 'react-native/basics/tutorial',
    description:
      'Build an video calling mobile app that works on both iOS and Android.',
  },
  {
    sdk: 'iOS',
    link: 'ios/basics/tutorial',
    description: 'Build an iOS video calling app using Swift.',
  },
  {
    sdk: 'Android',
    link: 'android/basics/tutorial',
    description:
      'Build an Android video calling app using Kotlin and Jetpack Compose.',
  },
  {
    sdk: 'Flutter',
    link: 'flutter/basics/tutorial',
    description: 'Build a cross-platform video calling app using Flutter.',
  },
  {
    sdk: 'Angular',
    link: 'angular/basics/tutorial',
    description: "Build a video calling app using Google's Angular framework.",
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
    name: 'Ringing calls',
    link: 'TODO',
    description:
      'Ringing calls are a great way to let your users know that someone is trying to reach them, emulating the traditional phone call experience.',
    icon: 'TODO',
    links: [
      { name: 'iOS', link: 'TODO' },
      { name: 'Android', link: 'TODO' },
      { name: 'Flutter', link: 'TODO' },
      { name: 'React Native', link: 'TODO' },
      { name: 'React', link: 'TODO' },
      { name: 'React Native', link: 'TODO' },
    ],
  },
  {
    name: 'Meeting calls',
    link: 'TODO',
    description:
      'Implement collaborative meetings with multiple participants, deep linking, screen sharing, and more.',
    icon: 'TODO',
    links: [
      { name: 'iOS', link: 'TODO' },
      { name: 'Android', link: 'TODO' },
      { name: 'Flutter', link: 'TODO' },
      { name: 'React Native', link: 'TODO' },
      { name: 'React', link: 'TODO' },
      { name: 'React Native', link: 'TODO' },
    ],
  },
  {
    name: 'Edge network',
    link: 'TODO',
    description:
      'Stream runs an edge network of servers around the world. This optimizes the latency and reliability of the video calling experience. Zoom and Agora have a similar architecture.',
    icon: 'TODO',
  },
  {
    name: 'Screen sharing',
    description:
      'Our platform allows call participants to shair to share your screen along with their video.',
    icon: 'TODO',
    links: [
      { name: 'React', link: 'TODO' },
      { name: 'Angular', link: 'TODO' },
    ],
  },
  {
    name: 'Livestreaming',
    link: 'TODO',
    description:
      'Publish the combined video and audio of all participants through RTMP in real time.',
    icon: 'TODO',
  },
  {
    name: 'Broadcasting',
    link: 'TODO',
    description:
      'Broadcast the combined video and audio of all participants to a storage of your choice in HLS format.',
    icon: 'TODO',
  },
  {
    name: 'Geofencing',
    link: 'TODO',
    description:
      'You can restrict where your traffic is replayed on the video edge network. For example, you can set a policy to only use servers in Canada, or the EU depending your data requirements',
    icon: 'TODO',
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

export const Home = () => {
  const { siteConfig = {} } = useDocusaurusContext();
  const globalData = useGlobalData();

  return (
    <Layout description="TODO" title={`TODO`}>
      <main>
        <div className={styles.stageContainer}>
          <div className={styles.stageDescription}>
            <h2>Get Started</h2>
            <p>
              Get some quick taste of the capabilities of the Stream video call
              platfom with our interactive tutorials.
            </p>
          </div>
          <div className={styles.stageBlocks}>
            {TUTORIALS.map(({ sdk, link, description }) => (
              <a href={link} className={styles.stageBlock}>
                <h3>{sdk}</h3>
                <p>{description}</p>
                <p className={styles.startTutorial}>Start tutorial</p>
              </a>
            ))}
          </div>
        </div>
        <div className={styles.stageContainer}>
          <div className={styles.stageDescription}>
            <h2>Features Overview</h2>
          </div>

          <div class={styles.stageBlocks}>
            {FEATURES.map(({ name, link, description, icon, links }) => (
              <div className={styles.stageBlockWide}>
                <h3>{name}</h3>
                <p>{description}</p>
                <ul className={styles.linkList}>
                  {links?.map(({ name, link }) => (
                    <li>
                      <a href={link}>{name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
        <hr />
        <h2>Streaming and broadcasting</h2>
        <p>
          Build iteractive video experiences with our streaming and
          broadcasting.
        </p>
        <ul>
          <li>
            <a href="TODO">Streaming compared to broadcasting</a>
          </li>
          <li>
            <a href="TODO">Live streaming</a>
          </li>
          <li>
            <a href="TODO">Broadcasting</a>
          </li>
        </ul>
        <hr />
        <h2>Calls content review and analysis</h2>
        <p>
          Audit, troubleshoot and analyze the conversations happening at your
          platform.
        </p>
        <ul>
          <li>
            <a href="TODO">Overview</a>
          </li>
          <li>
            <a href="TODO">Reference</a>
          </li>
        </ul>
        <hr />
        <h2>Call troubleshooting</h2>
        <p>Pinpoint and fix issues with your video calls.</p>
        <ul>
          <li>
            <a href="TODO">Overview</a>
          </li>
          <li>
            <a href="TODO">Reference</a>
          </li>
        </ul>
      </main>
    </Layout>
  );
};

export default Home;

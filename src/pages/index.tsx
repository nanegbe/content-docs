import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Developer Documentation</span>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.btnPrimary)}
              to="/docs/getting-started/introduction">
              Get Started →
            </Link>
            <Link
              className={clsx('button button--lg', styles.btnOutline)}
              to="/docs/api/authentication">
              API Reference
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  link: string;
};

const features: FeatureItem[] = [
  {
    icon: '📊',
    title: 'Market Prices',
    description:
      'Access real-time commodity prices across markets. Help farmers make informed selling decisions with up-to-date pricing data.',
    link: '/docs/api/commodities',
  },
  {
    icon: '🌦️',
    title: 'Weather Updates',
    description:
      'Deliver localized weather forecasts and alerts. Enable farmers to plan planting, irrigation, and harvesting activities.',
    link: '/docs/getting-started/introduction',
  },
  {
    icon: '🌱',
    title: 'Agronomic Advice',
    description:
      'Provide crop-specific guidance, pest management tips, and best farming practices tailored to local conditions.',
    link: '/docs/getting-started/introduction',
  },
  // {
  //   icon: '🔐',
  //   title: 'Authentication & API Keys',
  //   description:
  //     'Secure your integration with JWT tokens and API keys. Full auth lifecycle management out of the box.',
  //   link: '/docs/api/authentication',
  // },
  // {
  //   icon: '💳',
  //   title: 'Payments & Plans',
  //   description:
  //     'Manage subscription plans and process payments seamlessly with integrated Paystack support.',
  //   link: '/docs/api/plans',
  // },
  // {
  //   icon: '🔔',
  //   title: 'Webhooks',
  //   description:
  //     'Receive real-time event notifications for payment confirmations and system events via secure webhooks.',
  //   link: '/docs/api/webhooks',
  // },
];

function Feature({icon, title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureCard}>
        <span className={styles.featureIcon}>{icon}</span>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
        <span className={styles.featureLink}>Learn more →</span>
      </Link>
    </div>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className={styles.quickLinksGrid}>
          <Link to="/docs/getting-started/quick-start" className={styles.quickLinkCard}>
            <span className={styles.quickLinkIcon}>⚡</span>
            <div>
              <strong>Quick Start</strong>
              <span>Make your first API call in 5 minutes</span>
            </div>
          </Link>
          <Link to="/docs/api/authentication" className={styles.quickLinkCard}>
            <span className={styles.quickLinkIcon}>🔑</span>
            <div>
              <strong>Authentication</strong>
              <span>Set up API keys and JWT tokens</span>
            </div>
          </Link>
          <Link to="/docs/api/commodities" className={styles.quickLinkCard}>
            <span className={styles.quickLinkIcon}>📡</span>
            <div>
              <strong>API Reference</strong>
              <span>Explore all available endpoints</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Developer Documentation"
      description="Agri-Content API documentation — market prices, weather updates, and agronomic advice for farmers.">
      <HomepageHeader />
      <main>
        <QuickLinks />
        <section className={styles.features}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>
                What You Can Build
              </Heading>
              <p className={styles.sectionSubtitle}>
                Everything you need to integrate agricultural intelligence into your applications.
              </p>
            </div>
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

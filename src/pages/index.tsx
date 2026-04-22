import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
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

// ─── Types ────────────────────────────────────────────────────────────────────
interface MarketItem {
  id: string;
  name: string;
  symbol: string;
  price: number;
  currency: string;
  unit: string;
  change: number;
  changePct: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_DATA: MarketItem[] = [
  { id: '1', name: 'Maize', symbol: 'MZE', price: 320, currency: 'GHS', unit: 'bag', change: +5.50, changePct: +1.75 },
  { id: '2', name: 'Rice (Local)', symbol: 'RCL', price: 580, currency: 'GHS', unit: 'bag', change: -8.00, changePct: -1.36 },
  { id: '3', name: 'Beans', symbol: 'BNS', price: 480, currency: 'GHS', unit: 'bag', change: +12.00, changePct: +2.56 },
  { id: '4', name: 'Cassava', symbol: 'CSV', price: 95, currency: 'GHS', unit: 'kg', change: -1.50, changePct: -1.55 },
  { id: '5', name: 'Plantain', symbol: 'PLT', price: 75, currency: 'GHS', unit: 'bunch', change: +3.00, changePct: +4.17 },
  { id: '6', name: 'Tomatoes', symbol: 'TMT', price: 140, currency: 'GHS', unit: 'crate', change: -5.00, changePct: -3.45 },
  { id: '7', name: 'Groundnuts', symbol: 'GND', price: 260, currency: 'GHS', unit: 'bag', change: +7.00, changePct: +2.77 },
  { id: '8', name: 'Yam', symbol: 'YAM', price: 45, currency: 'GHS', unit: 'tuber', change: +2.00, changePct: +4.65 },
  { id: '9', name: 'Sorghum', symbol: 'SRG', price: 295, currency: 'GHS', unit: 'bag', change: -4.50, changePct: -1.50 },
  { id: '10', name: 'Palm Oil', symbol: 'PLO', price: 520, currency: 'GHS', unit: 'drum', change: +15.00, changePct: +2.97 },
];

function simulatePriceUpdate(items: MarketItem[]): MarketItem[] {
  return items.map(item => {
    const delta = (Math.random() - 0.48) * item.price * 0.015;
    const newPrice = Math.max(1, +(item.price + delta).toFixed(2));
    const change = +(newPrice - item.price + item.change * 0.9).toFixed(2);
    const changePct = +((change / newPrice) * 100).toFixed(2);
    return { ...item, price: newPrice, change, changePct };
  });
}

// ─── Single ticker chip ───────────────────────────────────────────────────────
function TickerChip({ item, flash }: { item: MarketItem; flash: boolean }) {
  const up = item.changePct >= 0;
  const arrow = up ? '↑' : '↓';
  // Use the site's green (#4ade80 / #22c55e) for up, red for down
  const changeColor = up ? '#4ade80' : '#f87171';
  const flashBg = up ? 'rgba(74,222,128,0.14)' : 'rgba(248,113,113,0.14)';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 18px',
        borderRadius: '4px',
        background: flash ? flashBg : 'transparent',
        transition: 'background 0.4s ease',
        fontFamily: '"JetBrains Mono", "IBM Plex Mono", "Courier New", monospace',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {/* Symbol badge */}
      <span style={{
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: '#4ade80',
        background: 'rgba(74,222,128,0.08)',
        padding: '2px 6px',
        borderRadius: '3px',
        border: '1px solid rgba(74,222,128,0.2)',
      }}>
        {item.symbol}
      </span>

      {/* Name */}
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#d1fae5', letterSpacing: '0.02em' }}>
        {item.name}
      </span>

      {/* Price */}
      <span style={{ fontSize: '14px', fontWeight: 700, color: '#f0fdf4', letterSpacing: '0.03em' }}>
        {item.currency} {item.price.toFixed(2)}
        <span style={{ fontSize: '10px', fontWeight: 400, color: '#6b7280', marginLeft: 3 }}>
          /{item.unit}
        </span>
      </span>

      {/* Change */}
      <span style={{ fontSize: '12px', fontWeight: 700, color: changeColor, display: 'flex', alignItems: 'center', gap: '2px' }}>
        {arrow} {Math.abs(item.changePct).toFixed(2)}%
      </span>

      {/* Separator */}
      <span style={{ color: 'rgba(74,222,128,0.2)', fontSize: '18px', lineHeight: 1 }}>•</span>
    </span>
  );
}

// ─── Market Ticker ────────────────────────────────────────────────────────────
function MarketTicker({ speed = 60 }: { speed?: number }) {
  const [items, setItems] = useState<MarketItem[]>(MOCK_DATA);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Simulate live updates every 4 s
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const updated = simulatePriceUpdate(prev);
        const changed = updated
          .filter((u, i) => u.price !== prev[i].price)
          .map(u => u.id);
        if (changed.length) {
          setFlashIds(new Set(changed));
          setTimeout(() => setFlashIds(new Set()), 600);
        }
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // RAF scroll loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (timestamp: number) => {
      if (!paused) {
        if (lastTimeRef.current !== null) {
          const dt = (timestamp - lastTimeRef.current) / 1000;
          posRef.current -= speed * dt;
          const halfWidth = track.scrollWidth / 2;
          if (Math.abs(posRef.current) >= halfWidth) {
            posRef.current += halfWidth;
          }
          track.style.transform = `translateX(${posRef.current}px)`;
        }
        lastTimeRef.current = timestamp;
      } else {
        lastTimeRef.current = null;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [paused, speed]);

  const displayed = [...items, ...items];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        width: '100%',
        overflow: 'hidden',
        // Matches the site's dark background with a subtle green tint
        background: 'linear-gradient(90deg, #0a0f0d 0%, #0d1510 50%, #0a0f0d 100%)',
        borderTop: '1px solid rgba(74,222,128,0.12)',
        borderBottom: '1px solid rgba(74,222,128,0.12)',
        position: 'relative',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Fade masks */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
        background: 'linear-gradient(to right, #0a0f0d, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
        background: 'linear-gradient(to left, #0a0f0d, transparent)',
        pointerEvents: 'none',
      }} />

      {/* LIVE badge */}
      <div style={{
        position: 'absolute', left: '16px', zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '6px',
        background: '#0a0f0d', padding: '0 10px 0 0',
      }}>
        <span style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#4ade80',
          boxShadow: '0 0 6px #4ade80',
          display: 'inline-block',
          animation: 'ticker-pulse 1.5s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em',
          color: '#4ade80',
          fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
          textTransform: 'uppercase',
        }}>LIVE</span>
      </div>

      {/* Scrolling track */}
      <div style={{ paddingLeft: '100px', display: 'flex', alignItems: 'center', width: '100%' }}>
        <div
          ref={trackRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {displayed.map((item, idx) => (
            <TickerChip
              key={`${item.id}-${idx}`}
              item={item}
              flash={flashIds.has(item.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

// ─── Feature cards ────────────────────────────────────────────────────────────
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
    link: '/docs/market-price/overview',
  },
  {
    icon: '🌦️',
    title: 'Weather Updates',
    description:
      'Deliver localized weather forecasts and alerts. Enable farmers to plan planting, irrigation, and harvesting activities.',
    link: '/docs/weather/overview',
  },
  {
    icon: '🌱',
    title: 'Agronomic Advice',
    description:
      'Provide crop-specific guidance, pest management tips, and best farming practices tailored to local conditions.',
    link: '/docs/agronomics/overview',
  },
];

function Feature({ icon, title, description, link }: FeatureItem) {
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

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Developer Documentation"
      description="E-Content API documentation — market prices, weather updates, and agronomic advice for farmers.">
      <HomepageHeader />
      <main>
        <MarketTicker speed={60} />
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

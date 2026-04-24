import React, { useState, useCallback, useMemo } from 'react';
import styles from './ApiCodeToggler.module.css';

interface InfoBlockProps {
    title?: string;
    children: string;
    type?: 'steps' | 'diagram' | 'terminal' | 'info';
}

export default function InfoBlock({
    title = 'INFO',
    children,
    type = 'info'
}: InfoBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(children).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [children]);

    const renderedLines = useMemo(() => {
        return children.split('\n').map((line, i) => ({
            num: i + 1,
            text: line
        }));
    }, [children]);

    return (
        <div className={styles.wrap}>
            <div className={styles.panel}>
                <div className={styles.topbar}>
                    <span className={styles.label}>{title}</span>
                    <div className={styles.controls}>
                        <button
                            className={`${styles.iconBtn} ${copied ? styles.copied : ''}`}
                            onClick={handleCopy}
                            title="Copy"
                        >
                            {copied ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={styles.codeBlock}>
                    <div className={styles.codeLines}>
                        {renderedLines.map((line) => (
                            <div key={line.num} className={styles.codeLine}>
                                <span className={styles.lineNum}>{line.num}</span>
                                <span className={styles.lineCode}>{line.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

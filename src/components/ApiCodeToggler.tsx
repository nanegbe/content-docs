import React, { useState, useCallback, useMemo } from 'react';
import styles from './ApiCodeToggler.module.css';
import { highlight, TerminalLanguage } from '../utils/highlighter';

interface ApiCodeTogglerProps {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    body?: Record<string, any>;
    token?: string;
    urlBase?: string;
    label?: string;
    isFormData?: boolean;
    showAuth?: boolean;
}

type Language = 'curl' | 'python' | 'node' | 'php';

const DEFAULT_TOKEN = "eC_...";
const DEFAULT_URL_BASE = "https://api.e-Content.com/api/v1";

export default function ApiCodeToggler({
    method = 'POST',
    endpoint,
    body,
    token = DEFAULT_TOKEN,
    urlBase = DEFAULT_URL_BASE,
    label = "AUTHENTICATED REQUEST",
    isFormData = false,
    showAuth = true
}: ApiCodeTogglerProps) {

    const [lang, setLang] = useState<Language>('curl');
    const [copied, setCopied] = useState(false);

    const fullUrl = `${urlBase}${endpoint}`;

    const snippets = useMemo(() => {
        let curl = `curl -X ${method} ${fullUrl}`;

        if (showAuth) {
            curl += ` \\\n  -H "Authorization: Bearer ${token}"`;
        }

        if (isFormData) {
            if (body) {
                Object.entries(body).forEach(([key, value]) => {
                    curl += ` \\\n  -F "${key}=${value}"`;
                });
            }
        } else {
            curl += ` \\\n  -H "Content-Type: application/json"`;
            if (body) {
                curl += ` \\\n  -d '${JSON.stringify(body, null, 2)}'`;
            }
        }

        const python = isFormData
            ? `import requests\n\nurl = "${fullUrl}"\n${showAuth ? `headers = {\n    "Authorization": "Bearer ${token}"\n}\n` : ''}files = ${JSON.stringify(body, null, 4)}\n\nresponse = requests.${method.toLowerCase()}(url, ${showAuth ? 'headers=headers, ' : ''}files=files)\nprint(response.json())`
            : `import requests\n\nurl = "${fullUrl}"\n${showAuth ? `headers = {\n    "Authorization": "Bearer ${token}",\n    "Content-Type": "application/json"\n}` : `headers = {\n    "Content-Type": "application/json"\n}`}\n${body ? `payload = ${JSON.stringify(body, null, 4)}\n\n` : ''}response = requests.${method.toLowerCase()}(url, headers=headers${body ? ', json=payload' : ''})\nprint(response.json())`;

        const node = isFormData
            ? `const formData = new FormData();\n${body ? Object.entries(body).map(([k, v]) => `formData.append("${k}", "${v}");`).join('\n') : ''}\n\nconst response = await fetch(\n  "${fullUrl}",\n  {\n    method: "${method}",\n${showAuth ? `    headers: {\n      "Authorization": \`Bearer ${token}\`\n    },\n` : ''}    body: formData\n  }\n);\n\nconst data = await response.json();\nconsole.log(data);`
            : `const response = await fetch(\n  "${fullUrl}",\n  {\n    method: "${method}",\n    headers: {\n${showAuth ? `      "Authorization": \`Bearer ${token}\`,\n` : ''}      "Content-Type": "application/json"\n    }${body ? `,\n    body: JSON.stringify(${JSON.stringify(body, null, 6).trim()})` : ''}\n  }\n);\n\nconst data = await response.json();\nconsole.log(data);`;

        const php = isFormData
            ? `<?php\n\n$ch = curl_init();\n\ncurl_setopt_array($ch, [\n  CURLOPT_URL => "${fullUrl}",\n  CURLOPT_RETURNTRANSFER => true,\n  CURLOPT_CUSTOMREQUEST => "${method}",\n${showAuth ? `  CURLOPT_HTTPHEADER => [\n    "Authorization: Bearer ${token}"\n  ],\n` : ''}  CURLOPT_POSTFIELDS => [\n${body ? Object.entries(body).map(([k, v]) => `    "${k}" => "${v}"`).join(',\n') : ''}\n  ]\n]);\n\n$result = curl_exec($ch);\ncurl_close($ch);\necho $result;`
            : `<?php\n\n$ch = curl_init();\n\ncurl_setopt_array($ch, [\n  CURLOPT_URL => "${fullUrl}",\n  CURLOPT_RETURNTRANSFER => true,\n  CURLOPT_CUSTOMREQUEST => "${method}",\n${showAuth ? `  CURLOPT_HTTPHEADER => [\n    "Authorization: Bearer ${token}",\n    "Content-Type": "application/json"\n  ]` : `  CURLOPT_HTTPHEADER => [\n    "Content-Type: application/json"\n  ]`}${body ? `,\n  CURLOPT_POSTFIELDS => json_encode(${JSON.stringify(body, null, 4).trim()})` : ''}\n]);\n\n$result = curl_exec($ch);\ncurl_close($ch);\necho $result;`;

        return { curl, python, node, php };
    }, [method, fullUrl, body, token, isFormData, showAuth]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(snippets[lang]).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [lang, snippets]);

    const renderedLines = useMemo(() => {
        return snippets[lang].split('\n').map((line, i) => ({
            num: i + 1,
            html: highlight(line, lang as TerminalLanguage)
        }));
    }, [lang, snippets]);

    return (
        <div className={styles.wrap}>
            <div className={styles.panel}>
                <div className={styles.topbar}>
                    <span className={styles.label}>{label}</span>
                    <div className={styles.controls}>
                        <div className={styles.langSelect}>
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value as Language)}
                            >
                                <option value="curl">cURL</option>
                                <option value="python">Python</option>
                                <option value="node">Node.js</option>
                                <option value="php">PHP</option>
                            </select>
                            <span className={styles.chevron}>&#8645;</span>
                        </div>
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
                                <span
                                    className={styles.lineCode}
                                    dangerouslySetInnerHTML={{ __html: line.html }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

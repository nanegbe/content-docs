export type TerminalLanguage = 'curl' | 'python' | 'node' | 'php' | 'bash';

export function highlight(code: string, lang: TerminalLanguage): string {
    // Escape HTML special characters
    let html = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    if (lang === 'curl' || lang === 'bash') {
        // Keywords
        html = html.replace(/\b(curl|GET|POST|PUT|DELETE|Bearer)\b/g, '<span class="token keyword">$1</span>');
        // Flags
        html = html.replace(/(-X|-H|-d|-F|--data|--header)/g, '<span class="token property">$1</span>');
        // URLs
        html = html.replace(/(https?:\/\/[^\s\\]+)/g, '<span class="token url">$1</span>');
        // Strings in quotes
        html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>');
    } else if (lang === 'python') {
        html = html.replace(/\b(import|from|as|def|return|if|else|print|requests|url|headers|files|payload|response|json)\b/g, '<span class="token keyword">$1</span>');
        html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>');
        html = html.replace(/\b(True|False|None)\b/g, '<span class="token keyword">$1</span>');
    } else if (lang === 'node') {
        html = html.replace(/\b(const|let|var|await|fetch|method|headers|body|JSON|stringify|console|log|new|FormData|append|request|response)\b/g, '<span class="token keyword">$1</span>');
        html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;|`.*?`)/g, '<span class="token string">$1</span>');
    } else if (lang === 'php') {
        html = html.replace(/\b(php|curl_init|curl_setopt_array|curl_exec|curl_close|echo|CURLOPT_URL|CURLOPT_RETURNTRANSFER|CURLOPT_CUSTOMREQUEST|CURLOPT_HTTPHEADER|CURLOPT_POSTFIELDS)\b/g, '<span class="token keyword">$1</span>');
        html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>');
        html = html.replace(/(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, '<span class="token variable">$1</span>');
    }

    return html;
}

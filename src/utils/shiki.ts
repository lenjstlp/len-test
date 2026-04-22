import {
  createHighlighter,
  type BuiltinLanguage,
  type BuiltinTheme,
} from 'shiki';

const SHIKI_THEME: BuiltinTheme = 'github-dark-default';
const SUPPORTED_LANGUAGES = [
  'html',
  'css',
  'scss',
  'javascript',
  'typescript',
  'jsx',
  'tsx',
  'json',
  'bash',
  'vue',
] as const satisfies BuiltinLanguage[];

const languageAliasMap: Record<string, BuiltinLanguage> = {
  html: 'html',
  css: 'css',
  scss: 'scss',
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  json: 'json',
  sh: 'bash',
  shell: 'bash',
  bash: 'bash',
  vue: 'vue',
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const highlighter = createHighlighter({
  themes: [SHIKI_THEME],
  langs: [...SUPPORTED_LANGUAGES],
});

export const normalizeCodeLanguage = (language: string) =>
  languageAliasMap[language.toLowerCase()] ?? null;

const renderPlainCode = (code: string) => {
  const content = code
    .split('\n')
    .map((line) => `<span class="line">${escapeHtml(line) || ' '}</span>`)
    .join('');

  return `<pre class="shiki github-dark-default" style="background-color:#08111a;color:#eff5fa" tabindex="0"><code>${content}</code></pre>`;
};

export const renderHighlightedCode = async (code: string, language: string) => {
  const normalizedLanguage = normalizeCodeLanguage(language);

  if (!normalizedLanguage) {
    return renderPlainCode(code);
  }

  const instance = await highlighter;

  return instance.codeToHtml(code, {
    lang: normalizedLanguage,
    theme: SHIKI_THEME,
  });
};

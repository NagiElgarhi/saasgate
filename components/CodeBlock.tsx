
import React, { useState } from 'react';

interface CodeBlockProps {
  language?: string;
  code: string;
  partId?: string;
}

// Function to get styles based on language
const getLanguageStyles = (language?: string) => {
  const lang = language?.toLowerCase() || 'text';
  switch (lang) {
    case 'javascript':
    case 'js':
      return {
        container: 'bg-yellow-50 border-yellow-200',
        header: 'bg-yellow-100 border-b-yellow-200',
        langTag: 'bg-yellow-200 text-yellow-800',
        codeText: 'text-yellow-900',
      };
    case 'jsx':
    case 'react':
      return {
        container: 'bg-sky-50 border-sky-200',
        header: 'bg-sky-100 border-b-sky-200',
        langTag: 'bg-sky-200 text-sky-800',
        codeText: 'text-sky-900',
      };
    case 'python':
    case 'py':
      return {
        container: 'bg-blue-50 border-blue-200',
        header: 'bg-blue-100 border-b-blue-200',
        langTag: 'bg-blue-200 text-blue-800',
        codeText: 'text-blue-900',
      };
    case 'sql':
      return {
        container: 'bg-indigo-50 border-indigo-200',
        header: 'bg-indigo-100 border-b-indigo-200',
        langTag: 'bg-indigo-200 text-indigo-800',
        codeText: 'text-indigo-900',
      };
    case 'yaml':
    case 'yml':
      return {
        container: 'bg-rose-50 border-rose-200',
        header: 'bg-rose-100 border-b-rose-200',
        langTag: 'bg-rose-200 text-rose-800',
        codeText: 'text-rose-900',
      };
    case 'html':
      return {
        container: 'bg-orange-50 border-orange-200',
        header: 'bg-orange-100 border-b-orange-200',
        langTag: 'bg-orange-200 text-orange-800',
        codeText: 'text-orange-900',
      };
    case 'bash':
    case 'sh':
      return {
        container: 'bg-gray-200 border-gray-300',
        header: 'bg-gray-300 border-b-gray-400',
        langTag: 'bg-gray-400 text-gray-900',
        codeText: 'text-gray-900',
      };
    default:
      return {
        container: 'bg-gray-100 border-gray-300',
        header: 'bg-gray-200 border-b-gray-300',
        langTag: 'bg-gray-300 text-gray-800',
        codeText: 'text-gray-900',
      };
  }
};


const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, partId }) => {
  const [copied, setCopied] = useState(false);
  const styles = getLanguageStyles(language);
  const isLtr = false; // All content is now RTL

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback or error message could be shown here
    }
  };

  return (
    <div className={`my-6 rounded-lg shadow-md border overflow-hidden ${styles.container}`}>
      <div className={`flex items-center justify-between p-2 border-b ${styles.header}`}>
        {language ? (
          <span className={`px-2 py-1 rounded-md text-base font-bold select-none ${styles.langTag}`}>
            {language.toUpperCase()}
          </span>
        ) : <div />}
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-base font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="نسخ الكود"
        >
          {copied ? 'تم النسخ!' : 'نسخ'}
        </button>
      </div>
      <pre
        className={`p-4 whitespace-pre-wrap break-all font-code leading-relaxed text-left ${styles.codeText}`}
        style={{ fontSize: `calc(0.875rem * var(--font-size-multiplier, 1))` }}
      >
        <code dir="ltr">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;

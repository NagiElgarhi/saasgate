

import React, { useState } from 'react';
import { CodeExplanationItem } from '../types';

interface CodeExplanationBlockProps {
  language?: string;
  code: string;
  explanations: CodeExplanationItem[];
  codeTitle?: string;
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


const CodeExplanationBlock: React.FC<CodeExplanationBlockProps> = ({ language, code, explanations, codeTitle, partId }) => {
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
    }
  };

  const codeLines = code.split('\n');

  return (
    <div className="flex flex-col md:flex-row my-6 bg-stone-50 rounded-lg shadow-lg border border-stone-200 overflow-hidden">
      {/* Explanation Side (Now first, so it will be on the RIGHT in RTL) */}
      <div 
        className={`w-full md:w-1/2 p-4 bg-stone-100 border-stone-200 ${isLtr ? 'md:border-r-2' : 'md:border-l-2'}`}
        dir={isLtr ? 'ltr' : undefined}
      >
        <h4
          className="font-semibold text-amber-700 mb-4 border-b border-stone-200 pb-2"
          style={{ fontSize: `calc(1.25rem * var(--font-size-multiplier, 1))` }}
        >
          {isLtr ? 'Code Explanation' : 'شرح الكود'}
        </h4>
        <div className="space-y-4">
          {explanations.map((item, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 w-20 text-center">
                <span className="inline-block bg-stone-200 text-amber-700 font-bold text-xs px-2 py-1 rounded">
                  {isLtr ? `Line(s) ${item.lines}` : `سطر ${item.lines}`}
                </span>
              </div>
              <p
                className={`flex-grow text-stone-700 leading-relaxed ${isLtr ? 'ml-4' : 'mr-4'}`}
                style={{ fontSize: `calc(1rem * var(--font-size-multiplier, 1))` }}
              >
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Side (Now second, so it will be on the LEFT in RTL) */}
      <div dir="ltr" className={`w-full md:w-1/2 flex flex-col border-t-2 md:border-t-0 ${styles.container}`}>
        <div className={`flex-shrink-0 flex items-center justify-between p-2 border-b ${styles.header}`}>
          <div className="flex items-center space-x-2">
             {language && (
                <span className={`px-2 py-1 rounded-md text-xs font-bold select-none ${styles.langTag}`}>
                  {language.toUpperCase()}
                </span>
              )}
               {codeTitle && <span className="text-gray-700 font-semibold text-sm">{codeTitle}</span>}
          </div>
           <button
              onClick={handleCopy}
              className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-label="نسخ الكود"
            >
              {copied ? 'تم النسخ!' : 'نسخ'}
            </button>
        </div>
        <div className="flex-grow p-4 text-left">
          <pre
            className={`font-code leading-relaxed ${styles.codeText}`}
            style={{ fontSize: `calc(0.875rem * var(--font-size-multiplier, 1))` }}
          >
            {codeLines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-right pr-4 text-gray-400 select-none">{index + 1}</span>
                <code className="flex-1 whitespace-pre-wrap break-all">{line}</code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeExplanationBlock;

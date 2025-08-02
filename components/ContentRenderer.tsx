

import React from 'react';
import { ContentItem, ContentType, DefinitionListItem } from '../types';
import CodeBlock from './CodeBlock';
import CodeExplanationBlock from './CodeExplanationBlock';
import AuthFlowProject from './projects/AuthFlowProject';
import ContactFormProject from './projects/ContactFormProject';
import DigitalProductProject from './projects/DigitalProductProject';
import PaymentGatewayProject from './projects/PaymentGatewayProject';

interface ContentRendererProps {
  item: ContentItem;
  editMode?: boolean;
  onUpdate?: (newPartialData: Partial<ContentItem>) => void;
  partId?: string;
}

// A curated list of relevant, high-quality images from Unsplash
const preselectedImages = [
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop&q=80', // Code on screen
  'https://images.unsplash.com/photo-1517694712202-1428bc3835b3?w=600&h=400&fit=crop&q=80', // Laptop with code
  'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop&q=80', // Abstract tech lines
  'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&h=400&fit=crop&q=80', // Developer setup
  'https://images.unsplash.com/photo-1516116216624-53e6973bea12?w=600&h=400&fit=crop&q=80', // Server racks
  'https://images.unsplash.com/photo-1580894908361-967195033215?w=600&h=400&fit=crop&q=80', // Team working on computers
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&q=80', // React logo
  'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&h=400&fit=crop&q=80', // Database diagram
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop&q=80', // Network/API connections
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80', // Matrix-like code
  'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=600&h=400&fit=crop&q=80', // Flowchart on screen
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop&q=80', // Woman coding
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&q=80', // Code close-up
  'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?w=600&h=400&fit=crop&q=80', // Padlock, security concept
  'https://images.unsplash.com/photo-1614064548237-02f9d3ed9486?w=600&h=400&fit=crop&q=80'  // File folders, upload concept
];

// Simple hash function to get a consistent index from a string
const getHashFromString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ item, editMode, onUpdate, partId }) => {
  const isLtr = false; // All content is now RTL
  
  const baseFontSizeStyle = (baseRem: string): React.CSSProperties => ({
    fontSize: `calc(${baseRem} * var(--font-size-multiplier, 1))`,
  });

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    onUpdate?.({ text: e.currentTarget.innerHTML });
  };
  
  const handleListBlur = (e: React.FocusEvent<HTMLLIElement>, index: number) => {
    if (!item.items) return;
    const newItems = [...item.items];
    newItems[index] = e.currentTarget.innerHTML;
    onUpdate?.({ items: newItems });
  };
  
  const handleDefListBlur = (e: React.FocusEvent<HTMLElement>, index: number, field: 'term' | 'definition') => {
    if (!item.definitionItems) return;
    const newItems = [...item.definitionItems];
    newItems[index] = { ...newItems[index], [field]: e.currentTarget.innerHTML };
    onUpdate?.({ definitionItems: newItems });
  };

  const commonEditableProps = {
    contentEditable: editMode,
    suppressContentEditableWarning: true,
  };

  switch (item.type) {
    case ContentType.HEADING1:
      return <h1 {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('2.25rem')} className={`text-4xl font-bold text-stone-900 mt-8 mb-4 ${isLtr ? 'text-left' : ''}`} dir={isLtr ? 'ltr' : undefined} dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
    case ContentType.HEADING2:
      return <h2 {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('1.875rem')} className={`text-3xl font-bold text-stone-800 mt-8 mb-4 border-b-2 border-stone-300 pb-2 ${isLtr ? 'text-left' : ''}`} dir={isLtr ? 'ltr' : undefined} dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
    case ContentType.HEADING3:
      return <h3 {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('1.5rem')} className={`text-2xl font-semibold text-stone-900 mt-6 mb-3 ${isLtr ? 'text-left' : ''}`} dir={isLtr ? 'ltr' : undefined} dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
    case ContentType.HEADING4:
      return <h4 {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('1.25rem')} className={`text-xl font-bold text-stone-900 mt-4 mb-2 ${isLtr ? 'text-left' : ''}`} dir={isLtr ? 'ltr' : undefined} dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
    case ContentType.PARAGRAPH:
      return <p {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('1.125rem')} className={`my-4 text-stone-700 leading-relaxed ${isLtr ? 'text-left' : 'text-justify'}`} dir={isLtr ? 'ltr' : undefined} dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
    case ContentType.LIST_UNORDERED:
      return (
        <ul style={baseFontSizeStyle('1.125rem')} className={`my-4 list-disc list-outside space-y-2 text-stone-700 ${isLtr ? 'ml-6 text-left' : 'mr-6'}`} dir={isLtr ? 'ltr' : undefined}>
          {item.items?.map((li, index) => <li key={index} {...commonEditableProps} onBlur={(e) => handleListBlur(e, index)} dangerouslySetInnerHTML={{ __html: li }} />)}
        </ul>
      );
    case ContentType.CODE_BLOCK:
      return <CodeBlock language={item.language} code={item.code || ''} partId={partId} />;
    case ContentType.CODE_EXPLANATION:
      if (!item.explanations || !item.code) return null;
      return (
        <CodeExplanationBlock
          language={item.language}
          code={item.code}
          explanations={item.explanations}
          codeTitle={item.codeTitle}
          partId={partId}
        />
      );
    case ContentType.DEFINITION_LIST:
      return (
        <dl className="my-4 space-y-3" dir={isLtr ? 'ltr' : undefined}>
          {item.definitionItems?.map((dl, index) => (
            <div key={index} className="bg-stone-200/60 p-4 rounded-md border border-stone-300 shadow">
              <dt {...commonEditableProps} onBlur={(e) => handleDefListBlur(e, index, 'term')} style={baseFontSizeStyle('1.125rem')} className={`font-bold text-amber-700 ${isLtr ? 'text-left' : ''}`} dangerouslySetInnerHTML={{ __html: dl.term }} />
              <dd {...commonEditableProps} onBlur={(e) => handleDefListBlur(e, index, 'definition')} style={baseFontSizeStyle('1.125rem')} className={`text-stone-800 mt-1 ${isLtr ? 'ml-4 text-left' : 'mr-4'}`} dangerouslySetInnerHTML={{ __html: dl.definition }} />
            </div>
          ))}
        </dl>
      );
    case ContentType.NOTE:
      return (
        <div className={`my-6 p-4 bg-amber-100 rounded-md shadow ${isLtr ? 'border-l-4 border-amber-400' : 'border-r-4 border-amber-400'}`} dir={isLtr ? 'ltr' : undefined}>
          {item.title && <p {...commonEditableProps} onBlur={(e) => onUpdate?.({ title: e.currentTarget.innerHTML })} style={baseFontSizeStyle('1.125rem')} className={`font-bold text-amber-800 mb-1 ${isLtr ? 'text-left' : ''}`} dangerouslySetInnerHTML={{ __html: item.title }} />}
          <p {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('1.125rem')} className={`text-amber-900 whitespace-pre-wrap ${isLtr ? 'text-left' : ''}`} dangerouslySetInnerHTML={{ __html: item.text || ''}} />
        </div>
      );
    case ContentType.LINK:
      return (
        <p style={baseFontSizeStyle('1.125rem')} className={`my-2 ${isLtr ? 'text-left' : ''}`} dir={isLtr ? 'ltr' : undefined}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 hover:underline">
            {item.text || item.url}
          </a>
        </p>
      );
    case ContentType.PREFORMATTED_TEXT:
      return (
        <pre {...commonEditableProps} onBlur={handleBlur} style={baseFontSizeStyle('0.875rem')} className={`my-4 p-4 bg-stone-200 text-stone-800 rounded-md whitespace-pre-wrap break-all font-code border border-stone-300 ${isLtr ? 'text-left' : ''}`} dir={isLtr ? 'ltr' : undefined} dangerouslySetInnerHTML={{ __html: item.text || '' }} />
      );
    case ContentType.IMAGE_PLACEHOLDER:
      const imageKey = item.alt || item.text || 'default';
      const imageUrl = preselectedImages[getHashFromString(imageKey) % preselectedImages.length];
      return (
        <figure className="my-6">
          <img 
            src={imageUrl}
            alt={item.alt || 'Illustrative image'} 
            width={item.width || 600} 
            height={item.height || 400} 
            className="rounded-md mx-auto shadow-lg" 
          />
          {item.alt && <figcaption {...commonEditableProps} onBlur={(e) => onUpdate?.({ alt: e.currentTarget.innerText })} className="text-center text-stone-600 text-sm mt-2 italic">{item.alt}</figcaption>}
        </figure>
      );
    case ContentType.PROJECT_AUTH_FLOW:
        return <div className="my-8"><AuthFlowProject /></div>;
    case ContentType.PROJECT_CONTACT_FORM:
        return <div className="my-8"><ContactFormProject /></div>;
    case ContentType.PROJECT_DIGITAL_PRODUCT:
        return <div className="my-8"><DigitalProductProject /></div>;
    case ContentType.PROJECT_PAYMENT_GATEWAY:
        return <div className="my-8"><PaymentGatewayProject /></div>;
    default:
      // This will give a warning in development if a new ContentType is added and not handled.
      // const _exhaustiveCheck: never = item.type;
      return null;
  }
};

export default ContentRenderer;

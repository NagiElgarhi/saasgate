
import React from 'react';

interface EditableWrapperProps {
  children: React.ReactNode;
  editMode: boolean;
  onCopy: () => void;
  onCut: () => void;
  onDelete: () => void;
  onPasteAfter: () => void;
  isPasteDisabled: boolean;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  editMode,
  onCopy,
  onCut,
  onDelete,
  onPasteAfter,
  isPasteDisabled,
}) => {
  if (!editMode) {
    return <>{children}</>;
  }

  return (
    <div className="relative group border-2 border-transparent hover:border-dashed hover:border-sky-300 my-1 py-1 rounded-md">
      {/* Action Toolbar */}
      <div 
        className="absolute -top-2 -right-2 z-10 p-1 bg-slate-700 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
        aria-label="Content item actions"
      >
        <button onClick={onCopy} title="نسخ" className="p-1.5 hover:bg-slate-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button onClick={onCut} title="قص" className="p-1.5 hover:bg-slate-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25h12M6 15.75h12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 5.25L12 1.5l3.75 3.75M8.25 18.75L12 22.5l3.75-3.75" />
          </svg>
        </button>
        <button onClick={onDelete} title="حذف" className="p-1.5 bg-red-600 hover:bg-red-500 rounded">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {/* The actual content */}
      {children}
      
      {/* Paste Button below the element */}
      <div className="w-full h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
         <button 
            onClick={onPasteAfter} 
            disabled={isPasteDisabled} 
            className="px-4 py-1 text-xs bg-sky-500 text-white rounded-full hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
          >
           الصق هنا
         </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { Book, Chapter, ChapterSection, SearchResult } from '../types';

interface SidebarProps {
  book: Book;
  activeSectionId?: string | null;
  onSelectSection: (selection: { partId: string; chapterId: string; sectionId: string; }) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: SearchResult[];
  onSearchResultClick: (result: SearchResult) => void;
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  book, 
  activeSectionId,
  onSelectSection,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchResultClick,
  isOpen,
  onClose,
  onGoHome,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  // This is the key change: flatten parts and chapters into one list
  const allChapters = useMemo(() => {
    return book.parts.flatMap(part => 
      part.chapters.map(chapter => ({ ...chapter, partId: part.id }))
    );
  }, [book]);

  const allSectionIds = useMemo(() => {
    return allChapters.flatMap(chapter => 
      chapter.sections.map(section => section.id)
    );
  }, [allChapters]);

  const { progressPercentage, remainingSections } = useMemo(() => {
    if (!allSectionIds || allSectionIds.length === 0) return { progressPercentage: 0, remainingSections: 0 };
    
    const currentIndex = activeSectionId ? allSectionIds.indexOf(activeSectionId) : -1;
    const completedSections = currentIndex >= 0 ? currentIndex + 1 : 0;
    
    const percentage = Math.round((completedSections / allSectionIds.length) * 100);
    const remaining = allSectionIds.length - completedSections;

    return { progressPercentage: percentage, remainingSections: remaining };
  }, [activeSectionId, allSectionIds]);


  // When a section is selected from outside (e.g., search or page nav), expand the correct chapter
  useEffect(() => {
    if (activeSectionId && isOpen) {
        const chapter = allChapters.find(c => c.sections.some(s => s.id === activeSectionId));
        if (chapter) {
            setSelectedChapterId(chapter.id);
        }
    }
  }, [activeSectionId, isOpen, allChapters]);

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapterId(prevId => (prevId === chapterId ? null : chapterId));
  };

  const handleSectionClick = (partId: string, chapterId: string, section: ChapterSection) => {
    onSelectSection({
        partId: partId,
        chapterId: chapterId,
        sectionId: section.id
    });
  };
  
  const handleSearchResultClick = (e: React.MouseEvent<HTMLButtonElement>, result: SearchResult) => {
    e.preventDefault();
    onSearchResultClick(result);
  };
  
  const getHeader = () => {
    return (
       <div className="p-4 sticky top-0 bg-stone-300 z-10 border-b border-stone-400 flex items-center justify-between gap-2">
         <button onClick={onGoHome} title="العودة للرئيسية" className="p-1 text-stone-600 hover:text-black hover:bg-stone-400 rounded-full flex-shrink-0">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
           </svg>
         </button>

        <div className="flex-grow flex items-center justify-center gap-2 min-w-0">
            <h2 className="text-xl font-semibold text-stone-900 text-center truncate" title={book.bookTitle}> 
              {book.bookTitle}
            </h2>
        </div>
        
        <button onClick={onClose} title="إغلاق الفهرس" className="p-1 text-stone-600 hover:text-black hover:bg-stone-400 rounded-full flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
       </div>
    );
  };

  const getSearchBar = () => (
     <div className="p-4 sticky top-[73px] bg-stone-300 z-10 border-b border-stone-400">
        <div className="relative">
          <input
            type="text"
            placeholder="بحث في الكتاب..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-stone-900 bg-stone-100 border-2 border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
             </svg>
          </div>
        </div>
      </div>
  );

  const getProgressTracker = () => (
     <div className="p-4 text-center border-t border-stone-400 bg-stone-300 sticky bottom-0 z-10">
        <div className="w-full bg-stone-200 rounded-full h-2.5 mb-2">
            <div className="bg-amber-500 h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
        </div>
        <p className="text-sm text-stone-700 font-semibold">{`أكملت ${progressPercentage}% من الكتاب. ${remainingSections} قسم متبقي.`}</p>
      </div>
  );

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 z-50 h-screen w-80 bg-stone-300 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'right-0' : '-right-full'}`}
      aria-hidden={!isOpen}
    >
      {getHeader()}
      {getSearchBar()}
      
      <div className="flex-1 overflow-y-auto">
        {searchQuery.length < 3 ? (
            // Display chapters list
             <nav className="p-4 text-right space-y-2">
                 {allChapters.map((chapter) => (
                    <div key={chapter.id}>
                        <button
                            onClick={() => handleChapterClick(chapter.id)}
                            className="w-full text-right p-2 rounded-md font-bold text-stone-800 hover:bg-stone-400 transition-colors flex justify-between items-center"
                        >
                            <span className="truncate">{chapter.chapterTitle}</span>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${selectedChapterId === chapter.id ? 'rotate-90' : 'rotate-0'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        {selectedChapterId === chapter.id && (
                            <ul className="mr-4 rtl:ml-4 rtl:mr-0 mt-1 border-r-2 border-amber-500 pr-4 rtl:border-l-2 rtl:border-r-0 rtl:pl-4">
                                {chapter.sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => handleSectionClick(chapter.partId, chapter.id, section)}
                                            className={`w-full text-right p-2 my-1 rounded-md text-sm transition-colors ${
                                                activeSectionId === section.id
                                                ? 'bg-amber-500 text-white font-bold'
                                                : 'text-stone-700 hover:bg-stone-400'
                                            }`}
                                        >
                                            <span className="truncate">{section.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                 ))}
             </nav>
        ) : (
            // Display search results
            <div className="p-4 space-y-2">
                {searchResults.length > 0 ? (
                    searchResults.map(({ part, chapter, section }) => (
                         <button 
                            key={section.id} 
                            onClick={(e) => handleSearchResultClick(e, { part, chapter, section })}
                            className="w-full p-3 bg-stone-100 rounded-lg text-right hover:bg-amber-100 border border-stone-200"
                        >
                            <p className="font-bold text-stone-900 truncate">{section.title}</p>
                            <p className="text-xs text-stone-500 truncate">{chapter.chapterTitle}</p>
                        </button>
                    ))
                ) : (
                    <p className="text-center text-stone-600 p-4">لا توجد نتائج بحث.</p>
                )}
            </div>
        )}
      </div>
      
      {getProgressTracker()}
    </aside>
  );
};

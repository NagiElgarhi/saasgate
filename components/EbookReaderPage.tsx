
import React, { useState, useEffect, useRef, useMemo } from 'react';
// Use the single comprehensive bookData.ts file
import { bookData as initialBookData } from '../constants/bookData'; 

import ContentRenderer from './ContentRenderer';
import { ChapterSection, Part, Chapter, ContentType, ContentItem, Book, SearchResult } from '../types';
import { Sidebar } from './Sidebar'; 
import ChatWidget from './ChatWidget';
import { usePagination, paginateContent } from '../hooks/usePagination';
import { EditableWrapper } from './EditableWrapper';


export const EbookReaderPage: React.FC = () => {
  // --- UI State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  
  // --- Content and Editing State ---
  const [bookData, setBookData] = useState<Book>(initialBookData);
  const [editMode, setEditMode] = useState(false);
  const [clipboardItem, setClipboardItem] = useState<ContentItem | null>(null);

  const [activePartId, setActivePartId] = useState<string | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeSectionContent, setActiveSectionContent] = useState<string>('');


  const mainContentRef = useRef<HTMLDivElement>(null);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  
  const [speakingSectionId, setSpeakingSectionId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  // --- New state for global navigation ---
  const [targetLocalPage, setTargetLocalPage] = useState<number | null>(null);


  // --- Find active content ---
  const currentPart = bookData.parts.find(p => p.id === activePartId);
  const currentPartIndex = bookData.parts.findIndex(p => p.id === activePartId);
  const currentChapter = currentPart && currentPart.chapters.find((c: Chapter) => c.id === activeChapterId);
  const activeSection = currentChapter && currentChapter.sections.find(
    (section) => section.id === activeSectionId
  );

  // --- Pagination Hook (for the current section) ---
  const { 
    paginatedContent,
    currentPage,
    totalPages,
    setPage,
    nextPage,
    prevPage,
  } = usePagination(activeSection?.content || [], { capacity: 50 });


  // --- Global Pagination Logic ---
  const pageMap = useMemo(() => {
    const map: { partId: string; chapterId: string; sectionId: string; localPageNumber: number }[] = [];
    bookData.parts.forEach(part => {
        part.chapters.forEach(chapter => {
            chapter.sections.forEach(section => {
                const sectionPages = paginateContent(section.content, { capacity: 50 });
                sectionPages.forEach((_, pageIndex) => {
                    map.push({
                        partId: part.id,
                        chapterId: chapter.id,
                        sectionId: section.id,
                        localPageNumber: pageIndex + 1
                    });
                });
            });
        });
    });
    return map;
  }, [bookData]);

  const globalTotalPages = pageMap.length;

  const globalCurrentPage = useMemo(() => {
    if (!activeSectionId || !pageMap.length) return 1;
    const index = pageMap.findIndex(p => 
        p.sectionId === activeSectionId && p.localPageNumber === currentPage
    );
    return index >= 0 ? index + 1 : 1;
  }, [activeSectionId, currentPage, pageMap]);

  const handleGlobalPageChange = (newGlobalPageStr: string) => {
      const newGlobalPage = Number(newGlobalPageStr);
      if (isNaN(newGlobalPage) || newGlobalPage < 1 || newGlobalPage > globalTotalPages) return;

      const targetPageInfo = pageMap[newGlobalPage - 1];
      if (targetPageInfo) {
          if (targetPageInfo.sectionId === activeSectionId) {
              setPage(targetPageInfo.localPageNumber);
          } else {
              setTargetLocalPage(targetPageInfo.localPageNumber);
              // Set active section
              setActivePartId(targetPageInfo.partId);
              setActiveChapterId(targetPageInfo.chapterId);
              setActiveSectionId(targetPageInfo.sectionId);
          }
      }
  };
  
  const handleGlobalPrev = () => {
    if (globalCurrentPage > 1) {
      handleGlobalPageChange(String(globalCurrentPage - 1));
    }
  };

  const handleGlobalNext = () => {
    if (globalCurrentPage < globalTotalPages) {
      handleGlobalPageChange(String(globalCurrentPage + 1));
    }
  };

  useEffect(() => {
      // Effect to jump to the correct local page after a section change
      if (targetLocalPage !== null) {
          setPage(targetLocalPage);
          setTargetLocalPage(null); // Reset after use
      }
  }, [activeSectionId, targetLocalPage, setPage]);



  // --- Content Editing Handlers ---

  const updateActiveSectionContent = (newContent: ContentItem[]) => {
      // Deep copy to ensure immutable update
      const newBookData = JSON.parse(JSON.stringify(bookData));
      
      const part = newBookData.parts.find((p: Part) => p.id === activePartId);
      if (!part) return;
      const chapter = part.chapters.find((c: Chapter) => c.id === activeChapterId);
      if (!chapter) return;
      const section = chapter.sections.find((s: ChapterSection) => s.id === activeSectionId);
      if (!section) return;

      section.content = newContent;
      setBookData(newBookData);
  };

  const handleItemUpdate = (itemIndex: number, newPartialData: Partial<ContentItem>) => {
      if (!activeSection) return;
      const newContent = [...activeSection.content];
      newContent[itemIndex] = { ...newContent[itemIndex], ...newPartialData };
      updateActiveSectionContent(newContent);
  };

  const handleItemDelete = (itemIndex: number) => {
      if (!activeSection) return;
      const newContent = activeSection.content.filter((_, index) => index !== itemIndex);
      updateActiveSectionContent(newContent);
  };

  const handleItemCopy = (itemIndex: number) => {
      if (!activeSection) return;
      setClipboardItem({ ...activeSection.content[itemIndex] });
  };

  const handleItemCut = (itemIndex: number) => {
      if (!activeSection) return;
      setClipboardItem({ ...activeSection.content[itemIndex] });
      const newContent = activeSection.content.filter((_, index) => index !== itemIndex);
      updateActiveSectionContent(newContent);
  };

  const handleItemPaste = (pasteIndex: number) => {
      if (!clipboardItem || !activeSection) return;
      const newContent = [...activeSection.content];
      newContent.splice(pasteIndex, 0, clipboardItem);
      updateActiveSectionContent(newContent);
      // Optional: clear clipboard after paste?
      // setClipboardItem(null); 
  };


  const extractTextForTTS = (contentItems: ContentItem[]): string => {
    let text = '';
    contentItems.forEach(item => {
      switch (item.type) {
        case ContentType.HEADING1:
        case ContentType.HEADING2:
        case ContentType.HEADING3:
        case ContentType.HEADING4:
        case ContentType.PARAGRAPH:
        case ContentType.LINK: 
        case ContentType.PREFORMATTED_TEXT:
          if (item.text) text += item.text + '. ';
          break;
        case ContentType.LIST_UNORDERED:
          if (item.items) text += item.items.map(li => li.replace(/<[^>]+>/g, '')).join('. ') + '. '; 
          break;
        case ContentType.DEFINITION_LIST:
          if (item.definitionItems) {
            item.definitionItems.forEach(dl => {
              text += dl.term.replace(/<[^>]+>/g, '') + '. ' + dl.definition + '. ';
            });
          }
          break;
        case ContentType.NOTE:
          if (item.title) text += item.title + '. ';
          if (item.text) text += item.text + '. ';
          break;
        case ContentType.CODE_BLOCK:
            if(item.code) text += `Code block: ${item.code}. `;
            break;
        case ContentType.CODE_EXPLANATION:
            if(item.codeTitle) text += `Code titled ${item.codeTitle}. `;
            if (item.code) text += `Code block: ${item.code}. `;
            if (item.explanations) {
                item.explanations.forEach(ex => {
                    text += `Explanation for lines ${ex.lines}: ${ex.explanation}. `;
                });
            }
            break;
      }
    });
    return text.replace(/\s+/g, ' ').trim(); 
  };

  useEffect(() => {
    const updateVoiceList = () => {
        const voices = speechSynthesis.getVoices();
        setAvailableVoices(voices);
    };

    speechSynthesis.onvoiceschanged = updateVoiceList;
    updateVoiceList(); // Initial attempt

    return () => {
        speechSynthesis.onvoiceschanged = null; 
    };
  }, []);


  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeMultiplier.toString());
  }, [fontSizeMultiplier]);

  const zoomIn = () => setFontSizeMultiplier(prev => Math.min(prev + 0.1, 2)); // Max 2x
  const zoomOut = () => setFontSizeMultiplier(prev => Math.max(prev - 0.1, 0.5)); // Min 0.5x
  const zoomReset = () => setFontSizeMultiplier(1);

  
    const handleToggleTTS = (section: ChapterSection) => {
    if (speakingSectionId === section.id) {
      speechSynthesis.cancel();
      setSpeakingSectionId(null);
      if (utteranceRef.current) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
      }
      utteranceRef.current = null;
    } else {
      speechSynthesis.cancel(); 
      const textToSpeak = extractTextForTTS(section.content);
      if (textToSpeak) {
        const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
        newUtterance.lang = 'ar-SA';

        if (availableVoices.length > 0) {
            let preferredVoice = availableVoices.find(voice =>
                voice.lang.startsWith('ar-EG') &&
                (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('أنثى')) &&
                (voice.name.toLowerCase().includes('hoda') || voice.name.toLowerCase().includes('هدى'))
            );
            if (!preferredVoice) {
                 preferredVoice = availableVoices.find(voice =>
                    (voice.lang.startsWith('ar-EG') || voice.lang.startsWith('ar-')) &&
                    (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('أنثى'))
                );
            }
            if (!preferredVoice) {
                preferredVoice = availableVoices.find(voice => voice.lang.startsWith('ar-'));
            }

            if (preferredVoice) {
                newUtterance.voice = preferredVoice;
            }
        }
        
        newUtterance.onstart = () => {
          setSpeakingSectionId(section.id);
        };
        newUtterance.onend = () => {
          setSpeakingSectionId(null);
          if (utteranceRef.current) {
            utteranceRef.current.onerror = null;
            utteranceRef.current.onstart = null; // Also clear onstart
          }
          utteranceRef.current = null;
        };
        newUtterance.onerror = (event: SpeechSynthesisErrorEvent) => { 
          console.error('SpeechSynthesisUtterance.onerror - ErrorType:', event.error, 'FullEvent:', event); 
          setSpeakingSectionId(null);
          if (utteranceRef.current) {
            utteranceRef.current.onend = null;
            utteranceRef.current.onstart = null; // Also clear onstart
          }
          utteranceRef.current = null;
        };
        utteranceRef.current = newUtterance;
        speechSynthesis.speak(newUtterance);
      } else {
        console.warn("No text to speak for section:", section.id);
      }
    }
  };
  
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      if (utteranceRef.current) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
        utteranceRef.current.onstart = null;
      }
    };
  }, []);

  const handleSelectSection = (selection: { partId: string, chapterId: string, sectionId: string }) => {
    setActivePartId(selection.partId);
    setActiveChapterId(selection.chapterId);
    setActiveSectionId(selection.sectionId);
     if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0; // Scroll to top when a new level is selected
    }
    setIsSidebarOpen(false); // Close sidebar on selection
  };
  
  const handleSearchResultClick = (result: SearchResult) => {
    handleSelectSection({
        partId: result.part.id,
        chapterId: result.chapter.id,
        sectionId: result.section.id
    });
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleGoHome = () => {
    setActivePartId(null);
    setActiveChapterId(null);
    setActiveSectionId(null);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    setIsSidebarOpen(false);
  };

  // --- Search Logic ---
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    bookData.parts.forEach(part => {
      part.chapters.forEach(chapter => {
        chapter.sections.forEach(section => {
          const sectionTitle = section.title || '';
          const chapterTitle = chapter.chapterTitle || '';
          const contentText = extractTextForTTS(section.content); // Use TTS extraction for searchable text

          if (
            sectionTitle.toLowerCase().includes(lowerCaseQuery) ||
            chapterTitle.toLowerCase().includes(lowerCaseQuery) ||
            contentText.toLowerCase().includes(lowerCaseQuery)
          ) {
            results.push({ part, chapter, section });
          }
        });
      });
    });

    setSearchResults(results);
  }, [searchQuery, bookData]); // Rerun search if bookData changes


  // --- Print/PDF Export Logic ---
  const handlePrint = () => {
    const renderContentItemToHtml = (item: ContentItem): string => {
        switch (item.type) {
            case ContentType.HEADING3:
                return `<h3 class="text-xl font-semibold text-stone-100 mt-6 mb-3">${item.text}</h3>`;
            case ContentType.HEADING4:
                return `<h4 class="text-lg font-bold text-stone-100 mt-4 mb-2">${item.text}</h4>`;
            case ContentType.PARAGRAPH:
                return `<p class="my-4 text-stone-300 leading-relaxed text-justify text-base">${item.text}</p>`;
            case ContentType.LIST_UNORDERED:
                const itemsHtml = item.items ? item.items.map(li => `<li>${li}</li>`).join('') : '';
                return `<ul class="my-4 mr-6 list-disc list-outside space-y-2 text-stone-300 text-base">${itemsHtml}</ul>`;
            case ContentType.CODE_EXPLANATION:
                 const explanationsHtml = item.explanations ? item.explanations.map(ex => `
                    <div class="flex">
                        <div class="flex-shrink-0 w-16 text-center">
                            <span class="inline-block bg-stone-700 text-amber-300 font-bold text-xs px-2 py-1 rounded">سطر ${ex.lines}</span>
                        </div>
                        <p class="flex-grow mr-4 text-stone-300 text-sm leading-relaxed">${ex.explanation}</p>
                    </div>`).join('') : '';
                const codeLinesHtml = item.code ? item.code.split('\n').map((line, index) => `
                    <div class="flex">
                        <span class="w-8 text-right pr-4 text-gray-500 select-none">${index + 1}</span>
                        <code class="flex-1 whitespace-pre-wrap break-all">${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
                    </div>`).join('') : '';
                return `
                    <div class="flex flex-col md:flex-row my-6 bg-stone-800 rounded-lg shadow-lg border border-stone-700 overflow-hidden">
                        <div class="w-full md:w-1/2 p-4 bg-stone-800 md:border-r-2 border-stone-700">
                             <h4 class="text-lg font-semibold text-amber-400 mb-4 border-b border-stone-700 pb-2">شرح الكود</h4>
                             <div class="space-y-4">${explanationsHtml}</div>
                        </div>
                        <div dir="ltr" class="w-full md:w-1/2 bg-gray-900 flex flex-col border-t-2 md:border-t-0 border-stone-700">
                            <div class="flex-shrink-0 flex items-center justify-between p-2 bg-stone-700 border-b border-stone-600">
                                <div class="flex items-center space-x-2">
                                    ${item.language ? `<span class="px-2 py-1 bg-gray-600 text-gray-300 rounded-md text-xs font-bold select-none">${item.language.toUpperCase()}</span>` : ''}
                                </div>
                                ${item.codeTitle ? `<span class="text-gray-300 font-semibold text-sm">${item.codeTitle}</span>` : ''}
                            </div>
                            <div class="flex-grow p-4 overflow-x-auto text-left">
                                <pre class="font-code text-sm leading-relaxed text-gray-100">${codeLinesHtml}</pre>
                            </div>
                        </div>
                    </div>`;
            case ContentType.CODE_BLOCK:
                return `<div class="relative my-6 bg-gray-900 rounded-lg shadow-md font-code"><pre class="p-4 pt-4 text-gray-100 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed text-left text-base"><code dir="ltr">${item.code}</code></pre></div>`;
            case ContentType.DEFINITION_LIST:
                const dlItemsHtml = item.definitionItems ? item.definitionItems.map(dl => `
                    <div class="bg-stone-700 p-3 rounded-md border border-stone-600">
                        <dt class="text-lg font-bold text-stone-200">${dl.term}</dt>
                        <dd class="text-lg text-stone-200 mr-4">${dl.definition}</dd>
                    </div>`).join('') : '';
                return `<dl class="my-4 space-y-3">${dlItemsHtml}</dl>`;
            case ContentType.NOTE:
                return `
                    <div class="my-6 p-4 bg-amber-800 border-r-4 border-amber-600 rounded-md shadow">
                        ${item.title ? `<p class="font-bold text-amber-200 mb-1 text-base">${item.title}</p>` : ''}
                        <p class="text-lg text-amber-100 whitespace-pre-wrap font-code">${item.text}</p>
                    </div>`;
            case ContentType.LINK:
                 return `<p class="my-2 text-base"><a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-sky-300 hover:text-sky-200 hover:underline">${item.text || item.url}</a></p>`;
            case ContentType.PREFORMATTED_TEXT:
                return `<pre class="my-4 p-4 bg-stone-900 text-stone-200 rounded-md overflow-x-auto font-code border border-stone-700 text-base">${item.text}</pre>`;
            case ContentType.IMAGE_PLACEHOLDER:
                 return `<div class="my-4 flex justify-center p-2"><img src="https://via.placeholder.com/${item.width || 600}x${item.height || 400}" alt="${item.alt || 'Placeholder Image'}" class="rounded-md" /></div>`;
            default:
                return '';
        }
    };
    
    const bookContentHtml = bookData.parts.map(part => {
        const chaptersHtml = part.chapters.map(chapter => {
            const sectionsHtml = chapter.sections.map(section => {
                const contentHtml = section.content.map(renderContentItemToHtml).join('');
                return `<section class="mb-12" id="${section.id}">
                            <h4 class="text-2xl font-semibold text-amber-400 mb-4 border-b border-stone-600 pb-2 flex items-center">
                                ${section.icon ? `<span class="text-3xl ml-3 rtl:mr-0 rtl:ml-3">${section.icon}</span>` : ''}
                                <span>${section.title}</span>
                            </h4>
                            ${contentHtml}
                        </section>`;
            }).join('');
            return `<article class="chapter page-break-before">
                        <h3 class="text-3xl font-bold text-stone-100 mb-8">${chapter.chapterTitle}</h3>
                        ${sectionsHtml}
                    </article>`;
        }).join('');
        return `<div class="part">
                    <header class="mb-10 pb-6 border-b-2 border-amber-500 page-break-before">
                       <h2 class="text-4xl font-bold text-amber-400 mb-2 flex items-center">
                            ${part.icon ? `<span class="text-4xl ml-4 rtl:mr-0 rtl:ml-4">${part.icon}</span>` : ''}
                            <span>${part.partTitle}</span>
                        </h2>
                    </header>
                    ${chaptersHtml}
                </div>`;
    }).join('');

    const printableHtml = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>طباعة - ${bookData.bookTitle}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap" rel="stylesheet">
            <style>
                body { font-family: "Amiri", serif; background-color: #1c1917; color: #d6d3d1; }
                .font-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; }
                .font-amiri { font-family: 'Amiri', serif; }
                .page-break-before { page-break-before: always; }
                .print-container { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
                .print-controls { text-align: center; margin-bottom: 2rem; }
                .print-controls button { background-color: #0ea5e9; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; }
                
                @media print {
                    @page { margin: 0.5in; }
                    html { background-color: #ffffff; }
                    body { background-color: #ffffff; color: #000000; }
                    .print-controls { display: none; }
                    .text-stone-100, .text-stone-200, .text-stone-300, .text-stone-400, .text-amber-100, .text-amber-200, .text-amber-300, .text-amber-400, .text-sky-300, .text-gray-100, .text-gray-300, .text-amber-400, .text-amber-300 { color: #000000 !important; }
                    .bg-stone-700, .bg-stone-800, .bg-stone-900, .bg-gray-900, .bg-amber-800 { background-color: #ffffff !important; border-color: #dddddd !important; }
                    .border-stone-600, .border-stone-700, .border-amber-600 { border-color: #dddddd !important; }
                    a { text-decoration: none; color: #0000ff !important; }
                }
            </style>
        </head>
        <body onload="setTimeout(window.print, 500)">
            <div class="print-container">
                <div class="print-controls"><button onclick="window.print()">طباعة / تصدير PDF</button></div>
                <h1 class="text-5xl font-bold text-center mb-12 text-amber-300 font-amiri">${bookData.bookTitle}</h1>
                ${bookContentHtml}
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(printableHtml);
        printWindow.document.close();
        printWindow.focus();
    } else {
        alert('Please allow popups for this website to print the content.');
    }
  };

  
  useEffect(() => {
    if (activeSection) {
      const textContent = extractTextForTTS(activeSection.content);
      setActiveSectionContent(textContent);
    } else {
      setActiveSectionContent('');
    }
  }, [activeSection]);


  // Helper array for Arabic numerals
  const arabicNumerals = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر"];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      />

      <Sidebar 
        book={bookData}
        activeSectionId={activeSectionId}
        onSelectSection={handleSelectSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSearchResultClick={handleSearchResultClick}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onGoHome={handleGoHome}
      />

      {/* Sidebar Toggle Button */}
      <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? 'إغلاق الفهرس' : 'فتح الفهرس'}
          className={`fixed top-1/2 -translate-y-1/2 z-40 w-6 h-20 bg-stone-300 hover:bg-stone-400 text-stone-700 rounded-l-lg flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none shadow-lg ${isSidebarOpen ? 'right-80' : 'right-0'}`}
          aria-controls="sidebar"
          aria-expanded={isSidebarOpen}
      >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
      </button>

      {/* Header Bar */}
      <header className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-stone-300 text-stone-800 shadow-lg">
          {/* Top Row for controls */}
          <div className="h-[40px] bg-stone-200 flex items-center justify-center px-8 border-b border-stone-300">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button onClick={handlePrint} title="طباعة / تصدير PDF" className="p-1.5 hover:bg-stone-400 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg>
                </button>
                <button onClick={zoomIn} title="تكبير" className="p-1.5 hover:bg-stone-400 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                </button>
                <button onClick={zoomOut} title="تصغير" className="p-1.5 hover:bg-stone-400 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                    </svg>
                </button>
                <button onClick={zoomReset} title="إعادة تعيين الحجم" className="p-1.5 hover:bg-stone-400 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                <div className="border-l border-stone-400 h-6 mx-2"></div>
                 {/* --- Edit Mode Toggle --- */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="editModeToggle" className="text-sm font-bold text-stone-700 select-none">وضع التحرير</label>
                    <button
                        id="editModeToggle"
                        role="switch"
                        aria-checked={editMode}
                        onClick={() => setEditMode(!editMode)}
                        className={`${
                        editMode ? 'bg-amber-500' : 'bg-stone-400'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
                    >
                        <span
                        className={`${
                            editMode ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </button>
                </div>
              </div>
          </div>
          {/* Bottom Row for title */}
          <div className="h-[50px] flex items-center justify-center relative">
              <div className="flex items-center">
                  {currentPart && currentPartIndex !== -1 && (
                    <span className="bg-stone-400 text-stone-50 text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                        {`الباب ${arabicNumerals[currentPartIndex] || currentPartIndex + 1}`}
                    </span>
                  )}
              </div>
          </div>
        </div>
      </header>
      
       {/* Header Toggle Button */}
      <div className={`fixed left-1/2 -translate-x-1/2 top-0 z-30 transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-[90px]' : 'translate-y-0'}`}>
          <button
            onClick={() => setIsHeaderVisible(!isHeaderVisible)}
            title={isHeaderVisible ? 'إخفاء الشريط العلوي' : 'إظهار الشريط العلوي'}
            className="w-20 h-6 bg-stone-300 hover:bg-stone-400 text-stone-700 rounded-b-lg flex items-center justify-center transition focus:outline-none shadow-lg"
            aria-controls="main-header"
            aria-expanded={isHeaderVisible}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-5 h-5 transition-transform duration-200 ${isHeaderVisible ? 'rotate-180' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
      </div>

      <div className="flex h-screen bg-stone-200 overflow-hidden" dir="rtl">
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Scrollable Main Content Area */}
            <main 
                id="main-content-area" 
                ref={mainContentRef} 
                className="flex-1 overflow-y-auto p-4 md:p-8 bg-stone-100 scroll-smooth"
                style={{paddingTop: '30px'}}
                aria-live="polite"
                aria-atomic="true"
            >
                {/* Show welcome screen if no part is selected */}
                {!currentPart && (
                <div className="flex flex-col items-center justify-center h-full -mt-16 text-center">
                    <h1
                        className="font-amiri text-stone-800 welcome-text-shadow"
                        style={{ fontSize: `calc(4.5rem * var(--font-size-multiplier, 1))` }}
                    >
                        {bookData.arabicBookTitle || bookData.bookTitle}
                    </h1>
                    <div className="text-center mt-4">
                        <p
                          className="text-stone-500"
                          dir="ltr"
                          style={{ fontSize: `calc(1.125rem * var(--font-size-multiplier, 1))` }}
                        >Implemented by</p>
                        <p
                          className="text-stone-700 font-bold font-code mt-1"
                          dir="ltr"
                          style={{ fontSize: `calc(1.25rem * var(--font-size-multiplier, 1))` }}
                        >Nagi Metwalli</p>
                    </div>
                </div>
                )}
                
                {activeSection ? (
                <div className="page-container">
                    {/* GLOBAL PAGE NAVIGATOR */}
                    <div className="flex justify-center mb-4">
                        {globalTotalPages > 0 && (
                        <div className="flex items-center gap-4">
                            {/* Previous Button (navigates to the right in RTL) */}
                            <button 
                                onClick={handleGlobalPrev} 
                                disabled={globalCurrentPage <= 1} 
                                className="p-2 rounded-full hover:bg-stone-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="الصفحة السابقة"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                            
                            {/* Page Selector */}
                            <div className="flex items-center gap-2">
                                <select
                                id="globalPageSelect"
                                value={globalCurrentPage}
                                onChange={(e) => handleGlobalPageChange(e.target.value)}
                                className="bg-white border border-stone-400 rounded-md py-1 px-2 text-sm font-bold text-stone-800 focus:ring-amber-400 focus:border-amber-400"
                                aria-label="الانتقال إلى صفحة في الكتاب"
                                >
                                {Array.from({ length: globalTotalPages }, (_, i) => i + 1).map(pageNumber => (
                                    <option key={pageNumber} value={pageNumber}>
                                        {pageNumber}
                                    </option>
                                ))}
                                </select>
                                <span className="text-stone-600 font-bold font-code"> / {globalTotalPages}</span>
                            </div>

                            {/* Next Button (navigates to the left in RTL) */}
                            <button 
                                onClick={handleGlobalNext} 
                                disabled={globalCurrentPage >= globalTotalPages} 
                                className="p-2 rounded-full hover:bg-stone-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="الصفحة التالية"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        )}
                    </div>

                  <div className="page-frame">
                    <div className="page-content">
                      <article>
                         {paginatedContent.map(({ item, originalIndex }) => (
                          <EditableWrapper
                            key={originalIndex}
                            editMode={editMode}
                            onCopy={() => handleItemCopy(originalIndex)}
                            onCut={() => handleItemCut(originalIndex)}
                            onDelete={() => handleItemDelete(originalIndex)}
                            onPasteAfter={() => handleItemPaste(originalIndex + 1)}
                            isPasteDisabled={!clipboardItem}
                          >
                            <ContentRenderer 
                              item={item} 
                              editMode={editMode}
                              onUpdate={(newPartialData) => handleItemUpdate(originalIndex, newPartialData)}
                              partId={currentPart?.id}
                            />
                          </EditableWrapper>
                        ))}
                        {/* Paste button for the very end of the section */}
                        {editMode && activeSection.content.length > 0 && (
                           <div className="w-full text-center py-2">
                             <button
                               onClick={() => handleItemPaste(activeSection.content.length)}
                               disabled={!clipboardItem}
                               className="px-4 py-1 text-sm bg-sky-500 text-white rounded-full hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                             >
                               الصق هنا
                             </button>
                           </div>
                         )}
                      </article>
                      {/* Decorative line at the end of the page */}
                      <div 
                        className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[250px] h-[1px] bg-stone-400"
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 px-2">
                        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-stone-300 text-stone-800 rounded-md font-bold hover:bg-stone-400 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors">
                            الصفحة السابقة
                        </button>
                        <span className="text-stone-700 font-bold font-code">{`صفحة ${currentPage} من ${totalPages}`}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-stone-300 text-stone-800 rounded-md font-bold hover:bg-stone-400 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors">
                            الصفحة التالية
                        </button>
                    </div>
                   )}
                </div>
                ) : currentPart ? ( // If part is selected but no section
                    <div className="text-center py-10">
                        <p style={{ fontSize: 'calc(1.125rem * var(--font-size-multiplier, 1))' }} className="text-stone-600 text-lg">الرجاء اختيار فصل ومستوى من الفهرس لعرض المحتوى.</p>
                    </div>
                ) : null
                }
            </main>
            
            {/* Footer */}
            <footer className="bg-stone-300 text-stone-800 flex-shrink-0" dir="ltr">
                {/* Main footer content */}
                <div className="flex items-center justify-center px-8 py-3 shadow-inner">
                    <p className="text-sm font-semibold">
                        Nagiz Smart Solutions &copy; 2025 
                    </p>
                </div>
            </footer>
        </div>
      </div>
      
      {activeSection && (
        <ChatWidget 
            sectionContent={activeSectionContent} 
            sectionTitle={activeSection.title || 'هذا القسم'}
        />
      )}

    </>
  );
};

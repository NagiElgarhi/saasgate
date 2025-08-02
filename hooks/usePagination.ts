import { useState, useEffect, useMemo } from 'react';
import { ContentItem, ContentType } from '../types';

interface PaginationOptions {
  capacity: number; // Represents the approximate "weight" a page can hold.
}

interface PaginatedItem {
  item: ContentItem;
  originalIndex: number;
}

// Helper to strip HTML tags for more accurate length calculation
const stripHtml = (html: string | undefined): string => {
    return html ? html.replace(/<[^>]+>/g, '') : '';
};


// Assign a weight to each content type to estimate its vertical space usage.
const CONTENT_WEIGHTS: Record<ContentType, (item: ContentItem) => number> = {
  [ContentType.HEADING1]: () => 12,
  [ContentType.HEADING2]: () => 10,
  [ContentType.HEADING3]: () => 8,
  [ContentType.HEADING4]: () => 6,
  [ContentType.PARAGRAPH]: (item) => 2 + Math.ceil(stripHtml(item.text).length / 120),
  [ContentType.LIST_UNORDERED]: (item) => {
    if (!item.items || item.items.length === 0) return 2;
    const listItemsTextLength = item.items.reduce((acc, li) => acc + stripHtml(li).length, 0);
    // Estimation: 2 for base ul, 1.5 per item for bullet/spacing, plus text length weight.
    return 2 + (item.items.length * 1.5) + Math.ceil(listItemsTextLength / 120);
  },
  [ContentType.CODE_BLOCK]: (item) => 4 + (item.code?.split('\n').length || 0),
  [ContentType.DEFINITION_LIST]: (item) => {
    if (!item.definitionItems || item.definitionItems.length === 0) return 2;
    const totalTextLength = item.definitionItems.reduce((acc, di) => acc + stripHtml(di.term).length + stripHtml(di.definition).length, 0);
    // 2 for base dl, 3 per item for spacing/dt/dd, plus text length.
    return 2 + (item.definitionItems.length * 3) + Math.ceil(totalTextLength / 100);
  },
  [ContentType.NOTE]: (item) => 3 + Math.ceil(stripHtml(item.text).length / 100),
  [ContentType.LINK]: () => 2,
  [ContentType.PREFORMATTED_TEXT]: (item) => 3 + (item.text?.split('\n').length || 0),
  [ContentType.IMAGE_PLACEHOLDER]: () => 20, // Images are heavy
  [ContentType.CODE_EXPLANATION]: (item) => 8 + (item.code?.split('\n').length || 0) + (item.explanations?.length || 0) * 2.5,
  [ContentType.PROJECT_AUTH_FLOW]: () => 30,
  [ContentType.PROJECT_CONTACT_FORM]: () => 30,
  [ContentType.PROJECT_DIGITAL_PRODUCT]: () => 30,
  [ContentType.PROJECT_PAYMENT_GATEWAY]: () => 30,
};

/**
 * A pure function to paginate content based on item weights.
 * This can be used to calculate total page counts without a hook.
 * @param content The array of content items to paginate.
 * @param options The pagination options, e.g., capacity.
 * @returns An array of pages, where each page is an array of paginated items.
 */
export const paginateContent = (content: ContentItem[], options: PaginationOptions): PaginatedItem[][] => {
    if (!content || content.length === 0) {
        return [];
    }

    const { capacity } = options;
    const allPages: PaginatedItem[][] = [];
    let currentPageItems: PaginatedItem[] = [];
    let currentWeight = 0;

    content.forEach((item, index) => {
      const itemWithIndex: PaginatedItem = { item, originalIndex: index };
      const itemWeight = CONTENT_WEIGHTS[item.type] ? CONTENT_WEIGHTS[item.type](item) : 1;
      const isHeading = [ContentType.HEADING1, ContentType.HEADING2, ContentType.HEADING3, ContentType.HEADING4].includes(item.type);
      const MIN_FOLLOWING_WEIGHT = 4; // A small paragraph, to prevent orphaned headings.

      let breakBefore = false;

      // Condition 1: Item itself is larger than a full page, give it its own page.
      if (itemWeight > capacity) {
        if (currentPageItems.length > 0) {
          allPages.push(currentPageItems); // Finalize previous page
        }
        allPages.push([itemWithIndex]); // Item gets its own page
        currentPageItems = [];
        currentWeight = 0;
        return; // Continue to next item
      }
      
      // Condition 2: The item won't fit on the current page.
      if (currentWeight + itemWeight > capacity && currentPageItems.length > 0) {
        breakBefore = true;
      }
      // Condition 3 (Widow Control): The item is a heading, it fits, but there's not
      // enough space for a minimal amount of content after it. This pushes the heading to the next page.
      else if (isHeading && (currentWeight + itemWeight + MIN_FOLLOWING_WEIGHT > capacity) && currentPageItems.length > 0) {
          breakBefore = true;
      }

      if (breakBefore) {
        allPages.push(currentPageItems);
        currentPageItems = [itemWithIndex];
        currentWeight = itemWeight;
      } else {
        currentPageItems.push(itemWithIndex);
        currentWeight += itemWeight;
      }
    });

    // Add the last page if it has any items.
    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
};


// Strict pagination hook with widow/orphan control for headings
export const usePagination = (content: ContentItem[], options: PaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = useMemo(() => {
    return paginateContent(content, options);
  }, [content, options.capacity]);


  // Reset to page 1 whenever the content changes
  useEffect(() => {
    setCurrentPage(1);
  }, [content]);

  const totalPages = pages.length;
  const paginatedContent: PaginatedItem[] = pages[currentPage - 1] || [];

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    paginatedContent,
    currentPage,
    totalPages,
    setPage,
    nextPage,
    prevPage,
  };
};
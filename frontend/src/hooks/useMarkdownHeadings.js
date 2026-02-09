import { useMemo } from 'react';

export const useMarkdownHeadings = (markdown) => {
  return useMemo(() => {
    if (!markdown) return [];
    
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[0].match(/^#+/)[0].length;
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      
      headings.push({ level, text, id });
    }

    return headings;
  }, [markdown]);
};
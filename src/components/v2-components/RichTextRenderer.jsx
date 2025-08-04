'use client';

import { PrismicRichText } from '@prismicio/react';

export default function RichTextRenderer({ field, className = '',style = {} }) {
  if (!field) return null;

  return (
     <div
      className={`[&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 
                  [&>li]:mb-2 [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-800
                  ${className}`}  style={style}
    >
      <PrismicRichText field={field} />
    </div>
  );
}

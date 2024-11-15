'use client'
import TagsContext from "./Tags"

export default function TagsContextWrapper({ children, className }) {
  return (
    <div className={className}>
      <TagsContext>
        {children}
      </TagsContext>
    </div>
  )
}

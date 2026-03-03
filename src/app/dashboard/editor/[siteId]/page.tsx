'use client'

import { useEditorStore } from '@/lib/store'
import { EditorSidebar } from '@/components/editor/sidebar'
import { EditorPreview } from '@/components/editor/preview'
import { EditorProperties } from '@/components/editor/properties'
import { EditorToolbar } from '@/components/editor/toolbar'

export default function EditorPage() {
  const previewMode = useEditorStore(s => s.previewMode)

  return (
    <div className="h-screen flex flex-col bg-linen">
      {/* Toolbar */}
      <EditorToolbar />

      {/* Editor body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Sections */}
        <EditorSidebar />

        {/* Center: Preview */}
        <div className="flex-1 flex items-start justify-center overflow-auto p-6 bg-sand/30">
          <div
            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
              previewMode === 'mobile' ? 'w-[375px]' :
              previewMode === 'tablet' ? 'w-[768px]' :
              'w-full max-w-[1200px]'
            }`}
          >
            <EditorPreview />
          </div>
        </div>

        {/* Right: Properties */}
        <EditorProperties />
      </div>
    </div>
  )
}

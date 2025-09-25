// src/components/MobileFooter.tsx
"use client";

import { useState } from 'react'
import Sidebar from './Sidebar'
import News from './News'

export default function MobileFooter({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'matches' | 'leagues' | 'news'>('matches')

  return (
    <div className='flex flex-col w-full h-full'>
      <div className="flex-1">
        {activeTab === 'matches' && children}
        {activeTab === 'leagues' && <Sidebar />}
        {activeTab === 'news' && <News />}
      </div>

      {/* Footer nav (mobile only) */}
      <footer className="fixed bottom-0 left-0 right-0 z-99 bg-white border-t border-gray-200 mdplus:hidden">
        <nav className="flex justify-around items-center py-2 text-sm">
          <button onClick={() => setActiveTab('matches')}
            className={`flex flex-col items-center ${activeTab === 'matches' ? 'text-blue-600' : 'text-gray-600'}`}>
            <span>⚽</span><span>Matches</span>
          </button>
          <button onClick={() => setActiveTab('leagues')}
            className={`flex flex-col items-center ${activeTab === 'leagues' ? 'text-blue-600' : 'text-gray-600'}`}>
            <span>🏆</span><span>Leagues</span>
          </button>
          <button onClick={() => setActiveTab('news')}
            className={`flex flex-col items-center ${activeTab === 'news' ? 'text-blue-600' : 'text-gray-600'}`}>
            <span>📰</span><span>News</span>
          </button>
        </nav>
      </footer>
    </div>
  )
}

import React from 'react'

const loading = () => {
  return (
    <div className='flex flex-col space-y-4 animate-pulse'>
      <div className='bg-slate-800 rounded-lg p-4 space-y-3'>
        <div className='h-6 bg-slate-600 rounded w-1/3'></div>
        <div className='space-y-2'>
          {[...Array(10)].map((_, i) => (
            <div key={i} className='flex items-center space-x-4 p-3 bg-slate-700 rounded'>
              <div className='w-8 h-8 bg-slate-600 rounded-full'></div>
              <div className='flex-1 h-4 bg-slate-600 rounded'></div>
              <div className='w-16 h-4 bg-slate-600 rounded'></div>
              <div className='w-16 h-4 bg-slate-600 rounded'></div>
              <div className='w-8 h-8 bg-slate-600 rounded-full'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default loading
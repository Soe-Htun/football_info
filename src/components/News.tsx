import Image from "next/image"
import Link from "next/link"
import { getNewsInfo } from "@/api"
import { newsType } from "@/types"

const News = async () => {
  const getNews = await getNewsInfo()
  const newsData: newsType[] = getNews.articles

  return (
    <div className='w-full max-w-md bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4'>
      <div className="flex items-center justify-between mb-4">
        <h1 className='text-lg font-semibold text-white'>Latest News</h1>
        <div className="w-6 h-6 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        {newsData?.map((news, index) => (
          <Link key={`${news.title}-${index}`} href={news.url} target="_blank" rel="noopener noreferrer">
            <div className="group cursor-pointer">
              <div className="flex space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-600/30 hover:bg-slate-700/50 hover:border-slate-500/40 transition-all duration-200">
                {/* News Image */}
                <div className="w-20 h-16 relative flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={news?.urlToImage || '/img/news-football.webp'}
                    alt={news.title || 'News image'}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* News Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-medium leading-snug line-clamp-3 group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>
                  <div className="mt-2 flex items-center text-xs text-gray-400">
                    <span>Football News</span>
                    <span className="mx-1">•</span>
                    <span>Just now</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-4 text-center">
        <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
          View All News
        </button>
      </div>
    </div>
  )
}

export default News
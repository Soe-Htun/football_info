'use client'

import { matchesType } from '@/types'
import Image from 'next/image'

interface MatchCardProps {
  match: matchesType
  showCompetition: boolean
  isLastInCompetition: boolean
}

const MatchCard = ({ match, showCompetition, isLastInCompetition }: MatchCardProps) => {
  const teamNameMap: Record<string, string> = {
    Atleti: "Atletico Madrid",
    Barça: "Barcelona",
  }

  const getTeamDisplayName = (shortName?: string) => {
    if (!shortName) return 'Unknown'
    return teamNameMap[shortName] || shortName
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const minutesStr = minutes.toString().padStart(2, '0')

    return `${hour12}:${minutesStr} ${ampm}`
  }

  return (
    <div className={`bg-slate-800 p-4 hover:bg-slate-750 transition-all duration-200 border-x border-slate-600/30 ${
      showCompetition ? '' : 'border-t'
    } ${
      isLastInCompetition ? 'rounded-b-xl border-b' : ''
    }`}>
      <div className="flex items-center justify-between">
        {/* Status indicator */}
        {(match.status === 'FINISHED' || match.status === 'IN_PLAY') && (
          <div className="flex items-center">
            <span className={`text-xs font-medium mr-3 ${match.status === 'FINISHED' ? 'text-gray-400' : 'text-red-500'}`}>
              {match.status === 'FINISHED' ? 'FT' : 'LIVE'}
            </span>
            {match.status === 'IN_PLAY' && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
            )}
          </div>
        )}

        {/* Home team */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 relative flex-shrink-0">
            {match.homeTeam?.crest ? (
              <Image
                src={match.homeTeam.crest}
                alt={match.homeTeam?.name || 'Home team'}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-300">👕</span>
              </div>
            )}
          </div>
          <span className="text-white font-medium text-sm truncate">
            {getTeamDisplayName(match.homeTeam?.shortName)}
          </span>
        </div>

        {/* Score/Status */}
        <div className="flex flex-col items-center px-4 min-w-[80px]">
          {match.status === 'FINISHED' || match.status === 'IN_PLAY' ? (
            <div className="flex items-center space-x-1">
              <span className="text-white font-bold text-lg">
                {match.score?.fullTime?.home ?? 0}
              </span>
              <span className="text-gray-400">-</span>
              <span className="text-white font-bold text-lg">
                {match.score?.fullTime?.away ?? 0}
              </span>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-gray-400 text-sm font-medium">
                {formatTime(match.utcDate).split(' ')[0]}
              </div>
              <div className="text-gray-400 text-[13px]">
                {formatTime(match.utcDate).split(' ')[1]}
              </div>
            </div>
          )}
          {match.status === 'FINISHED' && match.score?.halfTime && (
            <div className="text-xs text-gray-500 mt-1">
              HT {match.score.halfTime.home}-{match.score.halfTime.away}
            </div>
          )}
        </div>

        {/* Away team */}
        <div className="flex items-center space-x-3 flex-1 min-w-0 justify-end">
          <span className="text-white font-medium text-sm truncate text-right">
            {getTeamDisplayName(match.awayTeam?.shortName)}
          </span>
          <div className="w-8 h-8 relative flex-shrink-0">
            {match.awayTeam?.crest ? (
              <Image
                src={match.awayTeam.crest}
                alt={match.awayTeam?.name || 'Away team'}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-300">👕</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchCard
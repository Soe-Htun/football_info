'use client'

import { matchesType } from '@/types'
import Image from 'next/image'

interface MatchesProps {
  match: matchesType
  showCompetition: boolean
}

const Matches = ({ match, showCompetition }: MatchesProps) => {
  const teamNameMap: Record<string, string> = {
    Atleti: "Atletico Madrid",
    Barça: "Barcelona",
    "SL Benfica": "Benfica",
    Bayern: "Bayern München",
    "Union SG": "Union St.Gilloise",
    "Qarabağ Ağdam": "Qarabag",
  }

  const getTeamDisplayName = (shortName?: string) => {
    if (!shortName) return 'Unknown'
    return teamNameMap[shortName] || shortName
  }


  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const formatted = timeFormatter.format(new Date(match.utcDate));
  const [time, period] = formatted.split(' ');

  return (
    <div className={`bg-slate-800 border-x border-slate-600/30 ${
      showCompetition ? '' : 'border-t'
    } rounded-b-xl border-b`}>
      <div className="p-4 flex items-center justify-between">
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
                {time}
              </div>
              <div className="text-gray-400 text-[13px]">
                {period}
              </div>
            </div>
          )}
          {match.status === 'FINISHED' && match.score?.halfTime && (
            <div className="text-xs text-gray-500 mt-1">
              HT {match.score.halfTime.home}-{match.score.halfTime.away}
            </div>
          )}
        </div>

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

export default Matches
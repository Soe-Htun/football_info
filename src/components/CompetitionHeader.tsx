'use client'

import { matchesType } from '@/types'
import Image from 'next/image'

interface CompetitionHeaderProps {
  match: matchesType
}

const CompetitionHeader = ({ match }: CompetitionHeaderProps) => {
  const competitionDisplayMap: Record<string, string> = {
    "Primera Division": "Spain - LaLiga",
    "Premier League": "England - Premier League",
    "Serie A": "Italy - Serie A",
    "Bundesliga": "Germany - Bundesliga",
    "Ligue 1": "France - Ligue 1",
    "Eredivisie": "Netherlands - Eredivisie",
    "Championship": "England - Championship",
    "Primeira Liga": "Portugal - Primeira Liga",
    "UEFA Champions League": "UEFA - Champions League",
    "UEFA Europa League": "UEFA - Europa League",
    "UEFA Conference League": "UEFA - Conference League"
  }

  const getCompetitionDisplayName = (name?: string) => {
    if (!name) return 'Unknown Competition'
    return competitionDisplayMap[name] || name
  }

  return (
    <div className="flex items-center px-3 mt-4 py-2 bg-slate-700 rounded-t-xl border-x border-t border-slate-600/30">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 relative flex-shrink-0">
          {match.competition.emblem ? (
            <Image
              src={match.competition.emblem}
              alt={match.competition.name || 'Competition'}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full bg-slate-600 rounded flex items-center justify-center">
              <span className="text-xs text-gray-300">⚽</span>
            </div>
          )}
        </div>
        <h2 className="text-xs font-medium text-gray-300">
          {getCompetitionDisplayName(match.competition.name)}
        </h2>
      </div>
    </div>
  )
}

export default CompetitionHeader
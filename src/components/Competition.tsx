'use client'

import { matchesType } from '@/types'
import Matches from './Matches'
import CompetitionHeader from './CompetitionHeader'
import DateHeader from './DateHeader'

interface CompetitionProps {
  matches: matchesType[]
}

const Competition = ({ matches }: CompetitionProps) => {
  const leagueOrder = [
    "UEFA Champions League",
    "UEFA Europa League",
    "UEFA Conference League",
    "Premier League",
    "Primera Division",
    "Bundesliga",
    "Serie A",
    "Ligue 1"
  ]

  const sortedMatches = [...matches].sort((a, b) => {
    const aIndex = leagueOrder.indexOf(a.competition.name)
    const bIndex = leagueOrder.indexOf(b.competition.name)

    const aOrder = aIndex === -1 ? 999 : aIndex
    const bOrder = bIndex === -1 ? 999 : bIndex

    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }
    return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  })

  return (
    <div>
      {sortedMatches.map((match, index) => {
        const showCompetition =
          index === 0 || match.competition.id !== sortedMatches[index - 1].competition.id

        const showDate = index === 0 ||
          new Date(match.utcDate).toDateString() !== new Date(sortedMatches[index - 1].utcDate).toDateString()

        return (
          <div key={match.id}>
            {showDate && <DateHeader date={match.utcDate} />}
            {showCompetition && <CompetitionHeader match={match} />}
            <Matches match={match} showCompetition={showCompetition} />
          </div>
        )
      })}
    </div>
  )
}

export default Competition
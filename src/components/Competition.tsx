import { matchesType } from '@/types'
import Image from 'next/image'

interface LeagueTableProps {
  data: matchesType
  matches: matchesType[] // <-- add this prop
}

const Competition = ({data, matches }:LeagueTableProps) => {
  const nd = new Date(data?.utcDate)
  const dateConvert = nd.toDateString()

  console.log('Name', data?.competition);
  
  
  return (
    // <div className='mb-4 flex justify-between items-center px-4 py-1 bg-slate-600 hover:bg-slate-700 rounded-md'>
    //   <div className='flex space-x-4'>
    //     <Image src={data?.competition.emblem} alt={data?.competition.name} width={20} height={20} />
    //     <p className='text-sm text-teal-400'>{data?.competition.name}</p>
    //   </div>
    //   <p className='text-xs md:text-sm'>{dateConvert}</p>
    // </div>

    <div className="flex flex-col">
      {matches.map((match, index) => {
        const showCompetition =
          index === 0 || match.competition.id !== matches[index - 1].competition.id

        return (
          <div key={match.id} className="mb-2">
            {/* Competition header */}
            {showCompetition && (
              <div className="mb-1 flex items-center px-4 py-1 bg-slate-600 hover:bg-slate-700 rounded-md">
                <Image
                  src={match.competition.emblem || ''}
                  alt={match.competition.name || ''}
                  width={20}
                  height={20}
                />
                <p className="ml-2 text-sm text-teal-400">{match.competition.name}</p>
              </div>
            )}

            {/* Match row */}
            <div className="flex justify-between px-6 py-1 bg-slate-700 rounded-md">
              <p>{match.homeTeam?.shortName ?? 'Unknown'}</p>
              <p>{match.score?.fullTime?.home ?? '-'}:{match.score?.fullTime?.away ?? '-'}</p>
              <p>{match.awayTeam?.shortName ?? 'Unknown'}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Competition
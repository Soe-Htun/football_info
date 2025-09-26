import Competition from './Competition'
import {matchesType} from '@/types'
import Matches from './Matches'

interface LeagueTableProps {
  data: matchesType
  matches: matchesType[] // <-- add this prop
}

const LeagueTable = ({data, matches }: LeagueTableProps) => {
  return (
    <div className='py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2'>
      <Competition matches={matches} data={data} />
      <Matches data={data} />
    </div>
  )
}

export default LeagueTable
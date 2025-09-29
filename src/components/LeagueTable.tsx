import Competition from './Competition'
import {matchesType} from '@/types'
import Matches from './Matches'

interface LeagueTableProps {
  matches: matchesType[]
}

const LeagueTable = ({matches}: LeagueTableProps) => {
  return (
    <div className='py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2'>
      <Competition matches={matches} />
      {/* <Matches data={matches[0]} /> */}
    </div>
  )
}

export default LeagueTable
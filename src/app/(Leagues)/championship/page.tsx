import { filterLeague } from '@/api'
import LeagueTable from '@/components/LeagueTable'

const Championship = async () => {
  const getChampionship = await filterLeague('Championship')
  return (
    <div className='w-full'>
      <LeagueTable matches={getChampionship} />
    </div>
  )
}

export default Championship
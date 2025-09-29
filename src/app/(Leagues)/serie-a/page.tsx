import { filterLeague } from '@/api'
import LeagueTable from '@/components/LeagueTable'

const SerieA= async () => {
  const getSerieA= await filterLeague('Serie A')
  return (
    <div className='w-full'>
      <LeagueTable matches={getSerieA} />
    </div>
  )
}

export default SerieA
import { filterLeague } from '@/api'
import LeagueTable from '@/components/LeagueTable'

const Brasileiro = async () => {
  const getBrasileiro = await filterLeague('Campeonato Brasileiro Série A')
  return (
    <div className='w-full'>
      <LeagueTable matches={getBrasileiro} />
    </div>
  )
}

export default Brasileiro
import { filterLeague } from '@/api'
import LeagueTable from '@/components/LeagueTable'

const PrimeiraLiga = async () => {
  const getPrimeiraLiga = await filterLeague('Primeira Liga')
  return (
    <div className='w-full'>
      <LeagueTable matches={getPrimeiraLiga} />
    </div>
  )
}

export default PrimeiraLiga
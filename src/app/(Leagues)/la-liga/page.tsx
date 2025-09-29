import { filterLeague } from "@/api"
import LeagueTable from "@/components/LeagueTable"


const LaLiga = async () => {
  const getLaLiga = await filterLeague('Primera Division')

  return (
    <div className='w-full'>
      <LeagueTable matches={getLaLiga} />
    </div>
  )
}

export default LaLiga
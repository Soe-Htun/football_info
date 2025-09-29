import { filterLeague } from "@/api"
import LeagueTable from "@/components/LeagueTable"


const Ligue1 = async () => {
  const getLigue1 = await filterLeague('Ligue 1')
  return (
    <div className='w-full'>
      <LeagueTable matches={getLigue1} />
    </div>
  )
}

export default Ligue1
import { filterLeague } from "@/api"
import LeagueTable from "@/components/LeagueTable"


const Bundesliga = async () => {
  const getBundesliga = await filterLeague('Bundesliga')
  return (
    <div className='w-full'>
      <LeagueTable matches={getBundesliga} />
    </div>
  )
}

export default Bundesliga
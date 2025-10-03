import { filterLeagueFlexible} from "@/api"
import LeagueTable from "@/components/LeagueTable"

const SaudiProLeague = async () => {
  const getSaudiLeague = await filterLeagueFlexible('Saudi Pro League')

  return (
    <div className='w-full'>
      <LeagueTable matches={getSaudiLeague} />
    </div>
  )
}

export default SaudiProLeague
import { filterLeague} from "@/api"
import LeagueTable from "@/components/LeagueTable"

const English = async () => {
  const getEnglishLeague = await filterLeague('Premier League')

  return (
    <div className='w-full'>
      <LeagueTable matches={getEnglishLeague} />
    </div>
  )
}

export default English
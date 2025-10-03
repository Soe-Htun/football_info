import { filterLeagueFlexible} from "@/api"
import LeagueTable from "@/components/LeagueTable"

const MLS = async () => {
  const getMLS = await filterLeagueFlexible('Major League Soccer')

  return (
    <div className='w-full'>
      <LeagueTable matches={getMLS} />
    </div>
  )
}

export default MLS
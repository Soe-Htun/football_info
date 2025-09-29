import { filterLeague } from "@/api"
import LeagueTable from "@/components/LeagueTable"


const CopaLibertadores = async () => {
  const getCopaLibertadores = await filterLeague('Copa Libertadores')
  return (
    <div className='w-full'>
      <LeagueTable matches={getCopaLibertadores} />
    </div>
  )
}

export default CopaLibertadores
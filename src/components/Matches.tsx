import Image from 'next/image'
import { matchesType } from '@/types';

const Matches = ({data}:{data:matchesType}) => {
  const getDate = new Date(data?.utcDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const [ time, period ] = getDate.split(' ');

  const teamNameMap: Record<string, string> = {
    Atleti: "Atletico Madrid",
    Barça: "Barcelona",
  }

  const homeTeamName = teamNameMap[data?.homeTeam?.shortName!] || data?.homeTeam?.shortName
  const awayTeamName = teamNameMap[data?.awayTeam?.shortName!] || data?.awayTeam?.shortName

  return (
    <div className='grid grid-cols-5'>
      <div className='w-full col-span-2 flex items-center justify-end'>
        <p className='text-sm'>{ homeTeamName }</p>
        <div className='w-[20px] h-[20px] relative ml-2'>
          <Image src={data?.homeTeam?.crest!} alt={data?.homeTeam?.shortName!} fill className='object-cover' />
        </div>
      </div> 
      <div className='px-1 m-auto text-center flex justify-center items-center rounded-md'>
        {data?.status == 'FINISHED' ? (
          <p className='py-1 text-teal-400 text-xs'>{data?.score?.fullTime.home} : {data.score?.fullTime.away}</p>
          ) : (
          <div className='flex flex-col py-1'>
            <p className='text-teal-400 text-xs'>{ time }</p>
            <p className='text-teal-400 text-[10px]'>{ period }</p>
          </div>
        )}
      </div>
      <div className='w-full col-span-2 flex items-center justify-start'>
        <div className='w-[20px] h-[20px] relative mr-2'>
          <Image src={data?.awayTeam?.crest!} alt={data.awayTeam?.shortName!} fill className='object-cover' />
        </div>
        <p className='text-sm text-right'>{ awayTeamName }</p>
      </div>
    </div>
  )
}

export default Matches
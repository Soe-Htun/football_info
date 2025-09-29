import {FC} from 'react'
import LinkSide from './LinkSide'

const Leagues = [
  { id:1,name:"Champions League",href:"champions-league",emblem:"/img/leagues/ucl.png"},
  { id:2,name:"Europa League",href:"europa-league",emblem:"/img/leagues/uel.png"},
  { id:3,name:"Conference League",href:"conference-league",emblem:"/img/leagues/ucel.png"},
  { id:4,name:"Premier League",href:"premier-league",emblem:"/img/leagues/premier_league.webp"},
  { id:5,name:"LaLiga",href:"la-liga",emblem:"/img/leagues/laliga.svg"},
  { id:6,name:"Bundesliga",href:"bundesliga",emblem:"/img/leagues/bundesliga.webp"},
  { id:7,name:"Serie A",href:"serie-a",emblem:"/img/leagues/serie_a.webp"},
  { id:8,name:"Ligue 1",href:"ligue-1",emblem:"/img/leagues/ligue_1.webp"},
  { id:10,name:"Primeira Liga",href:"primeira-liga",emblem:"/img/leagues/liga_portugal.webp"},
  { id:11,name:"Brazilian Championship Series A",href:"brazilian-series-a",emblem:"/img/leagues/brazilian_serie_a.webp"},
  { id:12,name:"Copa Libertadores",href:"copa-libertadores",emblem:"/img/leagues/copa_libertadores.webp"},
]

const Sidebar:FC = () => {
  return (
    <section className='px-2 md:px-4 py-2 bg-[rgb(40,46,58)] rounded-md'>
      <div>
        <h1 className='font-bold text-xl mb-4 text-teal-400'>Leagues</h1>
        <ul className='space-y-2'>
          {
            Leagues.map((league) => (
              <div key={league?.id} className='flex'>
                <LinkSide href={league.href} name={league?.name} src={league?.emblem} />
              </div>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default Sidebar
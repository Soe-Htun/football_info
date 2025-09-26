import { apiOptions, matchesType } from "@/types"

const options:apiOptions =  {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
}
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getMatchesForDate = async (date: Date) => {
  const dateStr = formatDate(date)
  const res = await fetch(
    `https://api.football-data.org/v4/matches?date=${dateStr}`,
    options
  )
  if (!res.ok) {
    throw new Error(`Matches API error: ${res.status}`)
  }
  return res.json()
}

// Fetch matches for yesterday, today, tomorrow
export const getMatchesYesterday = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return getMatchesForDate(d)
}

export const getMatchesToday = () => {
  return getMatchesForDate(new Date())
}

export const getMatchesTomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return getMatchesForDate(d)
}

export const getMatchesfootball = async () => {
  const matchData = await fetch('https://api.football-data.org/v4/matches',options)
  return matchData.json()
}

const todayDate = new Date()
const getDateMonth = new Date(todayDate.getTime());
getDateMonth.setDate(todayDate.getDate() - 1);
const year = getDateMonth.getFullYear()
const month = String(getDateMonth.getMonth() + 1).padStart(2, '0');
const day = String(getDateMonth.getDate()).padStart(2, '0');

const yesterday = [year, month, day].join('-');
  
export const getMatchesfootballFinished = async () => {
  const matchData = await fetch(`https://api.football-data.org/v4/matches?date=${yesterday}`,options)
  return matchData.json()
}

export const getNewsInfo = async () => {
  const newsData = await fetch(`https://newsapi.org/v2/everything?apiKey=${process.env.API_TOKEN_NEWS}&q=soccer&pageSize=5`,{next:{revalidate:20}})
  if (!newsData.ok) {
    throw new Error(`News API error: ${newsData.status}`)
  }
  return newsData.json()
}

// export const filterLeague = async (filterData:string) => {
//   const getEnglishLeague = await getMatchesfootball();
//   const filterPremierLeague:matchesType[] = getEnglishLeague?.matches
//   const getData = filterPremierLeague.filter((item) => item.competition.name === filterData)
//   return getData
// }

// League filter
export const filterLeague = async (filterData: string) => {
  const today = await getMatchesToday()
  const matches: matchesType[] = today?.matches
  return matches.filter((m) => m.competition.name === filterData)
}
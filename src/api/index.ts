import { apiOptions, matchesType } from "@/types"

const options:apiOptions =  {
  next: { revalidate: 60 }, // Cache for 1 minute to avoid rate limits
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
}

// Client-side cache for real-time updates
const clientCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 30000 // 30 seconds

// Removed API-Football integration (requires paid subscription)
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getMatchesForDate = async (date: Date, useCache = true) => {
  // Return empty data during build if no API token
  if (!process.env.API_TOKEN) {
    console.log('No API token found, returning empty data for build')
    return { matches: [] }
  }

  const dateStr = formatDate(date)
  const cacheKey = `matches-${dateStr}`

  // Check client-side cache first
  if (useCache && clientCache.has(cacheKey)) {
    const cached = clientCache.get(cacheKey)!
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Using cached data for ${dateStr}`)
      return cached.data
    }
  }

  console.log(`Fetching matches for date: ${dateStr}`)
  const res = await fetch(
    `https://api.football-data.org/v4/matches?date=${dateStr}`,
    options
  )
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error(`Rate limit exceeded. Please wait a moment before refreshing.`)
    }
    throw new Error(`Matches API error: ${res.status}`)
  }
  const data = await res.json()
  console.log(`API returned ${data?.matches?.length || 0} matches for ${dateStr}`)

  // Cache the result
  clientCache.set(cacheKey, { data, timestamp: Date.now() })

  return data
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

export const getMatchesWeek = async () => {
  const promises = []
  const today = new Date()

  // Get matches for the past 3 days and next 3 days
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    promises.push(getMatchesForDate(date))
  }

  const results = await Promise.all(promises)
  const allMatches = results.flatMap(result => result?.matches || [])

  return { matches: allMatches }
}

export const getMatchesTomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return getMatchesForDate(d)
}

export const getMatchesfootball = async () => {
  console.log('Fetching all matches without date filter...')
  const matchData = await fetch('https://api.football-data.org/v4/matches',options)
  const data = await matchData.json()
  console.log('All matches endpoint returned:', data?.matches?.length || 0, 'matches')

  // Check for UEFA competitions in the general endpoint
  if (data?.matches) {
    const uefaMatches = data.matches.filter((m: any) => {
      const name = m.competition.name.toLowerCase()
      return name.includes('europa') || name.includes('champions') || name.includes('uefa')
    })
    console.log('UEFA matches in general endpoint:', uefaMatches.length)
  }

  return data
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
  // Return empty data during build if no API token
  if (!process.env.API_TOKEN_NEWS) {
    console.log('No news API token found, returning empty data for build')
    return { articles: [] }
  }

  const newsData = await fetch(`https://newsapi.org/v2/everything?apiKey=${process.env.API_TOKEN_NEWS}&q=soccer&pageSize=5`,{next:{revalidate:300}}) // 5 minute cache
  if (!newsData.ok) {
    if (newsData.status === 429) {
      throw new Error(`News rate limit exceeded. Please wait before refreshing.`)
    }
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
  console.log('Matches', matches);
  
  return matches.filter((m) => m.competition.name === filterData)
}

// Enhanced league filter for UEFA competitions (checks whole week)
export const filterLeagueFlexible = async (filterData: string) => {
  // For UEFA competitions, check a wider date range since they don't play daily
  const isUEFA = filterData.includes('UEFA') || filterData.includes('Champions') ||
                 filterData.includes('Europa') || filterData.includes('Conference')

  let matchesData
  if (isUEFA) {
    // Check whole week for UEFA competitions
    matchesData = await getMatchesWeek()
  } else {
    // Just today for domestic leagues
    matchesData = await getMatchesToday()
  }

  const matches: matchesType[] = matchesData?.matches || []

  // Define competition name mappings
  const competitionMappings: Record<string, string[]> = {
    'UEFA Champions League': [
      'UEFA Champions League',
      'Champions League',
      'UEFA Champions League - Qualifying',
      'Champions League - Qualifying'
    ],
    'UEFA Europa League': [
      'UEFA Europa League',
      'Europa League',
      'UEFA Europa League - Qualifying',
      'Europa League - Qualifying'
    ],
    'UEFA Conference League': [
      'UEFA Conference League',
      'Conference League',
      'UEFA Europa Conference League',
      'Europa Conference League'
    ]
  }

  // Try exact match first
  let result = matches.filter((m) => m.competition.name === filterData)

  // If no exact match, try alternative names
  if (result.length === 0 && competitionMappings[filterData]) {
    for (const altName of competitionMappings[filterData]) {
      result = matches.filter((m) => m.competition.name === altName)
      if (result.length > 0) break
    }
  }

  // If still no matches, try partial matching for UEFA competitions
  if (result.length === 0) {
    if (filterData.includes('Champions')) {
      result = matches.filter((m) => m.competition.name.includes('Champions'))
    } else if (filterData.includes('Europa') && !filterData.includes('Conference')) {
      result = matches.filter((m) =>
        m.competition.name.includes('Europa') && !m.competition.name.includes('Conference')
      )
    } else if (filterData.includes('Conference')) {
      result = matches.filter((m) => m.competition.name.includes('Conference'))
    }
  }

  return result
}

// Removed match details and API-Football functions
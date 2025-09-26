"use client"

import { useState } from "react"
import { matchesType } from "@/types"
import LeagueTable from "./LeagueTable"

const Status = ({ matches }: { matches: matchesType[] }) => {
  const [dayOffset, setDayOffset] = useState(0)

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }

  const getLabel = (offset: number, date: Date): string => {
    if (offset === 0) return "Today"
    if (offset === -1) return "Yesterday"
    if (offset === 1) return "Tomorrow"
    return formatDate(date)
  }

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + dayOffset)
  targetDate.setHours(0, 0, 0, 0)

  const filteredMatches = matches.filter((m) => {
    const matchDate = new Date(m.utcDate)
    matchDate.setHours(0, 0, 0, 0)
    return matchDate.getTime() === targetDate.getTime()
  })

  return (
    <div>
      {/* Date navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setDayOffset((p) => p - 1)}
          className="px-2 py-1 text-primary text-xs md:text-sm rounded-md bg-slate-500 hover:bg-slate-600"
        >
          {"<"}
        </button>
        <span className="font-semibold text-sm md:text-base">
          {getLabel(dayOffset, targetDate)}
        </span>
        <button
          onClick={() => setDayOffset((p) => p + 1)}
          className="px-2 py-1 text-primary text-xs md:text-sm rounded-md bg-slate-500 hover:bg-slate-600"
        >
          {">"}
        </button>
      </div>

      {/* Matches */}
      <div className="w-full">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((data) => (
            <div key={data.id}>
              <LeagueTable matches={filteredMatches} data={data} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-4">
            No matches scheduled for {formatDate(targetDate)}.
          </div>
        )}
      </div>
    </div>
  )
}

export default Status

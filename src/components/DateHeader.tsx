interface DateHeaderProps {
  date: string
}

const DateHeader = ({ date }: DateHeaderProps) => {
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString)
    const weekday = dateObj.toLocaleDateString('en-GB', { weekday: 'short' })
    const day = dateObj.toLocaleDateString('en-GB', { day: '2-digit' })
    const month = dateObj.toLocaleDateString('en-GB', { month: 'short' })
    return `${weekday} ${day} ${month}`
  }

  return (
    <div className="mb-2 px-1">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {formatDate(date)}
      </h3>
    </div>
  )
}

export default DateHeader
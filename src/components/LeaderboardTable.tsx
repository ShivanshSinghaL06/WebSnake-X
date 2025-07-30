import { Trophy, Medal, Award } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  timestamp: string
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400 dark:text-gray-300" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className={`flex items-center justify-between p-4 rounded-lg border ${
            index === 0 ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800' :
            index === 1 ? 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800' :
            index === 2 ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' :
            'bg-background border-border'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8">
              {getRankIcon(index + 1)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{entry.playerName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(entry.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-foreground">{entry.score}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
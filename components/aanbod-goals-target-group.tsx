import { Target, Users } from "lucide-react"

interface AanbodGoalsTargetGroupProps {
  goals: string[]
  targetGroups: string[]
}

export function AanbodGoalsTargetGroup({ goals, targetGroups }: AanbodGoalsTargetGroupProps) {
  return (
    <div className="bg-blue-50 rounded-xl p-8 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Doelen van deze vorming */}
        <div className="bg-white rounded-lg border border-blue-100 p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Target className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0" />
            <h2 className="text-xl font-bold text-slate-800">Doelen van deze vorming</h2>
          </div>
          <ul className="space-y-4">
            {goals.map((goal, index) => (
              <li key={index} className="flex items-start">
                <span className="text-teal-600 mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-base text-slate-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Doelgroep */}
        <div className="bg-white rounded-lg border border-blue-100 p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0" />
            <h2 className="text-xl font-bold text-slate-800">Doelgroep</h2>
          </div>
          <ul className="space-y-3">
            {targetGroups.map((group, index) => (
              <li key={index} className="flex items-start">
                <span className="text-teal-600 mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-base text-slate-700">{group}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AanbodGoalsTargetGroup

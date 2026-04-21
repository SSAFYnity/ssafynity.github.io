import { operator2022 } from './2022'
import { operator2023 } from './2023'
import { operator2024 } from './2024'
import { operator2025 } from './2025'
import { operator2026 } from './2026'
import { operatorAssignmentsByYear, publicOperatorProfiles } from './registry'

const rawOperatorData = [
  operator2022,
  operator2023,
  operator2024,
  operator2025,
  operator2026,
] as const

export const operatorData = rawOperatorData.map((operator) => ({
  ...operator,
  groups: operator.groups.map((group, groupIndex) => ({
    ...group,
    members: group.members.map((member, memberIndex) => {
      const operatorId = operatorAssignmentsByYear[operator.year]?.[groupIndex]?.[memberIndex] ?? undefined
      return operatorId ? { ...member, operatorId } : member
    }),
  })),
}))

export { publicOperatorProfiles }

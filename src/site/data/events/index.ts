import type { Event } from '@/data/constants'

import { events2022 } from './2022'
import { events2023 } from './2023'
import { events2024 } from './2024'
import { events2025 } from './2025'
import { events2026 } from './2026'

export const eventsByYear = {
  2022: events2022,
  2023: events2023,
  2024: events2024,
  2025: events2025,
  2026: events2026,
} as const satisfies Record<number, readonly Event[]>

export const allEvents: Event[] = [
  ...events2022,
  ...events2023,
  ...events2024,
  ...events2025,
  ...events2026,
]
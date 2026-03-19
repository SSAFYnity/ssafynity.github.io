import * as React from 'react'

import { collapseNewlines, normalizeNewlines } from '@/lib/text'

type NewlineMode = 'auto' | 'desktop' | 'mobile' | 'always' | 'space'

export function ResponsiveText({
  text,
  newline = 'auto',
}: {
  text: string
  newline?: NewlineMode
}) {
  if (newline === 'space') return <>{collapseNewlines(text)}</>

  const normalized = normalizeNewlines(text)
  const lines = normalized.split('\n')

  if (lines.length <= 1) return <>{text}</>

  const mode: Exclude<NewlineMode, 'auto'> =
    newline === 'auto' ? (lines.length >= 3 ? 'always' : 'desktop') : newline

  return (
    <>
      {lines.map((line, idx) => {
        const chunk = line.trim()

        if (idx === 0) return <React.Fragment key={idx}>{chunk}</React.Fragment>

        if (mode === 'always') {
          return (
            <React.Fragment key={idx}>
              <br />
              {chunk}
            </React.Fragment>
          )
        }

        if (mode === 'mobile') {
          return (
            <React.Fragment key={idx}>
              <span className="hidden sm:inline"> </span>
              <br className="sm:hidden" />
              {chunk}
            </React.Fragment>
          )
        }

        // desktop
        return (
          <React.Fragment key={idx}>
            <span className="sm:hidden"> </span>
            <br className="hidden sm:block" />
            {chunk}
          </React.Fragment>
        )
      })}
    </>
  )
}
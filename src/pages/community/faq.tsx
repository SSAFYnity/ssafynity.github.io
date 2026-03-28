import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, ExternalLink, Mail, X } from 'lucide-react'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { SearchBar } from '@/components/SearchBar'
import { siteData } from '@/data/siteData'
import { FAQ_CATEGORY_ORDER, FAQ_SECTIONS, type FaqAnswer, type FaqCategoryKey } from '@/data/faqs'
import { ROUTES } from '@/lib/routes'
import { HERO_FADE_UP } from '@/lib/motion'

type FlatFaqItem = {
  q: string
  a: ReactNode
  keywords?: readonly string[]
  categoryKey: FaqCategoryKey
  categoryLabel: string
  order: number
}

const FAQ_PAGE_SIZE = 12

function buildPageRange(current: number, total: number): readonly (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set<number>([1, total, current - 2, current - 1, current, current + 1, current + 2])
  const list = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)

  const out: Array<number | '...'> = []
  for (let i = 0; i < list.length; i++) {
    const p = list[i]
    const prev = list[i - 1]
    if (i > 0 && prev != null && p - prev > 1) out.push('...')
    out.push(p)
  }
  return out
}

function mainEmailUrl(): string {
  return siteData.sns.find(s => s.name === 'Gmail')?.url ?? 'mailto:ssafynity@gmail.com'
}

function mailtoWithTemplate(emailUrl: string, subject?: string, body?: readonly string[]): string {
  const base = emailUrl.startsWith('mailto:') ? emailUrl : `mailto:${emailUrl}`

  const params: string[] = []
  if (subject && subject.trim().length > 0) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body && body.length > 0) params.push(`body=${encodeURIComponent(body.join('\n'))}`)

  if (params.length === 0) return base
  return `${base}${base.includes('?') ? '&' : '?'}${params.join('&')}`
}

function renderFaqAnswer(answer: FaqAnswer, emailUrl: string): ReactNode {
  const paragraphs = answer.paragraphs
  const ctas = answer.ctas ?? []

  const primaryClass =
    'inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors'
  const secondaryClass =
    'inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors'

  const renderCtas = () => {
    if (ctas.length === 0) return null

    return (
      <div className="flex flex-wrap gap-2">
        {ctas.map((cta, idx) => {
          const variant = cta.variant ?? 'primary'
          const className = variant === 'secondary' ? secondaryClass : primaryClass

          if (cta.kind === 'internal') {
            return (
              <Link
                key={`${cta.kind}-${cta.to}-${idx}`}
                to={ROUTES[cta.to]}
                className={className}
              >
                {cta.label} <ExternalLink size={14} />
              </Link>
            )
          }

          const href = mailtoWithTemplate(emailUrl, cta.subject, cta.body)
          return (
            <a
              key={`${cta.kind}-${idx}`}
              href={href}
              className={className}
            >
              {cta.label} <Mail size={14} />
            </a>
          )
        })}
      </div>
    )
  }

  if (ctas.length === 0 && paragraphs.length === 1) {
    return (
      <p className="text-sm text-slate-600 leading-relaxed break-keep">
        {paragraphs[0]}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-slate-600 leading-relaxed break-keep">
          {p}
        </p>
      ))}
      {renderCtas()}
    </div>
  )
}

function FaqEntry({ q, a }: { q: string; a: ReactNode }) {
  return (
    <Card
      as="details"
      className="group overflow-hidden border-slate-200/70 bg-white hover:border-slate-200 hover:shadow-sm transition-all"
    >
      <summary className="list-none cursor-pointer px-5 py-4 flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-200/80 transition-colors">
        <span className="min-w-0 text-sm font-extrabold text-slate-900 leading-relaxed break-keep group-open:text-blue-900">
          {q}
        </span>

        <span className="mt-0.5 shrink-0 text-slate-400 group-open:text-blue-600 group-open:rotate-180 transition-all">
          <ChevronDown size={18} />
        </span>
      </summary>

      <div className="px-5 pb-5">
        <div className="pt-3 border-t border-slate-100 group-open:border-blue-100">
          <div className="text-sm text-slate-600 leading-relaxed break-keep">{a}</div>
        </div>
      </div>
    </Card>
  )
}

export default function CommunityFaqPage() {
  const emailUrl = mainEmailUrl()

  const [category, setCategory] = useState<FaqCategoryKey | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const applySearch = () => {
    setPage(1)
    setQuery(inputValue.trim())
  }

  const hasFilter = category !== null || query.trim().length > 0

  const orderedSections = useMemo(() => {
    return FAQ_CATEGORY_ORDER
      .map(key => FAQ_SECTIONS.find(s => s.key === key))
      .filter((s): s is (typeof FAQ_SECTIONS)[number] => s != null)
  }, [])

  const allItems = useMemo<readonly FlatFaqItem[]>(() => {
    return orderedSections.flatMap((section, sectionIndex) =>
      section.items.map((item, itemIndex) => ({
        q: item.q,
        a: renderFaqAnswer(item.a, emailUrl),
        keywords: item.keywords,
        categoryKey: section.key,
        categoryLabel: section.title,
        order: sectionIndex * 1000 + itemIndex,
      })),
    )
  }, [emailUrl, orderedSections])

  const filtered = useMemo<readonly FlatFaqItem[]>(() => {
    const kw = query.trim().toLowerCase()

    return allItems
      .filter(e => category === null || e.categoryKey === category)
      .filter(e => {
        if (!kw) return true
        if (e.q.toLowerCase().includes(kw)) return true
        if (e.categoryLabel.toLowerCase().includes(kw)) return true
        if ((e.keywords ?? []).some(k => k.toLowerCase().includes(kw))) return true
        return false
      })
  }, [allItems, category, query])

  const orderedItems = useMemo(() => {
    const items = [...filtered]

    items.sort((a, b) => a.order - b.order)

    return items
  }, [filtered])

  const pageCount = Math.max(1, Math.ceil(orderedItems.length / FAQ_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageStart = (currentPage - 1) * FAQ_PAGE_SIZE
  const pageEnd = Math.min(pageStart + FAQ_PAGE_SIZE, orderedItems.length)
  const pagedItems = orderedItems.slice(pageStart, pageEnd)
  const pageButtons = buildPageRange(currentPage, pageCount)

  const resetAll = () => {
    setCategory(null)
    setPage(1)
    setInputValue('')
    setQuery('')
  }

  const isAllCategories = category === null

  const toggleCategory = (key: FaqCategoryKey) => {
    setPage(1)
    setCategory(prev => (prev === key ? null : key))
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white pt-20 sm:pt-24 pb-12 sm:pb-14 lg:pt-28 lg:pb-20 border-b border-slate-100">
        <Container maxWidth="5xl">
          <motion.div {...HERO_FADE_UP}>
            <HeroLabel>Community</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              FAQ
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">Frequently Asked Questions</p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-2xl">
              자주 묻는 질문을 모았습니다. 원하는 답이 없다면 공식 채널로 문의해 주세요.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-slate-50 pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-20">
        <Container maxWidth="5xl" className="flex flex-col gap-10 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="sticky sm:static top-[calc(4.5rem+env(safe-area-inset-top))] z-40 bg-white border border-slate-200 p-4 rounded-2xl mb-6 shadow-sm sm:shadow-none">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPage(1)
                        setCategory(null)
                      }}
                      className={`flex items-center gap-1.5 pl-3.5 pr-3.5 py-2 sm:py-1.5 rounded-full text-sm sm:text-xs font-black border transition-colors ${
                        isAllCategories
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      전체
                    </button>
                    {orderedSections.map(section => {
                      const active = category === section.key
                      return (
                        <button
                          key={section.key}
                          type="button"
                          onClick={() => toggleCategory(section.key)}
                          className={`flex items-center gap-1.5 pl-3.5 pr-3.5 py-2 sm:py-1.5 rounded-full text-sm sm:text-xs font-black border transition-colors ${
                            active
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                          }`}
                        >
                          {section.title}
                        </button>
                      )
                    })}
                  </div>

                  {hasFilter && (
                    <button
                      onClick={resetAll}
                      className="text-[10px] font-black text-slate-400 hover:text-blue-500 transition-colors shrink-0"
                    >
                      초기화
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-full sm:flex-1">
                    <SearchBar
                      value={inputValue}
                      onChange={setInputValue}
                      onSubmit={applySearch}
                      placeholder="질문 검색"
                    />
                  </div>
                </div>
              </div>

              {query.trim().length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2.5 mt-2.5 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {query}
                    <button
                      onClick={() => {
                        setPage(1)
                        setQuery('')
                        setInputValue('')
                      }}
                      className="flex items-center hover:text-blue-800 transition-colors"
                    >
                      <X size={9} />
                    </button>
                  </span>
                </div>
              )}
            </Card>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <p className="text-sm text-slate-400">조건에 맞는 질문이 없습니다.</p>
                {hasFilter && (
                  <button
                    onClick={resetAll}
                    className="text-xs font-black text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    필터 초기화
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid gap-3">
                  {pagedItems.map(item => (
                    <FaqEntry
                      key={`${item.categoryKey}-${item.q}`}
                      q={item.q}
                      a={item.a}
                    />
                  ))}
                </div>

                {pageCount > 1 && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
                    <p className="text-[11px] font-black text-slate-400">
                      {pageStart + 1}-{pageEnd} / {orderedItems.length}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={
                          'h-8 px-3 rounded-xl text-xs font-black border transition-colors ' +
                          (currentPage === 1
                            ? 'border-slate-200 bg-white text-slate-300 cursor-not-allowed'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                        }
                      >
                        이전
                      </button>

                      {pageButtons.map((p, idx) => {
                        if (p === '...') {
                          return (
                            <span
                              key={`ellipsis-${idx}`}
                              className="h-8 px-2 inline-flex items-center text-xs font-black text-slate-300"
                            >
                              ...
                            </span>
                          )
                        }

                        const active = p === currentPage
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPage(p)}
                            className={
                              'w-8 h-8 rounded-xl text-xs font-black border transition-colors ' +
                              (active
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50')
                            }
                          >
                            {p}
                          </button>
                        )
                      })}

                      <button
                        type="button"
                        onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                        disabled={currentPage === pageCount}
                        className={
                          'h-8 px-3 rounded-xl text-xs font-black border transition-colors ' +
                          (currentPage === pageCount
                            ? 'border-slate-200 bg-white text-slate-300 cursor-not-allowed'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                        }
                      >
                        다음
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Card className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold text-slate-900 mb-1">원하는 답을 찾지 못하셨나요?</p>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">
                    공식 채널로 문의해 주시면 확인 후 안내해 드립니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={ROUTES.communitySns}
                    className="inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    공식 채널 <ExternalLink size={14} />
                  </Link>
                  <a
                    href={emailUrl}
                    className="inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    공식 메일 <Mail size={14} />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}





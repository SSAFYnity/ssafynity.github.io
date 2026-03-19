import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, ExternalLink, Mail } from 'lucide-react'
import type { IconType } from 'react-icons'
import { SiDiscord, SiGithub, SiGmail, SiInstagram, SiKakaotalk, SiLinkedin } from 'react-icons/si'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { Kicker } from '@/components/Kicker'
import { siteData } from '@/data/siteData'
import { HERO_FADE_UP } from '@/lib/motion'

const ICON_MAP = {
  kakao: SiKakaotalk,
  instagram: SiInstagram,
  linkedin: SiLinkedin,
  github: SiGithub,
  gmail: SiGmail,
  discord: SiDiscord,
} as const satisfies Record<string, IconType>

type Channel = (typeof siteData.sns)[number] & { ready: boolean }

type CommonTabKey = 'summary' | 'audience' | 'usage' | 'howto'

const COMMON_TABS: ReadonlyArray<{ key: CommonTabKey; label: string }> = [
  { key: 'summary',  label: '요약' },
  { key: 'audience', label: '참여대상' },
  { key: 'usage',    label: '주 사용처' },
  { key: 'howto',    label: '참여 방법' },
]

type ChannelTab = {
  key: CommonTabKey
  label: string
  bullets: readonly string[]
}

type ChannelDetails = Partial<Record<CommonTabKey, readonly string[]>>

const DETAILS_BY_NAME: Record<string, ChannelDetails> = {
  KakaoTalk: {
    summary:  ['공식 공지/행사 알림을 가장 빠르게 받는 채널입니다.', '놓치면 안 되는 소식 수신용으로 권장합니다.'],
    audience: ['모든 동문(구독 중심)에게 권장합니다.', '실시간 대화/모임 참여는 Discord가 더 적합합니다.'],
    usage:    ['행사 오픈/모집/일정 변경 등 공지를 확인합니다.', '간단한 질문/안내 확인에 적합합니다.'],
    howto:    ['채널 추가 후 알림을 켜 주세요.', '첨부/긴 문의는 메일을 권장합니다.'],
  },
  'KakaoTalk(오픈채팅)': {
    summary:  ['정회원 전용 카카오톡 오픈채팅입니다.', '정회원 간 네트워킹/소통을 위한 전용 채널입니다.'],
    audience: ['정회원 전용입니다.', '정회원이 아닌 경우 링크가 공개되지 않습니다.'],
    usage:    ['정회원 전용 공지/소통 채널로 사용됩니다.', '정회원 커뮤니티 참여가 필요한 경우 이용합니다.'],
    howto:    ['오픈채팅 링크는 공개되지 않습니다.', '정회원 등록 완료 시에만 별도로 안내됩니다.'],
  },
  Discord: {
    summary:  ['동문 커뮤니티의 실시간 소통 채널입니다.', '대화/질문/소모임 참여에 적합합니다.'],
    audience: ['커뮤니티 대화·네트워킹을 원하는 동문에게 권장합니다.', '공지 수신만 목적이면 KakaoTalk만으로도 충분합니다.'],
    usage:    ['주제별 채널에서 질문/대화를 나눕니다.', '실시간 공지/모임 안내를 확인합니다.'],
    howto:    ['초대 링크로 입장 후 안내 채널을 먼저 확인해 주세요.', '닉네임/규칙 안내에 따라 참여해 주세요.'],
  },
  Instagram: {
    summary:  ['활동 사진/후기/하이라이트 중심의 소식 채널입니다.', '분위기·현장 스냅을 가볍게 보기 좋아요.'],
    audience: ['SSAFYnity 활동을 팔로우하고 싶은 분에게 권장합니다.', '문의/대화 목적이면 메일 또는 Discord가 더 적합합니다.'],
    usage:    ['행사 스냅/후기 콘텐츠를 확인합니다.', '하이라이트/프로필 링크로 주요 정보를 확인합니다.'],
    howto:    ['팔로우 후 최신 게시물/스토리 하이라이트를 확인해 주세요.', '공식 링크는 이 페이지에 안내된 링크만 사용해 주세요.'],
  },
  LinkedIn: {
    summary:  ['대외 소식/성과/협력 중심의 공식 채널입니다.', '커리어 네트워킹 관점에서 보기 좋습니다.'],
    audience: ['커리어/대외 협력 소식에 관심 있는 분에게 권장합니다.', '캐주얼 소통은 Discord가 더 적합합니다.'],
    usage:    ['대외 행사/성과/협력 소식을 확인합니다.', '공식 톤의 업데이트를 모아볼 수 있습니다.'],
    howto:    ['회사 페이지를 팔로우해 업데이트를 받아보세요.', '필요 시 게시물의 링크로 추가 정보를 확인해 주세요.'],
  },
  GitHub: {
    summary:  ['공홈/프로젝트 등 오픈소스 기여를 위한 채널입니다.', '개선 제안은 Issue, 수정 기여는 PR로 진행합니다.'],
    audience: ['개발/문서 개선에 기여할 동문에게 권장합니다.', '단순 소식 확인 목적이면 다른 채널이 더 편합니다.'],
    usage:    ['버그/개선 제안을 Issue로 남깁니다.', '코드/문서 변경은 PR로 기여합니다.'],
    howto:    ['관련 저장소에서 Issue 템플릿을 선택해 작성해 주세요.', '기여 전 가이드를 확인해 주세요.'],
  },
}
function isReadyUrl(url: string): boolean {
  return url.trim().length > 0 && !url.includes('[업데이트 필요]')
}

function displayUrl(url: string): string {
  return url.startsWith('mailto:') ? url.replace('mailto:', '') : url
}


function mailAddress(url: string): string {
  const displayed = displayUrl(url)
  const q = displayed.indexOf('?')
  return q >= 0 ? displayed.slice(0, q) : displayed
}

function mailtoWithTemplate(url: string, subject: string, bodyLines: readonly string[]): string {
  const address = mailAddress(url)
  const params = new URLSearchParams()
  if (subject.trim().length > 0) params.set('subject', subject)
  if (bodyLines.length > 0) params.set('body', bodyLines.join('\n'))
  const query = params.toString()
  return `mailto:${address}${query ? `?${query}` : ''}`
}

function getAnchorProps(url: string): { target?: string; rel?: string } {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return { target: '_blank', rel: 'noopener noreferrer' }
  }
  return {}
}

function Tabs({
  tabs,
  value,
  onValueChange,
}: {
  tabs: readonly ChannelTab[]
  value: CommonTabKey
  onValueChange: (next: CommonTabKey) => void
}) {
  const active = tabs.find(t => t.key === value) ?? tabs[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex flex-wrap gap-1 rounded-2xl bg-slate-50 border border-slate-100 p-1">
        {tabs.map(t => {
          const isActive = t.key === value
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onValueChange(t.key)}
              className={
                'px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ' +
                (isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900')
              }
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        {(active?.bullets ?? []).map(b => (
          <div key={b} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed break-keep">
            <span className="text-blue-600 font-black mt-0.5">·</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CommunitySnsPage() {
  const allChannels: Channel[] = useMemo(
    () =>
      siteData.sns.map(channel => ({
        ...channel,
        ready: isReadyUrl(channel.url),
      })),
    [],
  )

  const mainEmail = allChannels.find(c => c.name === 'Gmail')
  const extEmail = allChannels.find(c => c.name === 'Gmail(대외협력)')

  const snsChannels = allChannels.filter(c => c.icon !== 'gmail')
  const [selectedName, setSelectedName] = useState<string>(() => {
    const firstReady = snsChannels.find(c => c.ready)?.name
    return firstReady ?? (snsChannels[0]?.name ?? 'KakaoTalk')
  })

  const selected = snsChannels.find(c => c.name === selectedName) ?? snsChannels[0]
  const SelectedIcon = selected ? ICON_MAP[selected.icon] : null
  const selectedRestricted = selected?.name === 'KakaoTalk(오픈채팅)'
  const details = useMemo<ChannelDetails>(() => {
    return DETAILS_BY_NAME[selected?.name ?? ''] ?? {}
  }, [selected?.name])
  const tabs = useMemo<readonly ChannelTab[]>(() => {
    return COMMON_TABS.map(t => ({
      key: t.key,
      label: t.label,
      bullets: details[t.key] ?? ['내용 준비 중입니다.'],
    }))
  }, [details])

  const defaultTabKey = tabs[0]?.key ?? 'summary'
  const [activeTab, setActiveTab] = useState<CommonTabKey | null>(null)
  const tabValue = activeTab && tabs.some(t => t.key === activeTab) ? activeTab : defaultTabKey
  const [copied, setCopied] = useState(false)
  const [copiedMail, setCopiedMail] = useState<'main' | 'ext' | null>(null)

  const selectChannel = (name: string) => {
    setSelectedName(name)
    setCopied(false)
    setCopiedMail(null)
  }


  useEffect(() => {
    if (!copied && copiedMail == null) return
    const t = setTimeout(() => {
      setCopied(false)
      setCopiedMail(null)
    }, 1200)
    return () => clearTimeout(t)
  }, [copied, copiedMail])



  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white pt-20 sm:pt-24 pb-12 sm:pb-14 lg:pt-28 lg:pb-20 border-b border-slate-100">
        <Container maxWidth="5xl">
          <motion.div {...HERO_FADE_UP}>
            <HeroLabel>Community</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              공식 채널
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">SSAFYnity Official Channels</p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-2xl">
              문의·소식·커뮤니티 참여는 아래의 공식 채널을 이용해 주세요.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-12 sm:py-14 lg:py-20">
        <Container maxWidth="5xl" className="flex flex-col gap-10 sm:gap-12">
          {/* Mail */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Kicker className="text-blue-600 mb-4">Mail</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-5">
              공식 메일과 대외협력(제휴·후원) 메일은 용도가 다릅니다. 아래에서 목적에 맞는 메일로 문의해 주세요.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {mainEmail?.ready && (
                <Card
                  className="p-6 flex flex-col gap-4 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black px-2 py-1 rounded-full bg-blue-50 text-blue-600">공식</span>
                        <p className="text-sm font-extrabold text-slate-900">공지/행사 확정 · 일반 문의</p>
                      </div>
                      <p className="text-xs text-slate-500 break-all">{mailAddress(mainEmail.url)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed break-keep">
                      <span className="text-blue-600 font-black mt-0.5">·</span>
                      <span>공지 및 행사 확정 관련 메일을 발송/수신합니다.</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed break-keep">
                      <span className="text-blue-600 font-black mt-0.5">·</span>
                      <span>문의가 애매하면 공식 메일로 보내주세요. 담당이 연결해드립니다.</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col items-end gap-2 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-2 w-full">
                    <a
                      href={mailtoWithTemplate(mainEmail.url, '[SSAFYnity 공식 문의]', [
                        '문의 목적: ',
                        '이름/기수: ',
                        '연락처: ',
                        '내용: ',
                        '첨부/링크: ',
                      ])}
                      className="inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      메일 작성 <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(mailAddress(mainEmail.url))
                          setCopiedMail('main')
                        } catch {
                          setCopiedMail(null)
                        }
                      }}
                      className={
                        'inline-flex items-center gap-2 text-xs font-black px-3 py-2 rounded-xl border transition-colors ' +
                        (copiedMail === 'main'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                      }
                    >
                      {copiedMail === 'main' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedMail === 'main' ? '복사됨' : '주소 복사'}
                    </button>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed break-keep">
                      메일 앱이 열리지 않으면 주소를 복사해 웹메일에서 보내주세요.
                    </p>
                  </div>
                </Card>
              )}

              {extEmail?.ready && (
                <Card
                  className="p-6 flex flex-col gap-4 hover:border-emerald-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">대외협력</span>
                        <p className="text-sm font-extrabold text-slate-900">제휴/후원 문의</p>
                      </div>
                      <p className="text-xs text-slate-500 break-all">{mailAddress(extEmail.url)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed break-keep">
                      <span className="text-emerald-600 font-black mt-0.5">·</span>
                      <span>제휴·후원 관련 문의 전용 메일입니다.</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed break-keep">
                      <span className="text-emerald-600 font-black mt-0.5">·</span>
                      <span>제안서/자료 첨부가 필요한 문의에 적합합니다.</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col items-end gap-2 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-2 w-full">
                    <a
                      href={mailtoWithTemplate(extEmail.url, '[SSAFYnity 제휴/후원 문의]', [
                        '회사/기관명: ',
                        '담당자/직함: ',
                        '연락처: ',
                        '제안 요약: ',
                        '첨부/링크: ',
                        '희망 일정: ',
                      ])}
                      className="inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      메일 작성 <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(mailAddress(extEmail.url))
                          setCopiedMail('ext')
                        } catch {
                          setCopiedMail(null)
                        }
                      }}
                      className={
                        'inline-flex items-center gap-2 text-xs font-black px-3 py-2 rounded-xl border transition-colors ' +
                        (copiedMail === 'ext'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                      }
                    >
                      {copiedMail === 'ext' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedMail === 'ext' ? '복사됨' : '주소 복사'}
                    </button>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed break-keep">
                      제안서/자료가 있다면 첨부해 주세요. (메일이 열리지 않으면 주소 복사를 이용하세요.)
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </motion.div>

          {/* SNS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Kicker className="text-blue-600 mb-4">SNS</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-5">
              모든 행사 소식 및 공지는 각 공식 채널에 동일하게 업로드됩니다. 편한 채널을 이용해 주세요.
            </p>

            <Card className="p-6">
              <div className="flex flex-col gap-4">

                <div
                  role="tablist"
                  aria-label="SNS 채널"
                  onKeyDown={e => {
                    const key = e.key
                    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return
                    e.preventDefault()
                    if (snsChannels.length === 0) return

                    const currentIndex = snsChannels.findIndex(c => c.name === selected?.name)
                    const safeIndex = currentIndex < 0 ? 0 : currentIndex
                    const lastIndex = snsChannels.length - 1

                    const nextIndex =
                      key === 'Home'
                        ? 0
                        : key === 'End'
                          ? lastIndex
                          : key === 'ArrowLeft'
                            ? (safeIndex - 1 + snsChannels.length) % snsChannels.length
                            : (safeIndex + 1) % snsChannels.length

                    const next = snsChannels[nextIndex]
                    if (!next) return

                    selectChannel(next.name)
                    requestAnimationFrame(() => {
                      document.getElementById(`sns-tab-${next.name}`)?.focus()
                    })
                  }}
                  className="flex items-center gap-1 overflow-x-auto rounded-2xl bg-slate-50 border border-slate-100 p-1"
                >
                  {snsChannels.map(channel => {
                    const Icon = ICON_MAP[channel.icon]
                    const isSelected = channel.name === selected?.name
                    const isReady = channel.ready
                    const isRestricted = channel.name === 'KakaoTalk(오픈채팅)'
                    const isAccessible = isReady || isRestricted

                    return (
                      <button
                        key={channel.name}
                        id={`sns-tab-${channel.name}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls={`sns-panel-${channel.name}`}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => selectChannel(channel.name)}
                        className={
                          'relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ' +
                          (isSelected
                            ? 'text-slate-900'
                            : isAccessible ? 'text-slate-600 hover:text-slate-900'
                              : 'text-slate-400 opacity-70 hover:text-slate-500')
                        }
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="sns-active-pill"
                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                            className="absolute inset-0 rounded-xl bg-white shadow-sm"
                          />
                        )}

                        <span
                          className={
                            'relative w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 ' +
                            (isSelected ? 'shadow-sm' : 'opacity-90')
                          }
                          style={{ backgroundColor: channel.color }}
                        >
                          {Icon ? <Icon size={14} /> : null}
                        </span>
                        <span className="relative">{channel.name}</span>
                      </button>
                    )
                  })}
                </div>

                {selected && (
                  <motion.div
                    key={selected.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    role="tabpanel"
                    id={`sns-panel-${selected.name}`}
                    aria-labelledby={`sns-tab-${selected.name}`}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: selected.color }}
                          >
                            {SelectedIcon ? <SelectedIcon size={18} /> : null}
                          </div>

                          <div className="min-w-0">
                            {selectedRestricted ? (
                              <div className="mb-2">
                                <span className="text-[10px] font-black px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                                  정회원 전용
                                </span>
                              </div>
                            ) : !selected.ready ? (
                              <div className="mb-2">
                                <span className="text-[10px] font-black px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                                  준비 중
                                </span>
                              </div>
                            ) : null}

                            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{selected.name}</h2>
                            <p className="mt-1 text-sm text-slate-500 leading-relaxed break-keep">{selected.desc}</p>
                          </div>
                        </div>
                      </div>

                      {selected.ready && (
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(selected.url)
                                setCopied(true)
                              } catch {
                                setCopied(false)
                              }
                            }}
                            className={
                              'inline-flex items-center gap-2 text-xs font-black px-3 py-2 rounded-xl border transition-colors ' +
                              (copied
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                            }
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? '복사됨' : '링크 복사'}
                          </button>

                          <a
                            href={selected.url}
                            {...getAnchorProps(selected.url)}
                            className="inline-flex items-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          >
                            바로가기 <ExternalLink size={14} />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-5">
                      <Tabs tabs={tabs} value={tabValue} onValueChange={(next) => setActiveTab(next)} />
                    </div>

                                        {displayUrl(selected.url).trim().length > 0 && (
                      <p className="mt-6 text-[11px] text-slate-400 break-all">{displayUrl(selected.url)}</p>
                    )}
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Safety */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <Kicker className="text-blue-600 mb-4">Safety</Kicker>
            <Card className="p-6">
              <p className="text-sm font-extrabold text-slate-900 mb-2">사칭/피싱 주의</p>
              <p className="text-sm text-slate-500 leading-relaxed break-keep">
                공식 채널은 이 페이지에 안내된 링크만 사용해 주세요. 행사 참가비·후원 요청 등 금전 안내는 반드시 공식 문의 채널로 재확인해 주세요.
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}





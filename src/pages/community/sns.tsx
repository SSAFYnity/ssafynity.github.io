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

type ChannelDetails = {
  summary: readonly string[]
  audience: readonly string[]
  howto: readonly string[]
}

const DETAILS_BY_NAME: Record<string, ChannelDetails> = {
  '카카오톡 채널': {
    summary:  ['행사·가입 안내 등 공지를 가장 빠르게 확인하는 채널입니다.', '간단한 문의/확인에 적합합니다.'],
    audience: ['동문회에 관심이 있는 누구든', '예비 동문회원 및 외부 참여자 모두'],
    howto:    ['채널 추가 후 알림을 켜 주세요.', '중요한 문의나 긴 내용은 메일로 보내 주세요.'],
  },
  '카카오톡 오픈카톡': {
    summary:  ['정회원을 위한 실시간 소통 채널입니다.', '정회원 공지·소통·선공개 및 투표에 활용됩니다.'],
    audience: ['동문회 운영진', '동문회 정회원'],
    howto:    ['정회원 전환 후 안내 메일이 발송됩니다.', '필수 참여는 아니며, 유효기간 중에는 언제든 입장/퇴장할 수 있습니다.'],
  },
  디스코드: {
    summary:  ['관심사·주제별로 자유롭게 소통할 수 있는 커뮤니티 채널입니다.', '음성 채팅도 가능하며, 온라인 행사도 여기서 진행됩니다.'],
    audience: ['소통하고 싶은 누구나', '동문회원 및 외부 참여자 모두'],
    howto:    ['외부 참여자가 이용할 수 있는 채널은 일부로 제한됩니다.', '역할(권한)에 따라 접근 가능한 채널이 달라집니다.'],
  },
  인스타그램: {
    summary:  ['사진 중심으로 소식을 전하는 공식 SNS입니다.', '이벤트 안내와 공유에 적합합니다.'],
    audience: ['인스타그램을 이용하는 동문회 관심자', '동문회원 및 외부 참여자 모두'],
    howto:    ['공식 채널을 팔로우해 주세요.', '게시글 및 스토리로 올라오는 여러 소식을 확인해 주세요.'],
  },
  링크드인: {
    summary:  ['커리어 플랫폼 특성에 맞춰 동문회 성과를 중심으로 공유합니다.', '시니어 연사 모집 등 대외 모집 공지가 주로 올라옵니다.'],
    audience: ['링크드인을 이용하는 동문회 관심자', '동문회원 및 외부 참여자 모두'],
    howto:    ['공식 채널을 팔로우해 주세요.', '게시글로 올라오는 소식을 확인해 주세요.'],
  },
  깃허브: {
    summary:  ['동문회 공식 홈페이지 및 블로그를 운영하는 공간입니다.', '일부 이벤트/스터디 운영에 한정해 사용합니다.'],
    audience: ['(공식 사이트 및 블로그) 운영진만 가능', '(일부 이벤트/스터디 한정) 동문회원 JOIN 가능'],
    howto:    ['운영 원칙에 따라 오픈소스 기여(이슈/PR)는 받지 않습니다.', '이벤트/스터디 대상자에 한해 Member로 직접 초대해 드립니다.'],
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

function BulletList({ items, bulletColorClass }: { items: readonly string[]; bulletColorClass?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <div key={item} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed break-keep">
          <span className={(bulletColorClass ?? 'text-blue-600') + ' font-black mt-0.5'}>·</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function InfoCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-black text-slate-900 mb-3">{title}</p>
      <BulletList items={items} />
    </Card>
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
    const firstReady = snsChannels.find(c => c.ready || c.name === '카카오톡 오픈카톡')?.name
    return firstReady ?? (snsChannels[0]?.name ?? '')
  })

  const selected = snsChannels.find(c => c.name === selectedName) ?? snsChannels[0]
  const selectedDetails = DETAILS_BY_NAME[selected?.name ?? ''] ?? {
    summary:  ['내용 준비 중입니다.'],
    audience: ['내용 준비 중입니다.'],
    howto:    ['내용 준비 중입니다.'],
  }

  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedMail, setCopiedMail] = useState<'main' | 'ext' | null>(null)

  useEffect(() => {
    if (!copiedLink && copiedMail == null) return
    const t = setTimeout(() => {
      setCopiedLink(false)
      setCopiedMail(null)
    }, 1200)
    return () => clearTimeout(t)
  }, [copiedLink, copiedMail])

  const selectChannel = (name: string) => {
    setSelectedName(name)
    setCopiedLink(false)
  }

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
            id="mail-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Kicker className="text-blue-600 mb-4">Mail</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-5">
              공식 메일과 대외협력(제휴·후원) 메일은 용도가 다릅니다. 목적에 맞는 메일로 문의해 주세요.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {mainEmail?.ready && (
                <Card className="p-6 flex flex-col gap-4 hover:border-slate-200 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
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

                  <BulletList
                    bulletColorClass="text-slate-500"
                    items={[
                      '공지 및 행사 확정 관련 메일을 발송/수신합니다.',
                      '문의가 애매하면 공식 메일로 보내 주세요. 담당에게 연결해 드립니다.',
                    ]}
                  />

                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={mailtoWithTemplate(mainEmail.url, '[SSAFYnity 공식 문의]', [
                          '문의 목적: ',
                          '이름/기수: ',
                          '연락처: ',
                          '내용: ',
                          '첨부/링크: ',
                        ])}
                        className="w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
                          'w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3 py-2 rounded-xl border transition-colors ' +
                          (copiedMail === 'main'
                            ? 'border-blue-200 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                        }
                      >
                        {copiedMail === 'main' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedMail === 'main' ? '복사됨' : '주소 복사'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed break-keep">
                      메일 앱이 열리지 않으면 주소 복사로 웹메일에서 보내 주세요.
                    </p>
                  </div>
                </Card>
              )}

              {extEmail?.ready && (
                <Card className="p-6 flex flex-col gap-4 hover:border-slate-200 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black px-2 py-1 rounded-full bg-slate-100 text-slate-700">대외협력</span>
                        <p className="text-sm font-extrabold text-slate-900">제휴/후원 문의</p>
                      </div>
                      <p className="text-xs text-slate-500 break-all">{mailAddress(extEmail.url)}</p>
                    </div>
                  </div>

                  <BulletList
                    bulletColorClass="text-slate-500"
                    items={[
                      '대외협력(제휴·후원) 문의 전용 메일입니다.',
                      '제안서/자료 첨부가 필요한 문의에 적합합니다.',
                    ]}
                  />

                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={mailtoWithTemplate(extEmail.url, '[SSAFYnity 제휴/후원 문의]', [
                          '회사/기관명: ',
                          '담당자/직함: ',
                          '연락처: ',
                          '제안 요약: ',
                          '첨부/링크: ',
                          '희망 일정: ',
                        ])}
                        className="w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
                          'w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3 py-2 rounded-xl border transition-colors ' +
                          (copiedMail === 'ext'
                            ? 'border-blue-200 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                        }
                      >
                        {copiedMail === 'ext' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedMail === 'ext' ? '복사됨' : '주소 복사'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed break-keep">
                      메일 앱이 열리지 않으면 주소 복사로 웹메일에서 보내 주세요.
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
              모든 행사 및 공지사항은 각 공식 채널에 동일하게 업로드됩니다. 편한 SNS를 활용해 주세요.
            </p>

            <Card className="p-0 overflow-hidden border-slate-200 shadow-sm">
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
                  const idSafe = encodeURIComponent(next.name)
                  requestAnimationFrame(() => {
                    document.getElementById(`sns-tab-${idSafe}`)?.focus()
                  })
                }}
                className="flex items-end gap-1 overflow-x-auto no-scrollbar bg-slate-50/70 px-2 pt-2 shadow-[inset_0_-1px_0_0_rgba(148,163,184,0.35)]"
              >
                {snsChannels.map(channel => {
                  const Icon = ICON_MAP[channel.icon]
                  const isSelected = channel.name === selected?.name
                  const isRestricted = channel.name === '카카오톡 오픈카톡'
                  const isAccessible = channel.ready || isRestricted
                  const idSafe = encodeURIComponent(channel.name)

                  return (
                    <button
                      key={channel.name}
                      id={`sns-tab-${idSafe}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`sns-panel-${idSafe}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => selectChannel(channel.name)}
                      className={
                        'relative -mb-px inline-flex items-center gap-2 px-3 py-2 text-xs font-black whitespace-nowrap border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ' +
                        (isSelected
                          ? 'z-10 bg-white text-slate-900 border-slate-200 border-b-white shadow-sm rounded-t-xl rounded-b-none'
                          : isAccessible
                            ? 'bg-transparent text-slate-600 border-transparent hover:bg-white/70 hover:text-slate-900 rounded-xl'
                            : 'bg-transparent text-slate-400 border-transparent opacity-70 hover:bg-white/50 hover:text-slate-500 rounded-xl')
                      }
                    >
                      <span
                        className={
                          'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 bg-white ' +
                          (isSelected ? 'shadow-sm' : 'opacity-90')
                        }
                      >
                        {Icon ? <Icon size={14} style={{ color: channel.color }} /> : null}
                      </span>
                      <span>{channel.name}</span>
                    </button>
                  )
                })}
              </div>

              {selected && (
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  role="tabpanel"
                  id={`sns-panel-${encodeURIComponent(selected.name)}`}
                  aria-labelledby={`sns-tab-${encodeURIComponent(selected.name)}`}
                  className="p-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="요약" items={selectedDetails.summary} />
                    <InfoCard title="대상" items={selectedDetails.audience} />
                    <InfoCard title="방법" items={selectedDetails.howto} />

                    <Card className="p-5">
                      <p className="text-xs font-black text-slate-900 mb-3">링크</p>

                      {selected.name === '카카오톡 오픈카톡' ? (
                        <div className="flex flex-col gap-3">
                          <p className="text-sm text-slate-600 leading-relaxed break-keep">
                            오픈카톡 링크는 공개하지 않으며, 정회원에게만 별도로 안내됩니다.
                          </p>
                          {mainEmail?.ready ? (
                            <a
                              href={mailtoWithTemplate(mainEmail.url, '[SSAFYnity 오픈카톡 안내 요청]', [
                                '이름/기수: ',
                                '정회원 여부(예/아니오): ',
                                '문의 내용: ',
                              ])}
                              className="w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                              공식 메일로 문의 <ExternalLink size={14} />
                            </a>
                          ) : (
                            <a
                              href="#mail-section"
                              className="w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                              메일 섹션으로 이동 <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      ) : selected.ready ? (
                        <div className="flex flex-col gap-3">
                          <div className="grid gap-2">
                            <a
                              href={selected.url}
                              {...getAnchorProps(selected.url)}
                              className="w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                              바로가기 <ExternalLink size={14} />
                            </a>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(selected.url)
                                  setCopiedLink(true)
                                } catch {
                                  setCopiedLink(false)
                                }
                              }}
                              className={
                                'w-full inline-flex items-center justify-center gap-2 text-xs font-black px-3 py-2 rounded-xl border transition-colors ' +
                                (copiedLink
                                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
                              }
                            >
                              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                              {copiedLink ? '복사됨' : '링크 복사'}
                            </button>
                          </div>

                          {displayUrl(selected.url).trim().length > 0 && (
                            <p className="text-[11px] text-slate-400 break-all">{displayUrl(selected.url)}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 leading-relaxed break-keep">링크 정보를 준비 중입니다.</p>
                      )}
                    </Card>
                  </div>
                </motion.div>
              )}
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
              <div className="my-4 h-px bg-slate-200/70" />
              <p className="text-sm font-extrabold text-slate-900 mb-2">커뮤니티 신고</p>
              <p className="text-sm text-slate-500 leading-relaxed break-keep">
                커뮤니티 내 금전 요구, 욕설·비방, 음란물 등 부적절한 행위는 신고해 주세요. 내용이 확인된 경우 사전 통보 없이 강제 탈퇴 처리될 예정입니다.
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}











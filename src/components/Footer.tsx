import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { SiDiscord, SiGmail, SiGithub, SiInstagram, SiKakaotalk, SiLinkedin } from 'react-icons/si'

import { Container } from '@/components/Container'
import { siteData } from '@/data/siteData'
import { withBaseAsset } from '@/lib/asset'

const iconMap: Record<string, React.ReactNode> = {
  kakao: <SiKakaotalk size="1em" />,
  instagram: <SiInstagram size="1em" />,
  linkedin: <SiLinkedin size="1em" />,
  github: <SiGithub size="1em" />,
  gmail: <SiGmail size="1em" />,
  discord: <SiDiscord size="1em" />,
}

function isUsableSnsUrl(url: string): boolean {
  return url.trim().length > 0 && !url.includes('[업데이트 필요]')
}

function getSnsDisabledHint(name: string): string {
  if (name === '카카오톡 오픈카톡') return '정회원 확인 후 메일로 링크를 안내합니다.'
  return '준비 중입니다.'
}

const footerSns = siteData.sns.filter(channel => channel.showInFooter)

function FooterMobile() {
  return (
    <footer className="sm:hidden bg-white border-t border-slate-100 py-8">
      <Container maxWidth="7xl">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center">
            <img src={withBaseAsset('/logo.svg')} alt="SSAFYnity" className="h-8 w-auto" />
          </Link>

          <div className="flex gap-1.5 flex-nowrap justify-end overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {footerSns.map((channel) => {
              const usable = isUsableSnsUrl(channel.url)

              if (!usable) {
                return (
                  <div
                    key={channel.name}
                    aria-label={channel.name}
                    aria-disabled="true"
                    title={getSnsDisabledHint(channel.name)}
                    className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 text-[15px] cursor-not-allowed opacity-70"
                  >
                    {iconMap[channel.icon]}
                  </div>
                )
              }

              return (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={channel.name}
                  className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-[15px] hover:text-white hover:bg-blue-900 transition-all duration-300"
                >
                  {iconMap[channel.icon]}
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
          <div className="flex items-center gap-6">
            <Link
              to={siteData.legal.privacyPath}
              className="text-[10px] font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest"
            >
              {'\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68'}
            </Link>
            <Link
              to={siteData.legal.termsPath}
              className="text-[10px] font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest"
            >
              {'\uC774\uC6A9\uC57D\uAD00'}
            </Link>
          </div>

          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">
            {`\u00A9 ${new Date().getFullYear()} SSAFYnity`}
          </p>
        </div>
      </Container>
    </footer>
  )
}

function FooterDesktop() {
  return (
    <footer className="hidden sm:block bg-white border-t border-slate-100 pt-24 pb-16">
      <Container maxWidth="7xl">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-10">
              <img src={withBaseAsset('/logo.svg')} alt="SSAFYnity" className="h-12 w-auto" />
            </Link>

            <p className="text-base text-slate-400 font-bold leading-relaxed max-w-sm mb-12 break-keep text-pretty">
              {siteData.brand.slogan}
            </p>

            <div className="flex gap-4 flex-wrap">
              {footerSns.map((channel) => {
                const usable = isUsableSnsUrl(channel.url)

                return (
                  <div key={channel.name} className="relative group/sns">
                    {usable ? (
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={channel.name}
                        className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-[20px] hover:text-white hover:bg-blue-900 transition-all duration-300 shadow-sm"
                      >
                        {iconMap[channel.icon]}
                      </a>
                    ) : (
                      <div
                        aria-label={channel.name}
                        aria-disabled="true"
                        title={getSnsDisabledHint(channel.name)}
                        className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 text-[20px] cursor-not-allowed opacity-70 shadow-sm"
                      >
                        {iconMap[channel.icon]}
                      </div>
                    )}
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/sns:opacity-100 transition-opacity pointer-events-none">
                      {channel.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-3 gap-12">
            {siteData.menu.map((category) => (
              <div key={category.label}>
                <h5 className="text-[10px] font-black text-blue-900/30 uppercase tracking-[0.3em] mb-6">
                  {category.label}
                </h5>
                <ul className="space-y-4">
                  {category.items.map((item) => {
                    const isExternal = 'external' in item && item.external
                    const baseClass =
                      'text-[14px] font-bold text-slate-400 hover:text-blue-900 transition-colors flex items-center gap-2 group leading-snug break-keep'
                    const dot = (
                      <span className="w-1 h-1 bg-blue-900 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    )

                    if (isExternal) {
                      return (
                        <li key={item.label}>
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={baseClass}
                          >
                            {dot}
                            {item.label}
                            <ExternalLink size={10} className="opacity-40" />
                          </a>
                        </li>
                      )
                    }

                    return (
                      <li key={item.label}>
                        <Link to={item.path} className={baseClass}>
                          {dot}
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-row justify-between items-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {`\u00A9 ${new Date().getFullYear()} SSAFYnity. All rights reserved.`}
          </p>
          <div className="flex items-center gap-8">
            <Link
              to={siteData.legal.privacyPath}
              className="text-[10px] font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest"
            >
              {'\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68'}
            </Link>
            <Link
              to={siteData.legal.termsPath}
              className="text-[10px] font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest"
            >
              {'\uC774\uC6A9\uC57D\uAD00'}
            </Link>
          </div>
        </div>

        <p className="mt-5 text-[11px] font-bold leading-relaxed text-slate-400 break-keep">
          동문회의 사전 허락 없는 무단 크롤링, 스크래핑, 복제 및 재배포를 금합니다.
        </p>
      </Container>
    </footer>
  )
}

export default function Footer() {
  return (
    <>
      <FooterMobile />
      <FooterDesktop />
    </>
  )
}

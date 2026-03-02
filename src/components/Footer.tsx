import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { SiKakaotalk, SiInstagram, SiLinkedin, SiGithub, SiGmail, SiDiscord } from 'react-icons/si'
import { siteData } from '@/data/siteData'

const iconMap: Record<string, React.ReactNode> = {
  kakao:     <SiKakaotalk size={20} />,
  instagram: <SiInstagram size={20} />,
  linkedin:  <SiLinkedin size={20} />,
  github:    <SiGithub size={20} />,
  gmail:     <SiGmail size={20} />,
  discord:   <SiDiscord size={20} />,
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">

          {/* 브랜드 */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-10">
              <img src="/logo.svg" alt="SSAFYnity" className="h-12 w-auto" />
            </Link>
            <p className="text-base text-slate-400 font-bold leading-relaxed max-w-sm mb-12">
              {siteData.brand.slogan}
            </p>
            <div className="flex gap-4 flex-wrap">
              {siteData.sns.map((channel) => (
                <div key={channel.name} className="relative group/sns">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={channel.name}
                    className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-900 transition-all duration-300 shadow-sm"
                  >
                    {iconMap[channel.icon]}
                  </a>
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/sns:opacity-100 transition-opacity pointer-events-none">
                    {channel.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 링크 */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {siteData.menu.map((category) => (
              <div key={category.label}>
                <h5 className="text-[10px] font-black text-blue-900/30 uppercase tracking-[0.3em] mb-6">
                  {category.label}
                </h5>
                <ul className="space-y-4">
                  {category.items.map((item) => {
                    const isExternal = 'external' in item && item.external
                    const baseClass = 'text-[14px] font-bold text-slate-400 hover:text-blue-900 transition-colors flex items-center gap-2 group'
                    const dot = <span className="w-1 h-1 bg-blue-900 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    if (isExternal) {
                      return (
                        <li key={item.label}>
                          <a href={item.path} target="_blank" rel="noopener noreferrer" className={baseClass}>
                            {dot}{item.label}
                            <ExternalLink size={10} className="opacity-40" />
                          </a>
                        </li>
                      )
                    }
                    return (
                      <li key={item.label}>
                        <Link to={item.path} className={baseClass}>
                          {dot}{item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* 하단 바 */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            © {new Date().getFullYear()} SSAFYnity · Non-Profit Alumni Community
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-[10px] font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest">
              Privacy
            </Link>
            <Link to="/terms" className="text-[10px] font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

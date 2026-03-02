import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, ExternalLink } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { siteData } from '@/data/siteData'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex items-center">

          {/* 로고 */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo-rect.png" alt="SSAFYnity" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">SSAFYnity</span>
              <span className="text-[10px] font-bold tracking-widest text-blue-800 uppercase">Alumni Association</span>
            </div>
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {siteData.menu.map((category) => {
              const isActive = category.items.some(
                (item) => !('external' in item && item.external) && location.pathname.startsWith(item.path)
              )
              return (
                <div
                  key={category.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(category.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md font-bold text-sm transition-all ${
                      isActive
                        ? 'text-blue-900 bg-blue-50/70'
                        : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                    }`}
                  >
                    {category.label}
                    <ChevronDown
                      size={14}
                      className={`opacity-40 transition-transform duration-300 ${
                        activeMenu === category.label ? 'rotate-180 opacity-100 text-blue-900' : ''
                      }`}
                    />
                  </button>

                  {/* 드롭다운 */}
                  {activeMenu === category.label && (
                    <div className="absolute top-full left-0 pt-2 w-48 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-1.5">
                        {category.items.map((item) => {
                          const isExternal = 'external' in item && item.external
                          const isItemActive = !isExternal && location.pathname === item.path
                          const baseClass = `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors ${
                            isItemActive
                              ? 'text-blue-900 bg-blue-50'
                              : 'text-slate-500 hover:text-blue-900 hover:bg-slate-50'
                          }`
                          if (isExternal) {
                            return (
                              <a
                                key={item.label}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={baseClass}
                              >
                                {item.label}
                                <ExternalLink size={10} className="opacity-50" />
                              </a>
                            )
                          }
                          return (
                            <Link key={item.label} to={item.path} className={baseClass}>
                              {item.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 모바일 햄버거 */}
          <div className="flex items-center lg:hidden ml-auto">
            {/* 모바일 Sheet 드로어 */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-slate-900 bg-slate-50 rounded-lg">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0 overflow-y-auto">
                <div className="p-8 flex flex-col gap-8 pt-14">
                  {siteData.menu.map((category) => (
                    <div key={category.label} className="space-y-3">
                      <p className="text-base font-bold text-slate-900">{category.label}</p>
                      <div className="flex flex-col gap-1 pl-4 border-l-2 border-blue-900/10">
                        {category.items.map((item) => {
                          const isExternal = 'external' in item && item.external
                          const baseClass = `flex items-center gap-1.5 text-sm font-bold py-1 transition-colors ${
                            !isExternal && location.pathname === item.path
                              ? 'text-blue-900'
                              : 'text-slate-500 hover:text-blue-900'
                          }`
                          if (isExternal) {
                            return (
                              <a
                                key={item.label}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={baseClass}
                              >
                                {item.label}
                                <ExternalLink size={10} className="opacity-50" />
                              </a>
                            )
                          }
                          return (
                            <Link key={item.label} to={item.path} className={baseClass}>
                              {item.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}

                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  )
}

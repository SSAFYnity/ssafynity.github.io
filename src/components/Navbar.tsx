import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, ExternalLink } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { siteData } from '@/data/siteData'
import { Container } from '@/components/Container'

function getFirstFocusableMenuItem(menuEl: HTMLElement | null): HTMLElement | null {
  if (!menuEl) return null
  return menuEl.querySelector<HTMLElement>('[data-nav-menuitem]')
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 pt-[max(env(safe-area-inset-top),0.5rem)] sm:pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <Container maxWidth="7xl">
        <div className={`flex items-center ${isScrolled ? 'py-3 lg:py-4' : 'py-4 lg:py-8'}`}>

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
            {(() => {
              const hasExactMatch = siteData.menu.some(cat =>
                cat.items.some(item => !('external' in item && item.external) && location.pathname === item.path)
              )

              return siteData.menu.map((category, idx) => {
                const buttonId = `nav-button-${idx}`
                const menuId = `nav-menu-${idx}`

                const isActive = category.items.some((item) => {
                  if ('external' in item && item.external) return false
                  if (location.pathname === item.path) return true
                  if (hasExactMatch) return false
                  return location.pathname.startsWith(item.path + '/')
                })

                const isOpen = activeMenu === category.label

                return (
                  <div
                    key={category.label}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(category.label)}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.contains(document.activeElement)) setActiveMenu(null)
                    }}
                    onBlur={(e) => {
                      const next = e.relatedTarget as Node | null
                      if (!next || !e.currentTarget.contains(next)) setActiveMenu(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setActiveMenu(null)
                        ;(document.getElementById(buttonId) as HTMLButtonElement | null)?.focus()
                        return
                      }

                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveMenu(prev => (prev === category.label ? null : category.label))
                        return
                      }

                      if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        setActiveMenu(category.label)
                        requestAnimationFrame(() => {
                          const first = getFirstFocusableMenuItem(document.getElementById(menuId))
                          first?.focus()
                        })
                      }
                    }}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => setActiveMenu(prev => (prev === category.label ? null : category.label))}
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
                          isOpen ? 'rotate-180 opacity-100 text-blue-900' : ''
                        }`}
                      />
                    </button>

                    {/* 드롭다운 */}
                    {isOpen === true && (
                      <div className="absolute top-full left-0 pt-2 w-48 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div
                          id={menuId}
                          role="menu"
                          aria-labelledby={buttonId}
                          className="bg-white rounded-xl shadow-xl border border-slate-100 p-1.5"
                        >
                          {category.items.map((item) => {
                            const isExternal = 'external' in item && item.external
                            const isItemActive = !isExternal && location.pathname === item.path
                            const baseClass = `flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors w-full text-left ${
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
                                  role="menuitem"
                                  data-nav-menuitem
                                  className={baseClass}
                                  onClick={() => setActiveMenu(null)}
                                >
                                  {item.label}
                                  <ExternalLink size={10} className="opacity-50" />
                                </a>
                              )
                            }

                            return (
                              <Link
                                key={item.label}
                                to={item.path}
                                role="menuitem"
                                data-nav-menuitem
                                className={baseClass}
                                onClick={() => setActiveMenu(null)}
                              >
                                {item.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            })()}
          </div>

          {/* 모바일 햄버거 */}
          <div className="flex items-center lg:hidden ml-auto">
            {/* 모바일 Sheet 드로어 */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="메뉴 열기"
                  aria-expanded={mobileOpen}
                  className="lg:hidden p-2.5 min-h-11 min-w-11 text-slate-900 bg-slate-50 rounded-lg"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
                <SheetTitle className="sr-only">메뉴</SheetTitle>
                <SheetDescription className="sr-only">사이트 내비게이션</SheetDescription>
                <div className="p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 pt-[calc(3.5rem+env(safe-area-inset-top))]">
                  {siteData.menu.map((category) => (
                    <div key={category.label} className="space-y-3">
                      <p className="text-base font-bold text-slate-900">{category.label}</p>
                      <div className="flex flex-col gap-1 pl-4 border-l-2 border-blue-900/10">
                        {category.items.map((item) => {
                          const isExternal = 'external' in item && item.external
                          const baseClass = `flex items-center gap-1.5 text-sm font-bold py-2.5 px-2 min-h-11 rounded-lg transition-colors ${
                            !isExternal && location.pathname === item.path
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
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                                <ExternalLink size={10} className="opacity-50" />
                              </a>
                            )
                          }

                          return (
                            <Link
                              key={item.label}
                              to={item.path}
                              className={baseClass}
                              onClick={() => setMobileOpen(false)}
                            >
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
      </Container>
    </nav>
  )
}




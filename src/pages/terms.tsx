import { Container } from '@/components/Container'

const sections = [
  {
    title: '1. 목적',
    body: [
      '이 약관은 SSAFYnity(이하 "동문회")가 운영하는 공식 홈페이지, 공식 블로그 및 관련 운영 채널의 이용과 관련하여 동문회와 이용자 간의 기본적인 권리, 의무 및 책임사항을 정하는 것을 목적으로 합니다.',
    ],
  },
  {
    title: '2. 운영 주체 및 적용 범위',
    items: [
      '동문회는 비영리 단체로서 회비와 행사별 참가비를 기반으로 운영되며, 후원 및 제휴 협력을 통해 활동을 이어가고 있습니다.',
      '운영진은 재능기부 형태로 참여하고 있습니다.',
      '이 약관은 동문회가 운영하는 공식 홈페이지, 공식 블로그, 행사 안내 및 신청과 관련된 운영 채널 전반에 적용됩니다.',
    ],
  },
  {
    title: '3. 제공 서비스',
    items: [
      '동문회 소개 및 공지 안내',
      '행사 일정, 행사 상세, 접수 안내 및 관련 정보 제공',
      '활동 기록, 후기, 기술 공유, 회비 공개 등 아카이브 제공',
      '문의 접수 및 후원·제휴 관련 안내',
      '기타 동문회 운영에 필요한 정보 제공',
    ],
  },
  {
    title: '4. 이용자의 의무',
    body: ['이용자는 동문회가 제공하는 서비스를 이용함에 있어 다음 행위를 하여서는 안 됩니다.'],
    items: [
      '허위 정보를 제출하거나 타인의 정보를 도용하는 행위',
      '동문회 또는 제3자의 권리, 명예, 신용 또는 정당한 이익을 침해하는 행위',
      '동문회 서비스 운영을 방해하거나 서비스에 과도한 부하를 주는 행위',
      '동문회의 사전 허락 없이 자동화된 수단을 이용하여 홈페이지 또는 블로그의 정보를 수집, 복제, 저장, 배포하는 행위',
      '크롤링, 스크래핑, 매크로, 대량 요청 등 정상적인 서비스 이용 범위를 벗어나 시스템 또는 콘텐츠를 수집하는 행위',
      '동문회의 게시물, 이미지, 디자인, 로고 등 콘텐츠를 사전 허락 없이 전재, 복제, 배포, 2차 활용하는 행위',
      '법령 또는 공서양속에 반하는 행위',
    ],
  },
  {
    title: '5. 콘텐츠의 권리',
    items: [
      '동문회가 공식 홈페이지 및 블로그를 통해 제공하는 텍스트, 이미지, 디자인, 로고, 기록물 및 기타 콘텐츠의 권리는 별도 표시가 없는 한 동문회 또는 정당한 권리자에게 귀속됩니다.',
      '이용자는 동문회의 사전 허락 없이 이를 복제, 배포, 전송, 전시, 출판, 가공 또는 상업적으로 이용할 수 없습니다.',
    ],
  },
  {
    title: '6. 외부 서비스 및 외부 링크',
    items: [
      '동문회는 서비스 운영을 위해 Google Forms, 이메일 서비스, 외부 신청 링크 등 외부 서비스를 함께 이용할 수 있습니다.',
      '동문회는 서비스 운영 현황 파악 및 이용 경험 개선을 위해 방문 통계 분석 도구를 사용할 수 있으며, 이에 관한 사항은 개인정보처리방침에 따릅니다.',
      '공식 홈페이지 또는 블로그에서 외부 서비스로 연결되는 경우, 해당 서비스는 각 운영 주체의 정책과 약관이 적용될 수 있습니다.',
      '동문회는 외부 서비스 자체의 운영, 장애, 정책 변경 또는 그로 인한 결과에 대하여 직접 책임을 지지 않습니다.',
    ],
  },
  {
    title: '7. 행사 신청 및 운영 안내',
    items: [
      '행사 신청, 참가 자격, 회비, 참가비, 환불, 참가 제한 등 구체적인 사항은 각 행사 페이지, 행사 공지, 신청 안내문에 따릅니다.',
      '개별 행사 안내에 별도 기준이 있는 경우, 해당 안내가 이 약관보다 우선하여 적용됩니다.',
    ],
  },
  {
    title: '8. 서비스의 변경 및 중단',
    body: [
      '동문회는 운영상 또는 기술상 필요에 따라 제공하는 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다. 이 경우 동문회는 가능한 범위에서 공식 홈페이지 또는 블로그를 통해 사전에 안내합니다.',
    ],
  },
  {
    title: '9. 면책',
    items: [
      '동문회는 천재지변, 불가항력, 시스템 장애, 외부 서비스 장애, 이용자 귀책 사유 등으로 인하여 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.',
      '동문회는 이용자가 공식 홈페이지, 블로그 또는 외부 링크를 이용하는 과정에서 얻은 정보의 활용에 관하여 이용자 본인의 판단과 책임이 수반된다는 점을 전제로 합니다.',
      '동문회는 이용자 상호 간 또는 이용자와 제3자 간 발생한 분쟁에 직접 개입하지 않으며, 법령상 특별한 사정이 없는 한 이에 대한 책임을 지지 않습니다.',
    ],
  },
  {
    title: '10. 약관의 변경',
    items: [
      '동문회는 운영상 필요가 있는 경우 이 약관을 변경할 수 있습니다.',
      '약관이 변경되는 경우, 변경된 내용은 공식 홈페이지를 통해 공지합니다.',
      '변경 후에도 서비스를 계속 이용하는 경우, 이용자는 변경된 약관에 동의한 것으로 봅니다.',
    ],
  },
  {
    title: '11. 문의처',
    items: ['이메일: ssafynity@gmail.com', '문의 주체: SSAFYnity 운영진'],
  },
  {
    title: '부칙',
    body: ['이 약관은 2026년 4월 15일부터 시행합니다.'],
  },
] as const

export default function TermsPage() {
  return (
    <>
      <section className="bg-white pt-20 sm:pt-24 pb-10 sm:pb-12 lg:pt-28 lg:pb-16 border-b border-slate-100">
        <Container maxWidth="3xl">
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
              Terms of Service
            </p>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-black tracking-tight text-slate-950 leading-[0.96]">
                이용약관
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed break-keep">
                SSAFYnity 동문회가 운영하는 공식 채널 이용 기준을 안내합니다.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 text-sm text-slate-400">
              시행일: 2026년 4월 15일
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <Container maxWidth="3xl">
          <div className="flex flex-col gap-12 sm:gap-14">
            {sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950">
                  {section.title}
                </h2>

                {'body' in section && section.body && (
                  <div className="flex flex-col gap-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm sm:text-base leading-8 text-slate-600 break-keep">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {'items' in section && section.items && (
                  <ul className="flex flex-col gap-2.5 text-sm sm:text-base leading-8 text-slate-600">
                    {section.items.map((item, index) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="shrink-0 text-sm font-bold text-slate-400 leading-8">
                          {index + 1}.
                        </span>
                        <span className="break-keep">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

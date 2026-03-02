import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface text-text">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-xl font-semibold">페이지를 찾을 수 없습니다.</p>
      <p className="text-text-muted">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/" className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  )
}

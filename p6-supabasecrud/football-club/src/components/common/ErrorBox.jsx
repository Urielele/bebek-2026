import { RefreshCw, AlertCircle } from 'lucide-react'

export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[18px] border border-hairline bg-white p-10 text-center">
      <AlertCircle size={36} className="text-red-500" />
      <p className="font-text text-body text-ink-80">Gagal memuat data klub: {message}</p>
      <button type="button" onClick={onRetry} className="btn-secondary">
        <RefreshCw size={16} />
        Coba Lagi
      </button>
    </div>
  )
}
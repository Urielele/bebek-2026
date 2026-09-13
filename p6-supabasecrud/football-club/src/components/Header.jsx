import { Trophy, Plus } from 'lucide-react'

function Header({ clubCount, onAddClub }) {
  return (
    <>
      <nav className="sticky top-0 z-20 bg-void text-white">
        <div className="mx-auto flex h-11 w-full max-w-6xl items-center justify-between px-4">
          <span className="flex items-center gap-2 font-text text-nav-link text-white">
            <Trophy size={13} aria-hidden />
            Daftar Klub Sepak Bola
          </span>
          <span className="font-text text-nav-link text-muted-dark">Total Klub: {clubCount}</span>
        </div>
      </nav>

      <div className="sticky top-11 z-10 border-b border-black/5 bg-parchment/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[52px] w-full max-w-6xl items-center justify-between gap-4 px-4">
          <span className="font-display text-tagline text-ink">Daftar Klub Sepak Bola</span>
          <button type="button" onClick={onAddClub} className="btn-primary whitespace-nowrap">
            <Plus size={18} />
            Tambah Klub
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
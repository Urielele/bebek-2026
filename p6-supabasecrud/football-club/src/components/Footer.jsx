import { Shield } from 'lucide-react'

function Footer({ onAddClub }) {
  return (
    <footer className="border-t border-black/5 bg-parchment py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-text text-caption-strong text-ink-80">Tentang</h3>
            <ul className="mt-3">
              <li>
                <span className="font-text text-dense-link text-ink-80">Daftar Klub Sepak Bola</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onAddClub}
                  className="font-text text-dense-link text-action hover:text-action-focus"
                >
                  Tambahkan klub baru
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-text text-caption-strong text-ink-80">Teknologi</h3>
            <ul className="mt-3">
              <li>
                <span className="font-text text-dense-link text-ink-80">React + Vite</span>
              </li>
              <li>
                <span className="font-text text-dense-link text-ink-80">Tailwind CSS</span>
              </li>
              <li>
                <span className="font-text text-dense-link text-ink-80">React Hook Form + Zod</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-text text-caption-strong text-ink-80">Database</h3>
            <ul className="mt-3">
              <li>
                <span className="font-text text-dense-link text-ink-80">Supabase (PostgreSQL)</span>
              </li>
              <li>
                <span className="font-text text-dense-link text-ink-80">Tabel clubs — CRUD lengkap</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-text text-fine-print text-ink-48">
            Copyright © {new Date().getFullYear()} Daftar Klub Sepak Bola
          </p>
          <p className="flex items-center gap-1.5 font-text text-fine-print text-ink-48">
            <Shield size={12} aria-hidden />
            Materi Pertemuan 6 — Supabase CRUD
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
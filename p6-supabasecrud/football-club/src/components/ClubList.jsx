import { ListChecks } from 'lucide-react'
import ClubCard from './ClubCard'
import LoadingSkeleton from './common/LoadingSkeleton'
import ErrorBox from './common/ErrorBox'

function ClubList({ clubs, loading, error, onRetry, onEdit, onDelete }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-text text-display-md text-ink">Daftar Klub</h2>
            <p className="mt-1 font-text text-caption text-ink-48">Sumber data: Supabase</p>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 font-text text-caption-strong text-ink-80 sm:flex">
            <ListChecks size={15} className="text-action" />
            {clubs.length} klub
          </span>
        </div>

        {loading && <LoadingSkeleton />}

        {!loading && error && <ErrorBox message={error} onRetry={onRetry} />}

        {!loading && !error && clubs.length === 0 && (
          <p className="rounded-[18px] border border-hairline bg-white p-10 text-center font-text text-body text-ink-48">
            Belum ada klub yang tersedia.
          </p>
        )}

        {!loading && !error && clubs.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ClubList
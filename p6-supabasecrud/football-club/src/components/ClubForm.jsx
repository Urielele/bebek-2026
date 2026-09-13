import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Save, X, AlertCircle } from 'lucide-react'
import { clubSchema } from '../schemas/clubSchema'

const inputClass =
  'font-text text-body w-full rounded-full border border-hairline bg-white px-5 py-3 text-ink placeholder:text-ink-48/60 outline-none transition focus:border-action-focus focus:ring-2 focus:ring-action-focus/25'

const emptyValues = {
  strTeam: '',
  strStadium: '',
  intFormedYear: '',
  strBadge: '',
}

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-2 flex items-center gap-1.5 font-text text-caption text-red-600">
      <AlertCircle size={14} className="shrink-0" />
      {message}
    </p>
  )
}

function ClubForm({ editableClub, error, onAddClub, onUpdateClub, onCancelEdit }) {
  const isEditing = Boolean(editableClub?.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(clubSchema),
    defaultValues: emptyValues,
  })

  //Saat user klik "Edit", isi ulang form dengan data klub yang dipilih
  useEffect(() => {
    if (isEditing) {
      reset({
        strTeam: editableClub.strTeam ?? '',
        strStadium: editableClub.strStadium ?? '',
        intFormedYear: String(editableClub.intFormedYear ?? ''),
        strBadge: editableClub.strBadge ?? '',
      })
    } else {
      reset(emptyValues)
    }
  }, [editableClub, isEditing, reset])

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await onUpdateClub(editableClub.id, data)
      } else {
        await onAddClub(data)
      }
      reset(emptyValues)
    } catch {
      //pesan error sudah disimpan App (prop error), form tidak di-reset
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <div>
        <label htmlFor="strTeam" className="mb-2 block font-text text-caption-strong text-ink-80">
          Nama Klub *
        </label>
        <input
          id="strTeam"
          type="text"
          placeholder="Contoh: Manchester United"
          className={inputClass}
          {...register('strTeam')}
        />
        <FieldError message={errors.strTeam?.message} />
      </div>

      <div>
        <label htmlFor="strStadium" className="mb-2 block font-text text-caption-strong text-ink-80">
          Nama Stadion *
        </label>
        <input
          id="strStadium"
          type="text"
          placeholder="Contoh: Old Trafford"
          className={inputClass}
          {...register('strStadium')}
        />
        <FieldError message={errors.strStadium?.message} />
      </div>

      <div>
        <label htmlFor="intFormedYear" className="mb-2 block font-text text-caption-strong text-ink-80">
          Tahun Berdiri *
        </label>
        <input
          id="intFormedYear"
          type="text"
          inputMode="numeric"
          placeholder="Contoh: 1878"
          className={inputClass}
          {...register('intFormedYear')}
        />
        <FieldError message={errors.intFormedYear?.message} />
      </div>

      <div>
        <label htmlFor="strBadge" className="mb-2 block font-text text-caption-strong text-ink-80">
          URL Logo <span className="font-normal text-ink-48">(Opsional)</span>
        </label>
        <input
          id="strBadge"
          type="text"
          placeholder="https://logo-klub.png"
          className={inputClass}
          {...register('strBadge')}
        />
        <FieldError message={errors.strBadge?.message} />
      </div>

      {error && (
        <p className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 font-text text-body text-red-600 sm:col-span-2">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:pointer-events-none disabled:opacity-50"
        >
          {isEditing ? <Save size={18} /> : <Plus size={18} />}
          {isEditing ? 'Simpan Perubahan' : 'Tambah Klub'}
        </button>

        {isEditing && (
          <button type="button" onClick={onCancelEdit} className="btn-secondary">
            <X size={16} />
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

export default ClubForm
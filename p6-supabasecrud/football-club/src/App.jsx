import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ClubForm from './components/ClubForm'
import ClubList from './components/ClubList'
import { supabase } from './lib/supabaseClient'

function App() {
  //Persiapan State
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [editingClub, setEditingClub] = useState(null)
  const [formError, setFormError] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    //Fungsi untuk fetch data dari tabel "clubs" di Supabase
    const fetchClubs = async () => {
      try {
        const { data, error } = await supabase
          .from('clubs')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw new Error(error.message)
        setClubs(data ?? [])
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan yang tidak diketahui')
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [reloadKey])

  const handleReload = () => {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  //CREATE - insert data klub baru ke Supabase
  const handleAddClub = async (club) => {
    setFormError(null)
    try {
      const { data, error } = await supabase.from('clubs').insert(club).select().single()
      if (error) throw new Error(error.message)
      setClubs((prevClubs) => [data, ...prevClubs])
    } catch (err) {
      setFormError(err.message)
      throw err
    }
  }

  // UPDATE - simpan perubahan data klub ke Supabase
  const handleUpdateClub = async (id, club) => {
    const { strTeam, strStadium, intFormedYear, strBadge } = club
    setFormError(null)
    try {
      const { error } = await supabase
        .from('clubs')
        .update({ strTeam, strStadium, intFormedYear, strBadge })
        .eq('id', id)
      if (error) throw new Error(error.message)
      setClubs((prevClubs) =>
        prevClubs.map((c) => (c.id === id ? { ...c, strTeam, strStadium, intFormedYear, strBadge } : c))
      )
      setEditingClub(null)
    } catch (err) {
      setFormError(err.message)
      throw err
    }
  }

  // DELETE - hapus data klub dari Supabase
  const handleDeleteClub = async (id) => {
    const club = clubs.find((c) => c.id === id)
    if (!window.confirm(`Hapus klub "${club?.strTeam ?? 'ini'}"?`)) return
    try {
      const { error } = await supabase.from('clubs').delete().eq('id', id)
      if (error) throw new Error(error.message)
      setClubs((prevClubs) => prevClubs.filter((c) => c.id !== id))
      if (editingClub?.id === id) setEditingClub(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleStartEdit = (club) => {
    setFormError(null)
    setEditingClub(club)
    scrollToForm()
  }

  const handleCancelEdit = () => {
    setEditingClub(null)
    setFormError(null)
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-parchment text-ink">
      <Header
        clubCount={clubs.length}
        onAddClub={() => {
          handleCancelEdit()
          scrollToForm()
        }}
      />

      <main>
        <section
          ref={formRef}
          className="scroll-mt-28 border-b border-black/5 bg-white py-12 sm:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="font-text text-display-md text-ink">
              {editingClub ? 'Ubah Data Klub' : 'Tambah Klub Sepak Bola Baru'}
            </h2>
            <p className="mt-3 max-w-2xl font-text text-body text-ink-48">
              {editingClub
                ? `Sedang mengedit "${editingClub.strTeam}". Perubahan akan langsung disimpan ke Supabase.`
                : 'Lengkapi data klub baru di bawah ini. Setelah berhasil disimpan, klub akan langsung muncul di bagian atas daftar.'}
            </p>
            <div className="mt-8">
              <ClubForm
                editableClub={editingClub}
                error={formError}
                onAddClub={handleAddClub}
                onUpdateClub={handleUpdateClub}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        </section>

        <ClubList
          clubs={clubs}
          loading={loading}
          error={error}
          onEdit={handleStartEdit}
          onDelete={handleDeleteClub}
          onRetry={handleReload}
        />
      </main>

      <Footer onAddClub={() => {
        handleCancelEdit()
        scrollToForm()
      }} />
    </div>
  )
}

export default App
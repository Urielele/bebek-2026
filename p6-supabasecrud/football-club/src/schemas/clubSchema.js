import { z } from 'zod'

export const clubSchema = z.object({
  strTeam: z
    .string()
    .trim()
    .min(1, 'Nama klub wajib diisi')
    .min(3, 'Nama klub minimal 3 karakter'),

  strStadium: z
    .string()
    .trim()
    .min(1, 'Nama stadion wajib diisi')
    .min(3, 'Nama stadion minimal 3 karakter'),

  intFormedYear: z.coerce
    .number({ message: 'Tahun harus berupa angka' })
    .min(1800, 'Tahun minimal 1800')
    .max(new Date().getFullYear(), `Tahun maksimal ${new Date().getFullYear()}`)
    .int('Tahun harus bilangan bulat'),

  strBadge: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/.test(value),
      { message: 'URL logo tidak valid (contoh: https://...)' }
    ),
})

export default clubSchema
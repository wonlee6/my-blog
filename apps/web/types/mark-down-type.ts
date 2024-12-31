export const markDownTags = [
  'React',
  'Nextjs',
  'Javascript',
  'Typescript',
  'Recoil',
  'Tailwindcss',
  'Supabase',
  'Java',
  'Etc'
] as const

export type MarkDownType = (typeof markDownTags)[number]

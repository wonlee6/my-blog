export const markDownTags = ['React', 'Recoil'] as const

export type MarkDownType = (typeof markDownTags)[number]

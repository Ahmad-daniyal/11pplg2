const ABSOLUTE = /^(\/|https?:\/\/)/

export function resolveMedia(src, folder = 'kegiatan') {
  if (!src) return ''
  if (ABSOLUTE.test(src)) return src
  return `/photo/${folder}/${src}`
}

export function resolveVideo(src) {
  if (!src) return ''
  if (ABSOLUTE.test(src)) return src
  return `/video/${src}`
}
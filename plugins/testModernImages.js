// Avif/Webp detection
async function supportsEncode() {
  const fallbackclass = 'old'
  if (!this.createImageBitmap) return fallbackclass

  const avifData =
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
  const webpData =
    'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA='
  const avifblob = await fetch(avifData).then((r) => r.blob())
  const webpblob = await fetch(webpData).then((r) => r.blob())
  return createImageBitmap(avifblob).then(
    () => 'avif',
    () => {
      return createImageBitmap(webpblob).then(
        () => 'webp',
        () => fallbackclass
      )
    }
  )
}
// Add the supported format to the body's classList
;(async () => {
  const formatSupport = await supportsEncode()
  document.body.classList.add(formatSupport)
})()

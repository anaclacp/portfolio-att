function ImagePlaceholder({ text = "Sua Foto", aspectRatio = "4/5", className = "" }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-deep to-pink-vibrant ${className}`}
      style={{ aspectRatio }}
    >
      <span className="text-white/80 font-display text-lg text-center px-4">
        {text}
      </span>
    </div>
  )
}

export default ImagePlaceholder

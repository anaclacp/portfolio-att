import { useState, useEffect } from 'react'

function BlurText({ text, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      className={`inline-block transition-all duration-1000 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0)' : 'blur(20px)',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {text}
    </span>
  )
}

export default BlurText

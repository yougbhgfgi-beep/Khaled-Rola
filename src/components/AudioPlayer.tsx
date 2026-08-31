import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { registerAudio, pauseMusic, resumeMusic } from '../lib/audioStore'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    registerAudio(audioRef.current)

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const el = audioRef.current
    if (el) {
      el.addEventListener('play', onPlay)
      el.addEventListener('pause', onPause)
    }
    return () => {
      registerAudio(null)
      if (el) {
        el.removeEventListener('play', onPlay)
        el.removeEventListener('pause', onPause)
      }
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      if (audioRef.current && !audioRef.current.paused) return
      if (audioRef.current && playing) return
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
    }
    window.addEventListener('click', handler, { once: true })
    window.addEventListener('touchstart', handler, { once: true })
    return () => {
      window.removeEventListener('click', handler)
      window.removeEventListener('touchstart', handler)
    }
  }, [playing])

  const toggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/song.mp3" loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-dark-plum/60 backdrop-blur-md flex items-center justify-center hover:bg-dark-plum/80 transition-all border border-gold-accent/30 shadow-lg"
        aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      >
        {playing ? (
          <Volume2 className="w-5 h-5 text-gold-accent" />
        ) : (
          <VolumeX className="w-5 h-5 text-gold-accent" />
        )}
      </button>
    </>
  )
}

let audioElement: HTMLAudioElement | null = null
let playingBeforePause = false

export function registerAudio(el: HTMLAudioElement | null) {
  audioElement = el
}

export function pauseMusic() {
  if (audioElement && !audioElement.paused) {
    playingBeforePause = true
    audioElement.pause()
  }
}

export function resumeMusic() {
  if (audioElement && audioElement.paused && playingBeforePause) {
    playingBeforePause = false
    audioElement.play().catch(() => {})
  }
}

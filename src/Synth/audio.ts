let audioCtx: AudioContext

export const getAudioCtx = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

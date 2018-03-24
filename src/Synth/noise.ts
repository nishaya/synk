export const generateWhiteNoise = (audioContext: AudioContext): AudioBuffer => {
  const bufferSize = audioContext.sampleRate
  const buffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate
  )
  const output = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }
  return buffer
}

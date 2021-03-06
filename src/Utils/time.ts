import { sprintf } from 'sprintf-js'

export const BEAT_LENGTH = 480

export const position2time = (time: number, bpb: number = 4): string => {
  const barLength = bpb * BEAT_LENGTH
  const bars = ~~(time / barLength) + 1
  const beats = ~~((time % barLength) / BEAT_LENGTH) + 1
  const steps = time % BEAT_LENGTH
  return sprintf('%03d:%02d:%03d', bars, beats, steps)
}

export const secPerBeat = (bpm: number) => {
  return 60 / bpm
}

export const sec2pos = (sec: number, bpm: number) => {
  return BEAT_LENGTH / secPerBeat(bpm) * sec
}

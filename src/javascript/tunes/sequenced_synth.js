import * as Tone from 'tone'
import { generateUniqId } from '../utilities.js'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.2,
    decayCurve: 'exponential',
    sustain: 0.2,
    release: 1.5,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'amtriangle',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

// const chorusSettings = {
//   wet: 0,
//   type: 'sine',
//   frequency: 1.5,
//   delayTime: 3.5,
//   depth: 0.7,
//   spread: 180
// }

const autoFilterSettings = {
  wet: 0,
  type: 'sine',
  frequency: 1,
  depth: 1,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: 'lowpass',
    frequency: 100,
    rolloff: -12,
    Q: 1
  }
}

// const freeverbSettings = {
//   wet: 0.55,
//   roomSize: 0.23,
//   dampening: 40
// }
//
// const pingPongDelaySettings = {
//   wet: 0,
//   delayTime: 0.25,
//   maxDelayTime: 1
// }
//
// const tremoloSettings = {
//   wet: 0,
//   frequency: 10,
//   type: 'sine',
//   depth: 0.5,
//   spread: 180
// }
//
// const vibratoSettings = {
//   wet: 0,
//   maxDelay: 0.005,
//   frequency: 5,
//   depth: 0.1,
//   type: 'sine'
// }
//
const channelSettings = {
  volume: -14,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()

// const chorusNode = new Tone.Chorus(chorusSettings)
// const freeverbNode = new Tone.Freeverb(freeverbSettings)
// const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
// const tremoloNode = new Tone.Tremolo(tremoloSettings)
// const vibratoNode = new Tone.Vibrato(vibratoSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(
  autoFilterNode,
  // freeverbNode,
  // pingPongDelayNode,
  // tremoloNode,
  // vibratoNode,
  channelNode
)

const v = 1

// prettier-ignore
const partSettings = {
  // scale: [
  //   'A1','C1','D1','E1', 'G1',
  //   'A2','C2','D2','E2','G2',
  //   'A3','C3','D3','E3','G3',
  //   'A4','C4','D4','E4','G4',
  //   'A5','C5','D5','E5','G5',
  //   'A6','C6','D6','E6','G6',
  //   'A7','C7','D7','E7','G7',
  //   'A8','C8','D8','E8','G8'
  // ],
  scale: [
    'C3', 'B3', 'A3', 'G3', 'F3', 'E3', 'D3','C4',
  ],

  sequence: [
    // {
    //   time: '0:0:0',
    //   noteName: 'C3',
    //   duration: '1n',
    //   velocity: v
    // },
    // {
    //   time: '0:1:0',
    //   noteName: 'A3',
    //   duration: '1n',
    //   velocity: v
    // },
    // {
    //   time: '0:2:0',
    //   noteName: 'F4',
    //   duration: '1n',
    //   velocity: v
    // }
  ]
}

const partNode = new Tone.Part(function (time, note) {
  synthNode.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity
  )
}, [])

partNode.loopEnd = '2m'
partNode.loop = true

const instrument = [
  {
    id: generateUniqId(),
    name: 'Sequencer',
    type: 'Sequencer',
    node: partNode,
    settings: partSettings
  },
  {
    id: generateUniqId(),
    name: 'Melody Synth',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings
  },
  {
    id: generateUniqId(),
    name: 'Auto Filter',
    type: 'AutoFilter',
    node: autoFilterNode,
    settings: autoFilterSettings
  },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  }
]

export { instrument }

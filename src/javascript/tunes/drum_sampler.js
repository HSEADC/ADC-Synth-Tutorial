let kick = new Tone.Buffer('/samples/00007-Linn-9000-Kick-2.mp3', () => {
  let buff = kick.get()
})

let snare = new Tone.Buffer('/samples/00017-Linn-9000-Snare.mp3', () => {
  let buff = snare.get()
})

let hat = new Tone.Buffer('/samples/00004-Linn-9000-Hhclose2.mp3', () => {
  let buff = hat.get()
})

let ride = new Tone.Buffer('/samples/00031-Tama-RockStar-Ride.mp3', () => {
  let buff = ride.get()
})

import * as Tone from 'tone'
import { generateUniqId } from '../utilities.js'

const samplerSettings = {
  volume: 1,
  attack: 0,
  release: 0,
  curve: 'linear',
  urls: {
    A1: kick,
    B1: snare,
    C1: hat,
    D1: ride
  },
  baseUrl: 'http://localhost:3000'
}

const freeverbSettings = {
  wet: 0.9,
  roomSize: 0.08,
  dampening: 40
}

const channelSettings = {
  volume: -6,
  pan: 0,
  mute: false,
  solo: false
}

const samplerNode = new Tone.Sampler(samplerSettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
samplerNode.chain(freeverbNode, channelNode)

const v = 1

const partSettings = {
  scale: ['A1', 'B1', 'C1', 'D1'],
  sequence: [
    {
      time: '0:0:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "0:0:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '0:1:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "0:1:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '0:2:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "0:2:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '0:3:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "0:3:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '1:0:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "1:0:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '1:1:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "1:1:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '1:2:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    },
    // {
    //   time: "1:2:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
    {
      time: '1:3:0',
      noteName: 'A1',
      duration: '1n',
      velocity: v
    }
    // {
    //   time: "1:3:2",
    //   noteName: "C1",
    //   duration: "1n",
    //   velocity: v,
    // },
  ]
}

const partNode = new Tone.Part(function (time, note) {
  samplerNode.triggerAttackRelease(
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
    name: 'Drum Sampler',
    type: 'Sampler',
    node: samplerNode,
    settings: samplerSettings
  },
  // {
  //   id: generateUniqId(),
  //   name: "Freeverb",
  //   type: "FreeverbEffect",
  //   node: freeverbNode,
  //   settings: freeverbSettings,
  // },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  },
  {
    id: generateUniqId(),
    name: 'Sequencer',
    type: 'Sequencer',
    node: partNode,
    settings: partSettings
  }
]

export { instrument }

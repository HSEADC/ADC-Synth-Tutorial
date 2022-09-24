// import React, { PureComponent } from 'react'
//
// import Slider from '../control_components/Slider'
// import Knob from '../control_components/Knob'
// import ButtonSet from '../control_components/ButtonSet'
//
// export default class ToneSynth extends PureComponent {
//   constructor(props) {
//     super(props)
//   }
//
//   // Можно спользовать обновление тут, так как
//   // componentDidUpdate() {
//   // this.updateNodeParams()
//   // }
//
//   updateNodeParams = () => {
//     const { node, settings } = this.props
//     const { volume, detune, portamento, envelope, oscillator } = settings
//     const { type, phase, harmonicity } = oscillator
//
//     const {
//       attack,
//       attackCurve,
//       decay,
//       decayCurve,
//       sustain,
//       release,
//       releaseCurve
//     } = envelope
//
//     node.volume.value = volume
//     node.detune.value = detune
//     node.portamento = portamento
//
//     node.oscillator.type = type
//     node.oscillator.phase = phase
//
//     if (node.oscillator.harmonicity) {
//       node.oscillator.harmonicity.value = harmonicity
//     }
//
//     node.envelope.attack = attack
//     node.envelope.attackCurve = attackCurve
//     node.envelope.decay = decay
//     node.envelope.decayCurve = decayCurve
//     node.envelope.sustain = sustain
//     node.envelope.release = release
//     node.envelope.releaseCurve = releaseCurve
//   }
//
//   handlePropertyValueChange = (property, value) => {
//     const { id, handlePropertyValueChange } = this.props
//     handlePropertyValueChange(id, property, value)
//   }
//
//   render() {
//     const { id, name, settings } = this.props
//     const { volume, detune, portamento, envelope, oscillator } = settings
//
//     const {
//       type,
//       // modulationType,
//       // partialCount,
//       // partials,
//       phase,
//       harmonicity
//     } = oscillator
//
//     // Type
//     // The type of the oscillator. Can be any of the basic types: sine, square, triangle, sawtooth. Or prefix the basic types with "fm", "am", or "fat" to use the FMOscillator, AMOscillator or FatOscillator types. The oscillator could also be set to "pwm" or "pulse". All of the parameters of the oscillator's class are accessible when the oscillator is set to that type, but throws an error when it's not.
//     // type OmniOscillatorType = "fatsine" | "fatsquare" | "fatsawtooth" | "fattriangle" | "fatcustom" | FatTypeWithPartials | "fmsine" | "fmsquare" | "fmsawtooth" | "fmtriangle" | "fmcustom" | FMTypeWithPartials | "amsine" | "amsquare" | "amsawtooth" | "amtriangle" | "amcustom" | AMTypeWithPartials | TypeWithPartials | OscillatorType | "pulse" | "pwm"
//
//     // Modulation Type
//     // The type of the modulator oscillator. Only if the oscillator is set to "am" or "fm" types. See AMOscillator or FMOscillator
//
//     const {
//       attack,
//       attackCurve,
//       decay,
//       decayCurve,
//       sustain,
//       release,
//       releaseCurve
//     } = envelope
//
//     const oscillatorTypes = [
//       'fatsine',
//       'fatsquare',
//       'fatsawtooth',
//       'fattriangle',
//       'fmsine',
//       'fmsquare',
//       'fmsawtooth',
//       'fmtriangle',
//       'amsine',
//       'amsquare',
//       'amsawtooth',
//       'amtriangle',
//       'pulse',
//       'pwm'
//     ]
//
//     const envelopeCurves = [
//       'linear',
//       'exponential',
//       'sine',
//       'cosine',
//       'bounce',
//       'ripple',
//       'step'
//     ]
//
//     const decayEnvelopeCurves = ['linear', 'exponential']
//
//     this.updateNodeParams()
//
//     return (
//       <div className="ToneSynth">
//         <h1>{name}</h1>
//         <Knob
//           name="Detune"
//           property={['detune']}
//           min={-100}
//           max={100}
//           value={detune}
//           handleChange={this.handlePropertyValueChange}
//         />
//
//         <Knob
//           name="Portamento"
//           property={['portamento']}
//           min={-100}
//           max={100}
//           value={detune}
//           handleChange={this.handlePropertyValueChange}
//         />
//
//         <Slider
//           name="Frequency"
//           property={['frequency']}
//           min={0}
//           max={1}
//           step={0.01}
//           value={release}
//           handleChange={this.handlePropertyValueChange}
//         />
//
//         <Slider
//           name="Phase"
//           property={['oscillator', 'type']}
//           min={0}
//           max={1}
//           step={0.01}
//           value={release}
//           handleChange={this.handlePropertyValueChange}
//         />
//         <Slider
//           name="Attack"
//           property={['envelope', 'attack']}
//           min={0}
//           max={1}
//           step={0.01}
//           value={attack}
//           handleChange={this.handlePropertyValueChange}
//         />
//         <Slider
//           name="Decay"
//           property={['envelope', 'decay']}
//           min={0}
//           max={1}
//           step={0.01}
//           value={decay}
//           handleChange={this.handlePropertyValueChange}
//         />
//         <Slider
//           name="Sustain"
//           property={['envelope', 'sustain']}
//           min={0}
//           max={1}
//           step={0.01}
//           value={sustain}
//           handleChange={this.handlePropertyValueChange}
//         />
//         <Slider
//           name="Release"
//           property={['envelope', 'release']}
//           min={0}
//           max={1}
//           step={0.01}
//           value={release}
//           handleChange={this.handlePropertyValueChange}
//         />
//       </div>
//     )
//   }
// }

import React from 'react'
import { render } from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import userAudio from './audio.wav'
import './styles.css'
// .ebee
class App extends React.Component {
  componentDidMount () {
    const audio = document.querySelector('#song')

    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
      height: 100,
      progressColor: 'blue',
      responsive: true,
      waveColor: 'red',
      cursorColor: 'black'
    })

    this.wavesurfer.load(audio)

  }

  playTrack = () => {
    this.wavesurfer.playPause()
  }

  render () {
    return (
      <div className='master flex'>
       <div>
       <button onClick={this.playTrack}>Play</button>
        <div
          style={{
            marginTop: 10,
            border: '3px solid black',
            width: 200,
            height: 100
          }}
          id='waveform'
        />
        <audio id='song' src={userAudio} />
       </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

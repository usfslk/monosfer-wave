import React, { Component } from 'react'
import { render } from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import userAudio from './audio.wav'
import './styles.css'
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import ReactDOM from 'react-dom'

import { storage } from './firebase'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sound: null,
      url: '',
      progress: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

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

  handleChange = e => {
    if (e.target.files[0]) {
      const sound = e.target.files[0]
      this.setState(() => ({ sound }))
    }
  }

  handleUpload = () => {
    const { sound } = this.state
    const uploadTask = storage.ref(`sounds/${sound.name}`).put(sound)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        this.setState({ progress })
      },
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref('sounds')
          .child(sound.name)
          .getDownloadURL()
          .then(url => {
            console.log('success')
            this.setState({ url })
          })
      }
    )
  }

  render () {
    return (
      <div className='master flex'>
        <div>
          <progress value={this.state.progress} max='100' />
          <br />
          <input type='file' onChange={this.handleChange} />
          <br /><br />
          <button onClick={this.handleUpload}>Upload</button>
          <p>{this.state.url}</p>
        </div>

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
          <audio id='song' src='https://firebasestorage.googleapis.com/v0/b/monosfer-wavesurfer.appspot.com/o/sounds%2Faudio.wav?alt=media&token=3c4f22a1-b005-4aa3-a42e-d8e83804c3d7' />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

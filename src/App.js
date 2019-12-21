import React from 'react'
import './App.css'
import twitter from './twitter.svg'
import upto1000 from './upto1000.json'

class App extends React.Component {
  state = {
    ayah: '',
    author: '',
    color: '',
    loading: false,
    ayahNumber: 0,
    ayahName: '',
    surah: ''
  }

  handleClick = () => {
    this.apiCall()
  }

  componentDidMount = () => {
    this.apiCall()
  }

  // apiCall = () => {
  //   this.setState({ loading: true })
  //   fetch(`http://api.alquran.cloud/v1/ayah/${randomAyah()}`)
  //     .then(response => response.json())
  //     .then(ayah => {
  //       this.setState({
  //         loading: false,
  //         ayahNumber: reverseForKFGQPC(convertToInd(ayah.data.numberInSurah)),
  //         ayah: ayah.data.text,
  //         author: ayah.data.surah.name,
  //         color: randomcolor()
  //       })
  //     })
  // }

  apiCall = () => {
    let currentAyah = randomAyah()
    this.setState({ loading: true })
    this.setState({
      loading: false,
      ayahNumber: reverseForKFGQPC(convertToInd(upto1000[currentAyah].data.numberInSurah)),
      ayah: upto1000[currentAyah].data.text,
      // author: ayah.data.surah.name,
      color: randomcolor()
    })
  }

  render() {
    document.body.style.backgroundColor = this.state.color
    let { ayah, author, color, ayahNumber, loading } = this.state
    return (
      <div>
        <Quote
          ayah={ayah}
          author={author}
          color={color}
          handleClick={this.handleClick}
          ayahNumber={ayahNumber}
          loading={loading}
        />
      </div>
    )
  }
}

const Quote = props => {
  let style = {
    color: props.color,
    display: 'inline'
  }
  if (props.loading) style.display = 'none'
  console.log(props.ayahNumber, 'ayah number')

  return (
    <div id='quote-box'>
      <h1 id='title'>مولد آيات عشوائي</h1>
      {props.loading && <p id='loading'>...جار التحميل</p>}
      <p
        style={{ color: props.color, display: props.loading && 'none' }}
        id='text'
      >
        {props.ayah} {props.ayahNumber}
      </p>
      <p
        style={{ color: props.color, display: props.loading && 'none' }}
        id='author'
      >
        {props.author}
      </p>
      <button id='button'
        style={{ backgroundColor: props.color }}
        onClick={props.handleClick}
        id='new-quote'
      >
        آية جديدة
      </button>
      <div id='twitterbox'>
        <a
          href={`https://twitter.com/intent/tweet?hashtags=Quran&text=${props.ayah}`}
        >
          <img
            src={twitter}
            style={{ backgroundColor: props.color }}
            alt={'tweet bird'}
          />
        </a>
      </div>
    </div>
  )
}

function convertToInd(num) {
  const dict = {
    0: '٠',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩'
  }
  let x = String(num)
    .split('')
    .map(a => dict[a])
    .join('')
  return x
}

function randomAyah() {
  const firstAyah = 1
  const lastAyah = 999  //6236
  const diff = lastAyah - firstAyah + 1 // added 1 because the range doesn't include the last Ayah
  return Math.floor(Math.random() * diff + firstAyah)
}

function reverseForKFGQPC(num) {
  console.log(num, 'before change')
  if (num.length < 3) {
    return String(num)
      .split('')
      .reverse()
      .join('')
  } else {
    let array = String(num).split('')
    console.log(array)
    return String(num)
      .split('')
      .reverse()
      .join('')

    // let newnum = String(num).split('')[0]+ String(num).split('')[1]
    // return newnum.join('')
  }
}

function randomcolor() {
  const colors = {
    1: '#2E3F96',
    2: '#8E0E21',
    3: '#D8A05B',
    4: '#F254B0',
    5: '#E06469',
    6: '#3B90AF',
    7: '#310584',
    8: '#52AA05',
    9: '#4985D8',
    10: '#B5402F',
    11: '#C86ED8',
    12: '#30A7BA',
    13: '#6849B2',
    14: '#6A71F2',
    15: '#E28C1B',
    16: '#EFAB62',
    17: '#29A2B2',
    18: '#39BF94',
    19: '#FC6CB2',
    20: '#C13A50',
    21: '#342224'
  }
  const firstAyah = 1
  const diff = Object.keys(colors).length
  let selectedColor = Math.floor(Math.random() * diff + firstAyah)
  return colors[selectedColor]
}

export default App

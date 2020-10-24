import React, { useState, useEffect } from 'react'
import './App.css'
import ayahobject from './ayahobject.json'

function App() {
  const [ayah, setAyah] = useState('')
  const [surah, setSurah] = useState('')
  const [color, setColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [ayahNumber, setAyahNumber] = useState(0)

  useEffect(() => {apiCall()}, [])

  const handleClick = () => { apiCall() }

  const apiCall = async () => {
    let currentAyah = randomNumber()
    setLoading(true)
    await new Promise(r => setTimeout(r,300))
    setAyah(ayahobject[currentAyah].uthmaniText)
    setSurah(ayahobject[currentAyah].surah.name)
    setColor(randomcolor())
    setAyahNumber(ayahobject[currentAyah].numberInSurahNativeReverse)
    setLoading(false)
  }

  document.body.style.backgroundColor = color
  return (
    <div>
      <Quote
        ayah={ayah}
        surah={surah}
        color={color}
        handleClick={handleClick}
        ayahNumber={ayahNumber}
        loading={loading}
      />
    </div>
  )
}

const Quote = (props) => {
  let style = {
    color: props.color,
    display: 'inline',
  }
  if (props.loading) style.display = 'none'
  console.log(props.ayahNumber, 'ayah number')

  return (
    <div id="quote-box">
      {props.loading && <p id="loading">...جار التحميل</p>}
      <p
        style={{ color: props.color, display: props.loading && 'none' }}
        id="text"
      >
        {props.ayah} {props.ayahNumber}
      </p>
      <p
        style={{ color: props.color, display: props.loading && 'none' }}
        id="surah"
      >
        {props.surah}
      </p>
      <button
        id="button"
        style={{ backgroundColor: props.color }}
        onClick={props.handleClick}
        className="new-quote"
      >
        آية جديدة
      </button>
    </div>
  )
}

function randomNumber() {
  const startingAyah = 1
  const endingAyah = 6236
  const diff = endingAyah - startingAyah + 1 // added 1 because the range doesn't include the last Ayah
  return Math.floor(Math.random() * diff + startingAyah)
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
    21: '#342224',
  }

  const diff = Object.keys(colors).length
  let selectedColor = Math.floor(Math.random() * diff + 1)
  return colors[selectedColor]
}

export default App

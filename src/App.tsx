import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import './App.css';
import Header from './components/Header'
import FontCard from './components/FontCard'
import Footer from './components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateQuote, setModeByCurrentHours } from './helpers/helpers.function'
import { Mode, ListLayout } from './helpers/helpers.enum'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Helmet } from 'react-helmet'

const reallyCoolQuotes: string[] = [
  "Don’t let the noise of others’ opinions drown out your own inner voice.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Sometimes later becomes never. Do it now.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible."
]

function useFetch(url: string) {
  const [data, updateData] = useState({})

  useEffect(() => {
    async function fetchAsync() {
      const resp = await fetch(url)
      const json = await resp.json()
      updateData(json)
    }
    fetchAsync()
  }, [url])

  return (data as any).items
}

function filterByName(fontsArr: any[], fontFamily: string) {
  return fontFamily ? fontsArr.filter(font => font.family.toLowerCase().startsWith(fontFamily.toLowerCase())) : fontsArr.slice(0,20)
}

const App: React.FC = () => {
  const [font, setFont] = useState('')
  const [sampleText, setSampleText] = useState("")
  const [fontSize, setFontSize] = useState('12px')
  const [mode, setMode] = useState(setModeByCurrentHours())
  const [listLayout, setListLayout] = useState(ListLayout.Grid)

  const googleFontsArr = useFetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)

  const defaultQuote = useMemo<string>(() => generateQuote(reallyCoolQuotes), [])
  const filteredFonts = useMemo(() => googleFontsArr ? filterByName(googleFontsArr, font) : null, [font, googleFontsArr])
  
  const mappedLinks = useMemo<JSX.Element | JSX.Element[]>(() => {
    const mappedLinks = filteredFonts ? filteredFonts.map((font, index) => <link key={index} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font.family.replace(/\s/g, "+")}`} />) : <link />
    return mappedLinks
  }, [filteredFonts])

  const mappedLazyFontCards =
    useCallback(() : JSX.Element | JSX.Element[] => {
      function mappedFontCards(fontSize: string, sampleText: string, defaultQuote: string, filteredFonts: any) : JSX.Element | JSX.Element[] {
        console.log(document.getElementById("#root")?.clientHeight)
        return filteredFonts.map((font: any, index: number) => <FontCard key={index} fontFamily={font.family} fontSize={fontSize} sampleText={sampleText || defaultQuote} title={font.family} />)
      }
      return mappedFontCards(fontSize, sampleText, defaultQuote, filteredFonts)
    } , [fontSize, sampleText, defaultQuote, filteredFonts])


  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    const { id, value } = e.currentTarget
    if (id === "font") {
      setFont(value)
    }
    else if (id === "sampleText") {
      setSampleText(value)
    }
  }

  function handleDropDown(e: React.FormEvent<HTMLSelectElement>): void {
    setFontSize(e.currentTarget.value)
  }

  function changeMode(e: React.FormEvent<HTMLButtonElement>, layoutAspect: string): void {
    e.preventDefault()
    if (layoutAspect === 'Mode')
      setMode(e.currentTarget.value as Mode)
    else if (layoutAspect === 'ListLayout')
      setListLayout(e.currentTarget.value as ListLayout)
    else if (layoutAspect === 'Reset') {
      setFont('')
      setSampleText('')
      setFontSize('12px')
      setMode(setModeByCurrentHours())
      setListLayout(ListLayout.Grid)
    }
  }

  return (
    <div className={`app-container ${mode === Mode.DarkMode ? "dark-mode" : "light-mode"}`}>
      <Helmet>
        {mappedLinks}
      </Helmet>
      <Header />
      <div className="font-manager">
        <form>
          <input type="text" placeholder="Search fonts" name="font" id="font" value={font} onChange={handleChange} />
          <input type="text" placeholder="Type something" name="sampleText" id="sampleText" value={sampleText} onChange={handleChange} />
          <select name="fontSize" id="fontSize" onChange={handleDropDown} value={fontSize}>
            <option value="12px">12px</option>
            <option value="24px">24px</option>
            <option value="36px">36px</option>
            <option value="48px">48px</option>
          </select>
          <fieldset>
            <button name="DarkMode" value={Mode.DarkMode} onClick={e => changeMode(e, "Mode")}></button>
            <button name="LightMode" value={Mode.LightMode} onClick={e => changeMode(e, "Mode")}></button>
          </fieldset>
          <button value={listLayout === ListLayout.Grid ? ListLayout.List : ListLayout.Grid} onClick={e => changeMode(e, "ListLayout")}> <FontAwesomeIcon icon={["fas", `${listLayout === ListLayout.Grid ? "list" : "grip-horizontal"}` as IconName]} /> </button>
          <button value="reset" name="reset" onClick={e => changeMode(e, "Reset")} >  <FontAwesomeIcon icon={["fas", "spinner"]} /></button>
        </form>
      </div>
      <div className={`font-card-container ${listLayout === ListLayout.Grid ? 'grid' : 'list'}`}>
        <FontCard fontFamily="Roboto" title="Font Massa" sampleText={sampleText || defaultQuote} fontSize={fontSize} />
        {filteredFonts ? mappedLazyFontCards() : <></>}
      </div>
      <ScrollUpButton style={{ backgroundColor: "transparent", fill: mode === Mode.DarkMode ? "lightblue" : "red", outline: "none" }} />
      <Footer />
    </div>
  );
}

export default App;

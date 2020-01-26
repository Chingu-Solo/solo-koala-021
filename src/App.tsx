import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Helmet } from 'react-helmet'
import { reallyCoolQuotes } from './helpers/helpers.variables'
import { generateQuote, setModeByCurrentHours, useFetch, filterByName } from './helpers/helpers.function'
import { Mode, ListLayout } from './helpers/helpers.enum'
import Header from './components/Header'
import FontCard from './components/FontCard'
import Footer from './components/Footer'
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import './App.css';
import './responsivity.css';


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
    useMemo( () => {
      return filteredFonts ? filteredFonts.map((font: any, index: number) => <FontCard key={index} fontFamily={font.family} fontSize={fontSize} sampleText={sampleText || defaultQuote} title={font.family} />) : <></>
    }, [fontSize, sampleText, defaultQuote, filteredFonts])

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
          <button name="listLayout" value={listLayout === ListLayout.Grid ? ListLayout.List : ListLayout.Grid} onClick={e => changeMode(e, "ListLayout")}> <FontAwesomeIcon icon={["fas", `${listLayout === ListLayout.Grid ? "list" : "grip-horizontal"}` as IconName]} /> </button>
          <button value="reset" name="reset" onClick={e => changeMode(e, "Reset")} >  <FontAwesomeIcon icon={["fas", "spinner"]} /></button>
        </form>
      </div>
      <div className={`font-card-container ${listLayout === ListLayout.Grid ? 'grid' : 'list'}`}>
        {mappedLazyFontCards  }
      </div>
      <ScrollUpButton style={{ backgroundColor: "transparent", fill: mode === Mode.DarkMode ? "lightblue" : "red", outline: "none" }} />
      <Footer />
    </div>
  );
}

export default App;

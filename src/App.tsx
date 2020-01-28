import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet'
import { reallyCoolQuotes } from './helpers/helpers.variables'
import { generateQuote, setModeByCurrentHours, useFetch, filterByName } from './helpers/helpers.function'
import { Mode, ListLayout } from './helpers/helpers.enum'
import Header from './components/Header'
import FontCard from './components/FontCard'
import Footer from './components/Footer'
import FontManager from './components/FontManager'
import FontCardContainer from './components/FontCardContainer'
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
  const filteredFonts = useMemo(() => googleFontsArr ? filterByName(googleFontsArr, font) : [], [font, googleFontsArr])

  const mappedLinks = useMemo<JSX.Element | JSX.Element[]>(() => {
    const mappedLinks = googleFontsArr ? googleFontsArr.filter((font: any) => !["Open Sans Condensed", "Sunflower", "Coda Caption", "Buda", "Molle", "UnifrakturCook"].includes(font.family)).map((font :any, index:number) => <link key={index} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font.family.replace(/ /g, "+")}&display=swap`} />) : <link />
    return mappedLinks
  }, [googleFontsArr])

  const mappedFontCards =
    useMemo<JSX.Element | JSX.Element[]>(() => {
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
      <FontManager changeMode={changeMode} font={font} fontSize={fontSize} handleChange={handleChange} handleDropDown={handleDropDown} listLayout={listLayout} sampleText={sampleText} />
      <FontCardContainer listLayout={listLayout} mappedFontCards={mappedFontCards} />
      <ScrollUpButton style={{ backgroundColor: "transparent", fill: mode === Mode.DarkMode ? "lightblue" : "red", outline: "none" }} />
      <Footer />
    </div>
  );
}

export default App;

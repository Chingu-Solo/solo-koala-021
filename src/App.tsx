import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet'
import { reallyCoolQuotes } from './helpers/helpers.variables'
import { generateQuote, setModeByCurrentHours, setFontSizeByWidth, filterByName } from './helpers/helpers.function'
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
  const [font, setFont] = useState<string>('')
  const [fetchComplete, setFetchComplete] = useState<boolean>(false)
  const [sampleText, setSampleText] = useState<string>("")
  const [fontSize, setFontSize] = useState<string>(setFontSizeByWidth(window.innerWidth,600, 36, 24))
  const [mode, setMode] = useState<Mode>(setModeByCurrentHours())
  const [listLayout, setListLayout] = useState<ListLayout>(ListLayout.Grid)
  const [mappedFontCards, setMappedFontCards] = useState<JSX.Element | JSX.Element[]>([])

  const googleFontsArr = useRef<any[]>([])
  const mappedLinks = useRef<JSX.Element | JSX.Element[]>([])
  const defaultQuote = useRef<string>(generateQuote(reallyCoolQuotes))

  useEffect(() => {
    async function fetchAsync() {
      const resp = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      const json = await resp.json()
      googleFontsArr.current = json.items.filter((font: any) => !["Open Sans Condensed", "Sunflower", "Coda Caption", "Buda", "Molle", "UnifrakturCook"].includes(font.family))
      
      mappedLinks.current =googleFontsArr.current.map((font :any, index:number) => <link key={index} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font.family.replace(/ /g, "+")}`} />)

      setMappedFontCards(mapFontCards(filterByName, setFontSizeByWidth(window.innerWidth,600, 36, 24), googleFontsArr.current, defaultQuote.current))

      setFetchComplete(true)
    }
    fetchAsync()
    
  }, []);

  function mapFontCards(filterFunction : (fontsArr : any[], fontFamily: string) => any[], fontSize: string, fontsArr: any[], defaultQuote : string, fontFamily?: string, sampleText?: string ){
    return filterFunction(fontsArr, fontFamily || "").map((fontObject: any, index: number) => <FontCard key={index} fontFamily={fontObject.family} fontSize={fontSize} sampleText={sampleText || defaultQuote} title={fontObject.family} />)
  }

  useEffect(() => {
    setMappedFontCards(mapFontCards(filterByName, fontSize, googleFontsArr.current, defaultQuote.current, font, sampleText))
  }, [fontSize, sampleText, font])

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
      setFontSize('24px')
      setMode(setModeByCurrentHours())
      setListLayout(ListLayout.Grid)
    }
  }

  return (
    <div className={`app-container ${mode === Mode.DarkMode ? "dark-mode" : "light-mode"}`}>
      <Helmet>
        {mappedLinks.current}
      </Helmet>
      <Header />
      <FontManager changeMode={changeMode} font={font} fontSize={fontSize} handleChange={handleChange} handleDropDown={handleDropDown} listLayout={listLayout} sampleText={sampleText} />
      {fetchComplete ? <FontCardContainer listLayout={listLayout} mappedFontCards={mappedFontCards} />: <p>Fetching data...</p>}
      <ScrollUpButton style={{ backgroundColor: "transparent", fill: mode === Mode.DarkMode ? "lightblue" : "red", outline: "none" }} />
      <Footer />
    </div>
  );
}

export default App;

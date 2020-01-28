import { Mode } from './helpers.enum'
import { useState, useEffect} from 'react' 

export function generateQuote(quoteList: string[]): string {
    do {
        const { length: listLength } = quoteList
        const randomIndex = Math.ceil(Math.random() * listLength);
        if(quoteList[randomIndex])
            return quoteList[randomIndex]
    } while(true)
}

export function setModeByCurrentHours() : Mode {
    const currentHours = (new Date()).getHours()
    return currentHours >= 6 && currentHours < 18 ? Mode.LightMode : Mode.DarkMode
}

export function useFetch(url: string) {
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

export function filterByName(fontsArr: any[], fontFamily: string) {
  return fontFamily ? fontsArr.filter(font => font.family.toLowerCase().startsWith(fontFamily.toLowerCase())) : fontsArr.slice(0,10)
}


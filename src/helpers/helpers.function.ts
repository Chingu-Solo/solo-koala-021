import { Mode } from './helpers.enum'

export function generateQuote(quoteList: string[]): string {
  do {
    const { length: listLength } = quoteList
    const randomIndex = Math.ceil(Math.random() * listLength);
    if (quoteList[randomIndex])
      return quoteList[randomIndex]
  } while (true)
}

export function setModeByCurrentHours(): Mode {
  const currentHours = (new Date()).getHours()
  return currentHours >= 6 && currentHours < 18 ? Mode.LightMode : Mode.DarkMode
}

export function filterByName(fontsArr: any[], fontFamily: string) {
  return fontFamily ? fontsArr.filter(font => font.family.toLowerCase().startsWith(fontFamily.toLowerCase())) : fontsArr.slice(0,100)
}

export function setFontSizeByWidth( currentWidth : number, MobileWidth : number, mobileFontSize: number, desktopFontSize: number){
  return currentWidth < MobileWidth ? `${mobileFontSize}px` : `${desktopFontSize}px` 
}

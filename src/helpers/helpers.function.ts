import { Mode } from './helpers.enum'

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


import {ListLayout} from "../../helpers/helpers.enum"

interface FontManagerProps{
    font: string,
    sampleText: string,
    fontSize: string,
    listLayout: ListLayout
    changeMode: (e: React.FormEvent<HTMLButtonElement>, layoutAspect: string) => void,
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void,
    handleDropDown: (e: React.FormEvent<HTMLSelectElement>) => void,
}

export default FontManagerProps
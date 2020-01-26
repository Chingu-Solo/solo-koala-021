import React, { FC } from 'react'
import { ListLayout, Mode } from '../../helpers/helpers.enum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import FontManagerProps from './fontManager.interface'
import "./style.css"

const FontManager: FC<FontManagerProps> = (props : FontManagerProps) => {
    const {changeMode, font, fontSize, sampleText, handleChange, handleDropDown, listLayout} = props
    return <div className="font-manager">
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
}

export default FontManager
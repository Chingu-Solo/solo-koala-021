import React, { FC } from 'react'
import { ListLayout } from '../../helpers/helpers.enum'
import './style.css'

interface FontCardContainerProps {
    listLayout: ListLayout
    mappedFontCards: JSX.Element | JSX.Element[]
}

const FontCardContainer: FC<FontCardContainerProps> = (props: FontCardContainerProps) => {
    const { listLayout, mappedFontCards } = props
    return <div className={`font-card-container ${listLayout === ListLayout.Grid ? 'grid' : 'list'}`}>
        {mappedFontCards}
    </div>
}

export default FontCardContainer
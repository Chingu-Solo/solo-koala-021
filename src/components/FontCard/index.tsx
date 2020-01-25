import React, { FC } from 'react'
import './style.css'
import FontCardProps from './fontCard.interface'

const FontCard: FC<FontCardProps> = (props: FontCardProps) => {
    const { title, sampleText, fontSize, fontFamily } = props
    return (
        <div className="font-card">
            <div className="header">
                <div className="header-group">
                    <h3>{title}</h3>
                </div>
                <button>+</button>
            </div>
            <div className="body">
                <p style={{fontSize, fontFamily}}>{sampleText}</p>
            </div>
        </div>
    )
}

export default FontCard
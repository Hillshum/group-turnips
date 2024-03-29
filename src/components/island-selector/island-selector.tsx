import React from 'react'


import './island-selector.scss'

interface iSelectorProps {
    islands: {[name: string]: boolean}
    onChange: (islandName: string)=>void
}
const IslandSelector = ({ islands, onChange }: iSelectorProps) => {

    return <div className="island-selector">
        <div className="inner">
            {Object.entries(islands).map(([name, enabled]) =>(

                <label key={name} htmlFor={name}>
                    {name}
                    <input type="checkbox" name={name} checked={enabled} onChange={()=>onChange(name)}/>
                </label>

            ))}
        </div>
    </div>

}


export default IslandSelector
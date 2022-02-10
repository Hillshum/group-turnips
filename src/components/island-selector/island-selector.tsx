import React from 'react'


interface iSelectorProps {
    islands: {[name: string]: boolean}
    onChange: (islandName: string)=>void
}
const IslandSelector = ({ islands, onChange }: iSelectorProps) => {

    return <div>{Object.entries(islands).map(([name, enabled]) =>(

        <label htmlFor={name}>
            {name}
            <input type="checkbox" name={name} checked={enabled} onClick={()=>onChange(name)}/>
        </label>

    ))}</div>

}


export default IslandSelector
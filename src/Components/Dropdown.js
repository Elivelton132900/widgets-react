import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ options, selected, onSelectedChange, label }) => {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) { // Checa se um elemento DOM está contido dentro de outro
                return
            }
            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClick, { capture: true })
        return () => {
            document.body.removeEventListener('click', onBodyClick, { capture: true })
        }
    }, []) // executa apenas na primeira renderização

    const renderdOptions = options.map((option) => {

        if (option.value === selected.value) {
            return null // Não renderiza nada
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div>
            <div ref={ref} className="ui form">
                <div className="field">
                    <label className="label">{label}</label>
                    <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                        <i className="dropdown icon"></i>
                        <div className="text">{selected.label}</div>
                        <div className={`menu ${open ? 'visible transition' : ''}`}>
                            {renderdOptions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown
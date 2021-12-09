import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";

const options = [
    {
        label: 'Inglês',
        value: 'en'
    },
    {
        label: 'Espanhol',
        value: 'es'
    },
    {
        label: 'Alemão',
        value: 'de'
    }, 
    {
        label: 'Chinês',
        value: 'zh-TW'
    }
]

// AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM



const Translate = () => {

    const [language, setLanguage] = useState(options[0])
    const [text, setText] = useState('')

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>

            </div>

            <Dropdown
                label="Selecione uma linguagem"
                options={options}
                selected={language}
                onSelectedChange={setLanguage}
            />
            <hr />
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language} />
        </div>
    )
}

export default Translate
import React, { useEffect, useState } from "react";
import axios from "axios";
import { queryAllByAltText } from "@testing-library/dom";

// en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=programming

const Search = () => {

    const [term, setTerm] = useState('React Js')
    const [results, setResults] = useState([])

    useEffect(() => {

        if (term === 'React Js') {
            (async () => {
                const { data } = await axios.get('https://en.wikipedia.org/w/api.php?', {
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: term
                    }
                })
                setResults(data.query.search)
            })()
        } else {
            const timeOutId = setTimeout(() => {
                if (term) {
                    (async () => {
                        const { data } = await axios.get('https://en.wikipedia.org/w/api.php?', {
                            params: {
                                action: 'query',
                                list: 'search',
                                origin: '*',
                                format: 'json',
                                srsearch: term
                            }
                        })
                        setResults(data.query.search)
                    })()
                }
            }, 500);

            return () => {
                clearTimeout(timeOutId)
            }
        }

    }, [term]) // Sempre que term muda é atualizado. useEffect não pode ser usado async await

    const renderdResults = results.map((item) => {
        return (
            <div key={item.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${item.pageid}`} target="blank">Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {item.title}
                        <span dangerouslySetInnerHTML={{ __html: item.snippet }}></span>
                    </div>

                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        className="input"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderdResults}
            </div>
        </div>
    )
}

export default Search
import { useState, useEffect } from 'react'

import styles from '../styles/base.module.css'

export default () => {
    const [data, setData] = useState(null)
    const [filters, setFilters] = useState({
        currencies: false,
        crypto: false,
        stocks: false,
        commodities: false,
        etfs: false,
        funds: false,
        bonds: false,
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            let symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
            let token_raw = []
            for (let i=0; i<32; i++) {
                let j = (Math.random() * (symbols.length-1)).toFixed(0)
                token_raw[i] = symbols[j]
            }
            token = token_raw.join('')
            localStorage.setItem('token', token)
        }

        fetch(process.env.NEXT_PUBLIC_SERVER, {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: { 'Content-Type': 'application/json' },
        }).then(
            async res => setData(await res.json())
        )
    }, [])

    return (
        <>
            <input className={ styles.search } placeholder="🔍 Search" />
            <div className={ styles.filters }>
                { Object.entries(filters).map(([k, v]) => (
                    <button
                        className={ v ? styles.active : "" }
                        key={ k }
                        onClick={
                            () => {setFilters({
                                ...filters,
                                [k]: !v,
                            })}
                        }
                    >{ k }</button>
                )) }
            </div>
            <div className={ styles.cards }>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={ styles.box }>
                { data ? (
                    <div>
                        User #{ data.id }<br />
                        { JSON.stringify(data.token) }
                    </div>
                ) : 'Loading..' }
            </div>
            <button className={ styles.button }>
                Go
            </button>
        </>
    )
}

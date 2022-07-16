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
        fetch(process.env.NEXT_PUBLIC_SERVER, {
            method: 'POST',
            body: JSON.stringify({ user_agent: navigator.userAgent }),
            headers: { 'Content-Type': 'application/json' },
        }).then(
            res => res.json()
        ).then(
            res => setData(res)
        )
    }, [])

    return (
        <>
            <input className={ styles.search } placeholder="🔍 Search" />
            <div className={ styles.filters }>
                { Object.entries(filters).map(([k, v]) => (
                    <button
                        className={ v && styles.active }
                        onClick={
                            () => {setFilters({
                                ...filters,
                                [k]: !v,
                            })}
                        }
                    >{ k }</button>
                )) }
            </div>
            <div className={ styles.box }>
                { data ? data.map(i => (
                    <div>
                        { JSON.stringify(i) }
                    </div>
                )) : 'Loading..' }
            </div>
            <button className={ styles.button }>
                Go
            </button>
        </>
    )
}

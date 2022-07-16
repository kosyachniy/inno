import { useState, useEffect } from 'react'

import styles from '../styles/base.module.css'

export default () => {
    const [data, setData] = useState(null)

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

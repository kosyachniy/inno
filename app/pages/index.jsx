import { useState, useEffect } from 'react'
import { useStyles } from '../src/styles'

export default () => {
	const { classes } = useStyles({})
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
            { data ? data.map(i => (
                <div>
                    { JSON.stringify(i) }
                </div>
            )) : 'Loading..' }
            <button className={ classes.actionButton }>
                Go
            </button>
        </>
    )
}

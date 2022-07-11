import { useState, useEffect } from 'react'

export default () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api/', {
            method: 'POST',
            body: JSON.stringify({foo: 'bar'}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            res => res.json()
        ).then(
            res => setData(res)
        )
    }, [])

    return (
        <>
            { JSON.stringify(data) }
        </>
    )
}

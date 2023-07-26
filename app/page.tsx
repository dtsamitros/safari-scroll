'use client'
import { useMemo, useState } from 'react'
import { InView } from 'react-intersection-observer'

const MESSAGES = Array(200).fill(0).map((k, i) => `Message ${i + 1}`).reverse()
const PAGE = 30

export default function Home() {
    const [count, setCount] = useState(PAGE)
    const [loading, setLoading] = useState(false)
    const messages = useMemo(() => {
        return MESSAGES.slice(0, count)
    }, [count])

    const onIntersection = (inView: boolean) => {
        setLoading(true)
        if (inView) {
            setTimeout(() => {
                setCount((count) => Math.min(count + 30, MESSAGES.length))
                setLoading(false)
            }, 3000)
        }
    }

    return (
        <>
            <header/>
            <main>
                <div className="main-container">
                    {messages.map((message, i) => <p key={i}>{message}</p>)}
                    {count < MESSAGES.length ? (
                        <InView as="div" onChange={onIntersection} />
                    ) : (
                        <p>All done</p>
                    )}
                    {loading ? <p>Loading....</p> : null}
                </div>
            </main>
            <footer/>
        </>
    )
}



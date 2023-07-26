'use client'
import { useEffect, useMemo, useState } from 'react'
import { InView } from 'react-intersection-observer'

const MESSAGES = Array(200).fill(0).map((k, i) => `Message ${i + 1}`).reverse()
const PAGE = 30

export default function Home() {
    const [count, setCount] = useState(PAGE)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<string[]>([])

    const onIntersection = (inView: boolean) => {
        if (inView && !loading) {
            setCount((count) => Math.min(count + 30, MESSAGES.length))
        }
    }

    useEffect(() => {
        if (loading || messages.length === count) {
            return
        }

        setLoading(true)
        setTimeout(() => {
            setMessages(MESSAGES.slice(0, count))
            console.log('setting loading to false')
            setLoading(false)
        }, 3000)
    }, [count, loading, messages.length])

    return (
        <>
            <header/>
            <main>
                <div className="main-container">
                    {messages.map((message, i) => <p key={i}>{message}</p>)}
                    {count < MESSAGES.length ? (
                        <InView as="div" onChange={onIntersection}/>
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



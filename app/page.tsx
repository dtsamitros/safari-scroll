'use client'
import { useEffect, useMemo, useState } from 'react'
import { InView } from 'react-intersection-observer'
import { ScrollingList } from '@/app/ScrollList'

const MESSAGES = Array(200).fill(0).map((k, i) => `Message ${i + 1}`) // .reverse()
const PAGE = 30




export default function Home() {
    const [count, setCount] = useState(PAGE)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<string[]>([])

    const onIntersection = (inView: boolean) => {
        if (inView && !loading) {
            setCount((count) => Math.min(count + PAGE, MESSAGES.length))
        }
    }

    useEffect(() => {
        if (loading || messages.length === count) {
            return
        }

        setLoading(true)
        setTimeout(() => {
            setMessages(MESSAGES.slice(MESSAGES.length - count, MESSAGES.length))
            setLoading(false)
        }, 3000)
    }, [count, loading, messages.length])


    return (
        <>
            <header/>
            <main>
                {/*<div onScroll={(e) => console.log(e.target.scrollBottom)} className="main-container">*/}
                <ScrollingList>
                    <div className="main-container-spacer"></div>
                    {loading ? <p>Loading....</p> : null}
                    {count < MESSAGES.length ? (
                        <InView as="div" onChange={onIntersection}/>
                    ) : (
                        <p>All done</p>
                    )}
                    {messages.map((message, i) => <p key={i}>{message}</p>)}
                </ScrollingList>
                {/*</div>*/}

            </main>
            <footer/>
        </>
    )
}



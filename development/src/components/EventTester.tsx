import { FC, KeyboardEvent, useEffect, useState, useRef } from 'react'

import styles from '../style/EventTester.module.css'

interface Event {
  action: string
  body: string | number | object
}

const EventTester: FC = () => {
  const [events, setEvents] = useState<Event[]>([])

  const [inputValue, setInputValue] = useState('')

  const scrollElement = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [events])

  const eventList = [
    {
      action: 'test',
      body: {
        data: 'this is a test',
      },
    },
  ]

  const handleMessage = (e: MessageEvent) => {
    if (e.data.action) {
      setEvents((old) => [...old, e.data])
    }
  }

  const sendMessage = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].action === inputValue) {
          window.postMessage(eventList[i], '*')
        }
      }
      setInputValue('')
    }
  }

  const scrollToBottom = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.eventlist}>
        {events.map((event, index) => (
          <div key={index} className={styles.event}>
            <p>action: {event.action}</p>
            <div>
              body: <pre>{JSON.stringify(event.body, null, '  ')}</pre>
            </div>
          </div>
        ))}
        <span ref={scrollElement} />
      </div>
      <div className={styles.eventinput}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={sendMessage}
        />
      </div>
    </div>
  )
}

export default EventTester

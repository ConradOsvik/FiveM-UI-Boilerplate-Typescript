import styles from '../style/App.module.css'
import EventTester from './EventTester'

function App() {
  return (
    <div className="App">
      {process.env.NODE_ENV === 'development' ? <EventTester /> : ''}
      <h1 className={styles.header}>React UI</h1>
    </div>
  )
}

export default App

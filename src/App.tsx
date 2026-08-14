import Hud from './components/hud/Hud'
import { PlayerProvider } from './PlayerContext'

function App() {
  return (
    <PlayerProvider>
      <Hud />
    </PlayerProvider>
  )
}

export default App

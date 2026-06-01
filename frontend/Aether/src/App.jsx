import AppRoutes from './routes/AppRoutes'
import WakeWordListener from './components/WakeWordListener'

function App() {
  return (
    <>
    <WakeWordListener />
      <AppRoutes />
    </>
  )
}

export default App
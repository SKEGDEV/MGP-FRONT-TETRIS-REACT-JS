import { useState } from 'react'
import Modal from './components/modal/Modal'
import LayoutModal from './components/modalLayout/Layout'
import Button from './components/button/Button'
import { FaDoorClosed } from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Modal>
      <LayoutModal>
        <h1>Hello</h1>
        <Button><FaDoorClosed/>Hello</Button>
      </LayoutModal>
     </Modal>
    </>
  )
}

export default App

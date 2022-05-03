
import Modal from "./Modal"
import { useState } from "react"

export default function QuickView() {
  const [show, setShow] = useState(false)

  const handleClick = () => {
      setShow(true)
      console.log(show)
  }
  
  
  return (
    <div>
        <div classNameeName="">
            <button className="inline-block px-6 py-2.5 bg-blue-600 
                            rounded text-white" onClick={handleClick}>
                Modal
            </button>
            
        </div>
        {
            show ?
            (   
                <>
                    <Modal setShow={setShow} />
                </>
            )
            :
            (
                <>
                </>
            )
        }
        
    </div>
  )
}
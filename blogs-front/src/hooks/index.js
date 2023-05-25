import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // const reset = () => {
  //   setValue('')
  // }

  return {
    type,
    value,
    onChange
    //reset
  }
}

//tänne voi lisätä lisää näitä
// export const useAnother = (type) => {

// }
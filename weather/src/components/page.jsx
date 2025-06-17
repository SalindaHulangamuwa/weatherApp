'use client'
import aiBotAction from '../serverActions/aiBot'
export default function page() {
  return (
    <div>
      <h1>page</h1>
      <button onClick={()=>aiBotAction()}>click</button>
    </div>
  )
}
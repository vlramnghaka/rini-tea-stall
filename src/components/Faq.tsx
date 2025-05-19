import { useState, useEffect, Suspense } from 'react'
import Loading from './Loading.tsx'

const Faq = () => {
  const [qa, setQa] = useState([]);
  useEffect(()=> {
    fetch("/data/faq.json")
    .then(response => response.json())
    .then(data => {
      setQa(data);
    })
  },[])
  return (
    <>
      <h1>FAQ</h1>
      <Suspense fallback={<Loading />} >
        <div className="faq-container">
        {qa.map((element, index) => (
        <details key={index} name="faqs">
          <summary>{Object.keys(element)}</summary>
          <p>{Object.values(element)}</p>
        </details>
        ))}
        </div>
      </Suspense>
    </>
  )
}

export default Faq;
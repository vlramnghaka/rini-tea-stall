import { useState, useEffect, Suspense } from 'react'
import Loading from './Loading.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faMobileScreen, faMugHot } from '@fortawesome/free-solid-svg-icons'

type HomeDataType = {
  carousel: string[];
  announcement: string;
  tagLine: string;
  content: string;
  address: string[];
  phoneMain: string[];
  open: number;
  close: number;
}

const OpenStatus = ({start, end}:{start:number; end:number}) => {
  const dt = new Date();
  const currentHour = dt.getHours();
  const currentDay = dt.getDate();
  
  if (currentDay === 0) {
    return <div className='openStatus'>Pathian ni a nih avangin kan vawiin chu dawr kan inhawng lo ang</div>
  } else if (currentDay !== 0 && currentHour < start) {
    return <div className='openStatus'>Kan la inhawng lo deuh</div>
  } else if (currentDay !== 0 && currentHour >= end) {
    return <div className='openStatus'>Vawiin atan kan inkhar tawh</div>
  }

  return null;
}

const Home = () => {
  const [data, setData] = useState<HomeDataType | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  useEffect(()=>{
    fetch("/data/home.json")
    .then(res => res.json())
    .then(preparedData => {
      setData(preparedData)
    })
  },[])

  // Auto-slide effect
  useEffect(() => {
    if (!data?.carousel?.length) return;

    const interval = setInterval(() => {
      setCarouselIndex(prevIndex => 
        (prevIndex + 1) % data.carousel.length
      );
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [data])


  const mainPhone = `tel:${data?.phoneMain[0]}`;
  const secondPhone = `tel:${data?.phoneMain[1]}`;
  
  return (
    <>
    <Suspense fallback={<Loading />} >
    {!data ? <div className='announcement'><FontAwesomeIcon icon={faMugHot} beatFade size='2xl'/></div> : (
      <>
      <div className="announcement"> <FontAwesomeIcon icon={faTriangleExclamation}/> {data.announcement}</div>
      <div className="carousel-container">
          <img src={data.carousel[carouselIndex]}  alt="banner" className='carousel'/>
      </div>
      <div className="tag-line">{data.tagLine}</div>
      <OpenStatus start={data.open} end={data.close} />
      <p className="intro">{data.content}</p>
      <address>
        {data.address.map((line, index)=>(
          <span key={index} className="address-line">
            {line}
            {index !== data.address.length && <br />}
          </span>
        ))}
      </address>
      <div className="phones">
        <a href={mainPhone} title='Call Now'> <FontAwesomeIcon icon={faMobileScreen} /> {!data ? "Primary Contact" : data.phoneMain[0]}</a> &nbsp;| &nbsp;
        <a href={secondPhone} title='Call Now'> <FontAwesomeIcon icon={faMobileScreen} /> {!data? "Secondary Contact" : data.phoneMain[1]}</a>
      </div>
      </>
    )}
    </Suspense>
    </>
  )
}

export default Home;
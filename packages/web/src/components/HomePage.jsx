/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import { Container, Row, Col } from "react-bootstrap";
import './Home.css'

function HomePage() {
  const [loopNum, setLoopNum] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(300 - Math.random() * 100)
  const [index, setIndex] = useState(1)
  const toRotate = ["เปลี่ยนยางรถ", "ซ่อมมระบบครัช", "เปลี่ยนน้ำมมันเครื่อง", "เปลี่ยนแบตเตอรี่", "เปลี่ยนกระจก", "ตรวจเช็คสภาพรถ"]
  const period = 2000

  useEffect(()=>{
    let ticker = setInterval(()=>{
        tick()
    }, delta)
    return () => {clearInterval(ticker)}
  }, [text])

  const tick = () =>{
    let i = loopNum % toRotate.length
    let fullText = toRotate[i]
    let updateText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)
    
    setText(updateText)

    if(isDeleting){
        setDelta(prevDelta=>prevDelta/2)
    }

    if(!isDeleting && updateText === fullText){
        setIsDeleting(true)
        setIndex(prevIndex => prevIndex - 1)
        setDelta(period)
    }else if(isDeleting && updateText === ''){
        setIsDeleting(false)
        setLoopNum(loopNum+1)
        setIndex(1)
        setIndex(500)
    }else{
        setIndex(prevIndex=>prevIndex+1)
    }
  }
  return (
    <div>
      <div>
        <section className='banner' id="home">
              <Container>
                  <Row className='align-items-center'>
                      <Col xs={12} md={6} xl={7}>
                          <TrackVisibility>
                              {({isVisible})=>
                              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                              <h1>{`สวัสดี, ยินดีต้อนรับ`}<br></br><span className='txt-rotate' dataperiod='1000' data-rotate='["เปลี่ยนยางรถ", "ซ่อมมระบบครัช", "เปลี่ยนน้ำมมันเครื่อง", "เปลี่ยนแบตเตอรี่", "เปลี่ยนกระจก", "ตรวจเช็คสภาพรถ"]'><span className="wrap">{text}</span></span></h1>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni inventore iste odit natus ea, voluptatibus nisi molestiae! Aliquid atque odio blanditiis nisi expedita quaerat totam quas adipisci voluptatibus possimus?</p>
                              </div>}
                          </TrackVisibility>
                      </Col>
                  </Row>
              </Container>
          </section>
      </div>
    </div>
  )
}

export default HomePage

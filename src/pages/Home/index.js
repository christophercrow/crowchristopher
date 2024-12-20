import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"
import Typed from 'typed.js';
import DesktopNav from "../../components/DesktopNav"
import ShowMoreButton from "../../components/ShowMoreButton"
import bgDesktop from "../../images/bg.jpg"
import SocialIcons from "../../components/SocialIcons";
import Cursor from "../../components/Cursor"; // Ensuring you use the modified Cursor
import {Helmet} from "react-helmet";
import favicon from '../../images/favicon.ico'
import appleIcon from '../../images/apple-touch-icon.png'
import favicon32 from '../../images/favicon-32x32.png'
import favicon16 from '../../images/favicon-16x16.png'
import siteManifest from '../../images/site.webmanifest'
import {a, useChain, useSpring, useTrail, useSpringRef } from "@react-spring/web";

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function Home() {
    const movingBackground = useRef()
    const [windowSize, setWindowSize] = useState(getWindowSize())
    const [mobile, setMobile] = useState(false)
    const [tablet, setTablet] = useState(false)
    
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    useEffect(() => {
        if(windowSize.innerWidth < 768) {
            setMobile(true)
        } else {
            setMobile(false)
        }
        if(windowSize.innerWidth < 1024) {
            setTablet(true)
        } else {
            setTablet(false)
        }
    }, [windowSize])

    const el = useRef(null)
    const elParent = useRef(null)

    useEffect(() => {
        let temp = 0;
        const stringColors = ['#47FFE9', '#00FFAB', '#F7EC09', '#F9D371']
        const typed = new Typed(el.current, {
            strings: ['Astrophysicist', 'Cybersecurity Enthusiast', 'Data Explorer', 'Problem Solver'],
            shuffle: false,
            startDelay: 500,
            typeSpeed: 60,
            backSpeed: 50,
            backDelay: 1000,
            loop: true,
            preStringTyped: function(arrayPos, self) {
                elParent.current.style.color = stringColors[temp];
                temp += 1; 
            },
            onLastStringBackspaced: function(self) { temp = 0 },
        });
      
        return () => {
            typed.destroy();
        };      
    }, [])

    useEffect(() => {
        var lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / 50; 
        
        function moveBackground() {
            x += (lFollowX - x) * friction;
            y += (lFollowY - y) * friction;
            var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
            movingBackground.current.style.transform = translate;
            window.requestAnimationFrame(moveBackground);
        }
          
        window.addEventListener('mousemove', function(e) {
            var lMouseX = Math.max(-100, Math.min(100, windowSize.innerWidth / 2 - e.clientX));
            var lMouseY = Math.max(-100, Math.min(100, windowSize.innerHeight / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 100; 
            lFollowY = (10 * lMouseY) / 100;
        });
          
        moveBackground();
    }, [windowSize.innerHeight, windowSize.innerWidth])

    // Animations
    const backgroundRef = useSpringRef();
    const backgroundAnim = useSpring({
        ref: backgroundRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0 },
        to: { opacity: 1 },
    })

    const navRef = useSpringRef();
    const navReveal = useSpring({
        ref: navRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -20, y: -200},
        to: { opacity: 1, x: 0, y: 0},
    })

    const wtRef = useSpringRef();
    const wtReveal = useSpring({
        ref: wtRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: 20},
        to: { opacity: 1, x: 0},
    })

    const worksTitleRef = useSpringRef();
    const worksTitleReveal = useTrail(5, {
        ref: worksTitleRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: 20, height: 0 },
        to: { opacity: 1, x: 0, height: 110 },
    })
    const worksTitleList = "Works".split("")

    const descLine1Ref = useSpringRef();    
    const descLine2Ref = useSpringRef();    
    const descLine3Ref = useSpringRef();    
    const descLine4Ref = useSpringRef();    
    const descLine1Anim = useTrail(2, {
        ref: descLine1Ref,
        config: { mass: 5, tension: 2000, friction: 100 },
        from: { opacity: 0, x: 20, height: 0 },
        to: { opacity: 1, x: 0, height: 110 },
    })
    const descLine1List = "Hi, I'm".split(" ")
    const descLine2Anim = useTrail(2, {
        ref: descLine2Ref,
        config: { mass: 5, tension: 2000, friction: 100 },
        from: { opacity: 0, x: 20, height: 0 },
        to: { opacity: 1, x: 0, height: 110 },
    })
    const descLine2List = "Christopher Crow,".split(" ")
    const descLine3Anim = useSpring({
        ref: descLine3Ref,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: 20, height: 0 },
        to: { opacity: 1, x: 0, height: 110 },
    })
    const descLine4Anim = useSpring({
        ref: descLine4Ref,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -20 },
        to: { opacity: 1, x: 0 },
    })

    const workButtonRef = useSpringRef();
    const workButtonAnim = useSpring({
        ref: workButtonRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -20 },
        to: { opacity: 1, x: 0 },
    })

    const socialIconsRef = useSpringRef();
    const socialIconsAnim = useSpring({
        ref: socialIconsRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -20 },
        to: { opacity: 1, x: 0 }
    })

    useChain([navRef, wtRef, worksTitleRef, backgroundRef, descLine1Ref, descLine2Ref, descLine3Ref, descLine4Ref, workButtonRef, socialIconsRef], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 200)

    return (
        <>
        <Helmet>
            {/* Helmet Meta Info */}
            <meta charSet="utf-8" />
            <title>Christopher Crow</title>
            <link rel="canonical" href={window.location.href} />
            <link rel="icon" href={favicon} />
            <link rel="apple-touch-icon" sizes="180x180" href={appleIcon} />
            <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
            <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
            <link rel="manifest" href={siteManifest} />

            <meta name="title" content="Christopher Crow" />
            <meta name="description" content="Christopher Crow's personal website" />
            <meta name="keywords" content="Christopher Crow, Personal Website, Developer, Open Sourcer, Devops Engineer, Student" />
            <meta name="author" content="Christopher Crow" />

            {/* Open Graph */}
            <meta property="og:title" content="Christopher Crow" />
            <meta property="og:description" content="Christopher Crow's personal website" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="/" />
            <meta property="og:image" content="images/bgDesktop2.jpg" />
            <meta property="og:image:width" content="1920" />
            <meta property="og:image:height" content="1080" />
            <meta property="og:image:alt" content="Christopher Crow's personal website" />
            <meta property="og:site_name" content="Christopher Crow" />
            <meta property="og:locale" content="en_US" />

            {/* twitter meta */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Christopher Crow" />
            <meta name="twitter:description" content="Christopher Crow's personal website" />
            <meta name="twitter:image" content="images/bgDesktop2.jpg" />
            <meta name="twitter:image:alt" content="Christopher Crow's personal website" />
            <meta name="twitter:site" content="@aps_codes" />
            <meta name="twitter:creator" content="@aps_codes" />
        </Helmet>
        <HeroWrapper>
            <BGdiv ref={movingBackground} style={backgroundAnim} />
            <DesktopNav style={navReveal} />
            <MainAreaWrapper>
                <IntroWrapper>
                    <h1>
                        {descLine1Anim.map(({...style}, index) => (
                            <a.span style={style} key={index}>{descLine1List[index]} </a.span>
                        ))}<br />
                        {descLine2Anim.map(({...style}, index) => (
                            <a.span style={style} key={index}>{descLine2List[index]} </a.span>
                        ))}<br />
                        <a.span style={descLine3Anim}>
                            a <div style={{display: "inline"}} ref={elParent}>
                                <span ref={el} id="cursorHover">Astrophysicist</span>
                            </div>
                        </a.span>
                    </h1>
                    {!mobile ? (
                        <a.h2 style={descLine4Anim}>
                            Blending cosmic insights, data analysis, and secure code <br />
                            to shape a safer digital universe.
                        </a.h2>
                    ) : (
                        <a.h2 style={descLine4Anim}>
                            Blending cosmic insights, data analysis, <br />
                            and secure code to shape a safer digital universe.
                        </a.h2>
                    )}
                    <ShowMoreButton style={workButtonAnim} />
                </IntroWrapper>

                <WorkAndEmailWrapper style={wtReveal}>
                    <WorkLink to="/works">
                        {worksTitleReveal.map(({...style}, index) => (<a.span style={style} key={index}>{worksTitleList[index]}</a.span>))}
                    </WorkLink>
                    <TriangleDiv><a href="mailto:cecrow@unc.edu">cecrow@unc.edu</a></TriangleDiv>
                </WorkAndEmailWrapper>
            </MainAreaWrapper>
            <FooterWrapper>
                {!mobile ? <SocialIcons style={socialIconsAnim} /> : <SocialIcons style={socialIconsAnim} email="cecrow@unc.edu" />}
                <Year style={socialIconsAnim}>20<br/>24</Year>
            </FooterWrapper>
            {!tablet ? <Cursor /> : null}
        </HeroWrapper>
        </>
    )
}

const HeroWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: #000;
    z-index: 0;
`

const BGdiv = styled(a.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: url(${bgDesktop}) no-repeat center center;
    background-position: top -10vh left;
    background-size: cover;
    filter: brightness(95%);
    @media screen and (max-width: 1200px) {
        background-position: top left;
    }

    transform: scale(1.1);
`

const MainAreaWrapper = styled.div`
    flex: 1;
    margin-left: 64px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 767px) {
        margin-left: 34px;
    }
`

const IntroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: baseline;
    gap: 28px;
    h1 {
        font-weight: 700;
        font-size: 64px;
        color: #fff;
    }
    h2 {
        font-size: 32px;
        font-weight: 400;
        color: #fff;
    }
    @media screen and (max-width: 767px) {
        h1 {
            font-size: 40px;
        }
        h2 {
            font-size: 24px;
        }
    }
`

const WorkAndEmailWrapper = styled(a.div)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5em;
    @media screen and (max-width: 1023px) {
        display: none;
    }
`

const WorkLink = styled(Link)`
    font-size: 48px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    mix-blend-mode: difference;
    position: relative;
    :after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 4px;
        bottom: 0;
        left: 0;
        background: linear-gradient(to right, #8a2387, #e94057, #f27121);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }
    :hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
`

const TriangleDiv = styled.div`
    height: 40vh;
    width: 40vh;
    background: linear-gradient(110deg, rgb(254, 198, 141) 0%, rgb(255, 63, 80) 50%, rgba(255, 52, 155, 0.976) 100%);
    transform: rotate(45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -20vh;
    a {
        position: relative;
        transform: rotate(45deg) translateY(40px);
        text-decoration: none;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        :after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 3px;
            bottom: 0;
            left: 0;
            background: linear-gradient(to right, #8a2387, #e94057, #f27121);
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
        }
        :hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }
    a {
        transition: all 0.2s ease-in-out;
        :hover {
            color: #fff;
            transform: rotate(45deg) translateY(40px) scale(1.1);
        }
    }
`

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1em;
`

const Year = styled(a.span)`
    font-size: 32px;
    font-weight: 700;
    line-height: 75%;
    color: #fff;
    margin-right: 1rem;
    @media screen and (max-width: 767px) {
        display: none;
    }
`

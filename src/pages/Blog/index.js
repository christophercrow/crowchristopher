// Refactored Blog Page Imports
import { a, useChain, useSpring, useTrail, useSpringRef, useTransition } from '@react-spring/web';

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";

// Updated component imports
import DesktopNav from "../../components/layout/DesktopNav";
import Cursor from "../../components/ui/Cursor";
import SocialIcons from "../../components/ui/SocialIcons";
import Search from "../../components/features/Search";
import BlogCard from "../../components/features/BlogCard";

import favicon from '../../assets/icons/favicon.ico';
import appleIcon from '../../assets/icons/apple-touch-icon.png';
import favicon32 from '../../assets/icons/favicon-32x32.png';
import favicon16 from '../../assets/icons/favicon-16x16.png';
import siteManifest from '../../assets/icons/site.webmanifest';

// Updated data config path
import blogConfig from '../../data/blogConfig.json';

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function BlogPage() {
    const [windowSize, setWindowSize] = useState(getWindowSize())
    const [mobile, setMobile] = useState(false)
    const [tablet, setTablet] = useState(false)
    const [project, setProject] = useState(null)
    const [showCard, setShowCard] = useState(false)

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

    // Quotes Call
    const [quote, setQuote] = useState(null)
    const fetchQuote = async () => {
        setQuote(null)
        const response = await fetch("https://api.quotable.io/random?maxLength=50")
        const data = await response.json()
        setQuote(data)
    }
    useEffect(() => {
        fetchQuote()
    }, [])

    // Animations
    const navRef = useSpringRef()
    const navReveal = useSpring({
        ref: navRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -20, y: -200},
        to: { opacity: 1, x: 0, y: 0},
    })

    const trailsRef = useSpringRef()
    const trails = useTrail(5, {
        ref: trailsRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: 20, height: 0},
        to: { opacity: 1, x: 0, height: 110 },
    })

    const blogsTitleList = "Blogs".split("")
    const blogsTitleWrapperPropsRef = useSpringRef()
    const blogsTitleWrapperProps = useTransition([1], {
        ref: blogsTitleWrapperPropsRef,
        from: { opacity: 0.5, y: 0 },
        enter: { opacity: 1, y: -10 },
        leave: { opacity: 1 }
    })

    const dividerLineRef = useSpringRef()
    const dividerLineProps = useSpring({
        ref: dividerLineRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, width: 0},
        to: { opacity: 1, width: 80},
    })

    const countTrailsRef = useSpringRef()
    const countTrails = useTrail(1, {
        ref: countTrailsRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -20},
        to: { opacity: 1, x: 0 },
    })

    const searchWrapperRef = useSpringRef()
    const searchWrapperProps = useTransition([1], {
        ref: searchWrapperRef,
        from: { opacity: 0, y: 0 },
        enter: { opacity: 1, y: -10 },
        leave: { opacity: 1 }
    })

    const quotesWrapperRef = useSpringRef()
    const quotesWrapperProps = useTransition([1], {
        ref: quotesWrapperRef,
        from: { opacity: 0, y: 0 },
        enter: { opacity: 1, y: -10 },
        leave: { opacity: 1 }
    })

    const socialIconsRef = useSpringRef();
    const socialIconsAnim = useSpring({
        ref: socialIconsRef,
        from: { opacity: 0, x: 100},
        to: { opacity: 1, x: 0}
    })

    const yearRef = useSpringRef();
    const yearAnim = useSpring({
        ref: yearRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: 20, y: 200},
        to: { opacity: 1, x: 0, y: 0},
    })

    // Using blogConfig for data (similar to winkConfig in Works)
    const [searchObj, setSearchObj] = useState(blogConfig)

    const querychange = obj => {
        if (obj) {
            setSearchObj(obj)
        } else {
            setSearchObj(blogConfig)
        }
    }

    const rightSectionRef = useSpringRef()
    const [rightAnimStatus, setRightAnimStatus] = useState(true)
    const rightSectionProps = useTransition(searchObj, rightAnimStatus && {
        ref: rightSectionRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -40 },
        enter: { opacity: 1, x: 0 },
        leave: { opacity: 0 },
        trail: 100,
        onRest: () => setRightAnimStatus(false)
    })

    useChain([navRef, socialIconsRef, trailsRef, blogsTitleWrapperPropsRef, dividerLineRef, countTrailsRef, searchWrapperRef, quotesWrapperRef, rightSectionRef, yearRef], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 100)

    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Blogs | Christopher Crow</title>
            <link rel="canonical" href={window.location.href} />
            <link rel="icon" href={favicon} />
            <link rel="apple-touch-icon" sizes="180x180" href={appleIcon} />
            <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
            <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
            <link rel="manifest" href={siteManifest} />
            
            <meta name="title" content="Blogs | Christopher Crow" />
            <meta name="description" content="Christopher Crow's personal website" />
            <meta name="keywords" content="Christopher Crow, Astrophysics, Data, Machine Learning" />
            <meta name="author" content="Christopher Crow" />

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
        </Helmet>
        <GlobalStyle />
        <PageWrapper>
            <DesktopNav style={navReveal} />
            <MainWrapper>
                <LeftPart>
                    <div id="MainId" style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                        <BlogsTitleWrapper>
                            {blogsTitleWrapperProps((style, item) => (
                                <a.div style={style} key="blogsTitleDiv">
                                    <TopDividerLine style={dividerLineProps} />
                                    {trails.map(({ height, ...style }, index) => (
                                        <BlogsTitle style={style} key={index}>{blogsTitleList[index]}</BlogsTitle>
                                    ))}
                                </a.div>
                            ))}
                        </BlogsTitleWrapper>
                        <CountWrapper>
                        {countTrails.map(({ height, ...style }, index) => (
                            <a.p style={style} key={index}>{searchObj.length}/{blogConfig.length}</a.p>
                        ))}
                        </CountWrapper>
                    </div>
                    {searchWrapperProps((style, item) => (
                    <SearchWrapper style={style} key="searchWrapper">
                        <h3>FILTER</h3>
                        <label>SEARCH</label>
                        <Search autofocus={true} winkconfig={blogConfig} querychange={querychange} />
                    </SearchWrapper>
                    ))}
                    {quotesWrapperProps((style, item) => (
                    <QuotesWrapper style={style} key="quotesWrapper">
                        {quote ? <span>Quote : [<br />&nbsp;&nbsp;&nbsp;&nbsp;{quote.content}<br />&nbsp;&nbsp;&nbsp;&nbsp;~ {quote.author}<br />] ,<br />Reload : [ <a onClick={fetchQuote}>Yes</a> , No ]</span>
                            : <span>Loading...</span>
                        }
                    </QuotesWrapper>
                    ))}
                </LeftPart>
                <RightPart>
                    {rightSectionProps(({ ...style }, item) => (
                        <BlogCard
                          setProject={setProject}
                          setShowCard={setShowCard}
                          key={item.id}
                          item={item}
                          style={(rightAnimStatus ? style : null)}
                        />
                    ))}
                </RightPart>
            </MainWrapper>
            <FooterWrapper>
                {!mobile ? <>
                <SocialIcons style={socialIconsAnim} pagetype="Works" />
                <Year style={yearAnim}>20<br/>24</Year>
                </> : null}
            </FooterWrapper>
            {!tablet ? <Cursor project={project} showCard={showCard} /> : null}
        </PageWrapper>
        </>
    )
}

const GlobalStyle = createGlobalStyle`
    *::-webkit-scrollbar {
        width: 6px;
        background: #000;
    }
    *::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px grey;
        border-radius: 5px;
    }
    *::-webkit-scrollbar-thumb {
        background: darkcyan;
        border-radius: 15px;
        height: 2px;
    }
    *::-webkit-scrollbar-thumb:hover {
        background: lightblue;
        max-height: 10px;
    }
    *::-webkit-scrollbar-thumb:active {
        display: block;
        background-size: 10px;
    }
    *::-webkit-scrollbar-button:vertical:end:increment {
        display: block;
        background-size: 10px;
    }
    body {
        overflow-x: hidden;
        overflow-y: hidden;
        @media screen and (max-width: 1001px) {
            overflow-y: unset;
        }
    }
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #000;
    nav {
        padding-top: 52px;
        margin-top: unset;
    }
    @media screen and (max-width: 1000px) {
        height: unset;
        min-height: 100vh;
    }
`

const MainWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50vw auto;
    grid-template-rows: 1fr;
    overflow: hidden;
    padding-bottom: 3rem;
    @media screen and (max-width: 1000px) {
        display: flex;
        flex-direction: column;
    }
`

const LeftPart = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4rem 0 0 4rem;
    @media screen and (max-width: 767px) {
        padding-left: 34px;
        justify-content: flex-start;
        gap: 6rem;
        #MainId {
            gap: 0 !important;
        }
    }
    @media screen and (max-width: 1000px) {
        gap: 8rem;
    }
`

const RightPart = styled.div`
    box-sizing: border-box;
    position: relative;
    grid-column: 2;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    overflow-x: hidden;
    @media screen and (max-width: 1000px) {
        height: unset;
        overflow-y: auto;
        margin: 4rem;
        gap: 2rem;
    }
    @media screen and (max-width: 767px) {
        margin: 2rem 1rem 0 1rem;
    }
`

const CountWrapper = styled.div`
    color: #fff;
    line-height: 14px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0;
    p {
        ::before {
            content: '~ ';
            line-height: 14px;
            font-size: 16px;
            font-weight: 900;
            letter-spacing: 0;
            background: linear-gradient(to right, #8a2387, #e94057, #f27121);
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
        }
    }
`

const SearchWrapper = styled(a.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    color: #fff;
    margin-top: -6rem;
    h3 {
        font-size: 18px;
        font-weight: 700;
    }
    label {
        line-height: 14px;
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0;
    }
    @media screen and (max-width: 767px) {
        margin-top: -4rem;
    }
`

const QuotesWrapper = styled(a.div)`
    box-sizing: content-box;
    position: relative;
    display: block;
    color: #fff;
    width: 30%;
    @media screen and (max-width: 767px) {
        display: none;
    }
    min-height: 102px;
    user-select: none;
    ::before {
        position: absolute;
        top: -2rem;
        content: "“ ";
        font-size: 2rem;
        font-weight: 900;
        background: linear-gradient(to right, #8a2387, #e94057, #f27121);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }
    ::after {
        position: absolute;
        bottom: -1rem;
        content: "”";
        width: 100%;
        display: flex;
        justify-content: flex-end;
        font-size: 2rem;
        font-weight: 900;
        background: linear-gradient(to right, #8a2387, #e94057, #f27121);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }
    span {
        position: relative;
        display: block;
        text-transform: uppercase;
        font-family: system-ui;
        letter-spacing: 0;
        line-height: 14px;
        font-size: 12px;
        font-weight: 400;
        padding-left: 1rem;
    }
`

const BlogsTitleWrapper = styled.div`
    width: fit-content;
    height: fit-content;
`

const TopDividerLine = styled(a.div)`
    position: absolute;
    width: 5rem;
    height: 4px;
    background: linear-gradient(to right, #8a2387, #e94057, #f27121);
`

const BlogsTitle = styled(a.span)`
    font-size: 5rem;
    font-weight: 700;
    font-family: system-ui;
    color: #fff;
    user-select: none;
`

const FooterWrapper = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    left: 50%;
    transform: translate(-50%, -8px);
    div {
        flex-direction: row;
    }
`

const Year = styled(a.span)`
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 32px;
    font-weight: 700;
    line-height: 75%;
    color: #fff;
    @media screen and (max-width: 767px) {
        display: none;
    }
`;

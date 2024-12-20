import styled from "styled-components";
import { a } from "@react-spring/web";

export default function WorksCard({ item, style, setProject, setShowCard }) {
    return (
        <CardWrapper
          style={style}
          href={item.link}
          target="_blank"
          onMouseOver={() => {setProject(item);}}
          onMouseOut={() => {setProject(null);}}
        >
            <span></span>
            <Card>
                {/* If item.image is available, show it */}
                {item.image && <ImageWrapper><img src={item.image} alt={item.title} /></ImageWrapper>}
                
                <h3>{item.year}</h3>
                <h1>{item.title}</h1>
                
                {item.description && <Description>{item.description}</Description>}
                
                <InfoRow>
                    <h3>{item.category}</h3>
                    <h3>{item.industry}</h3>
                </InfoRow>

                {/* If tools are provided, show them as a simple comma-separated list */}
                {item.tools && item.tools.length > 0 && (
                  <Tools>
                    <h3>Tools:</h3>
                    <p>{item.tools.join(', ')}</p>
                  </Tools>
                )}
            </Card>
        </CardWrapper>
    )
}

const CardWrapper = styled(a.a)`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
    height: fit-content;
    padding: 50px;
    color: #fff;
    text-decoration: none;
    border-left: 1px solid #8f8f90;
    transition: .3s cubic-bezier(0.25,0.8,0.25,1) 0s;

    span {
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #8f8f90;
        left: 0;
        top: 0;
    }

    :hover {
        background: rgb(251, 133, 0);
        h3, h1, div > h3 {
            transform: translateX(32px);
        }
        @media screen and (max-width: 767px) {
            h3, h1, div > h3 {
                transform: unset;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        border: unset;
        padding: 25px;
        span {
            display: none;
        }
        :focus-visible {
            background: rgb(251, 133, 0);
        }
        ::before {
            content: "";
            top: 0;
            right: 0;
            width: 15px;
            height: 15px;
            position: absolute;
            border-top: 1pt solid  #8f8f90;
            border-right: 1pt solid #8f8f90;
            transition: .35s cubic-bezier(0.25,0.8,0.25,1);
        }
        ::after {
            content: "";
            top: 0;
            left: 0;
            width: 15px;
            height: 15px;
            position: absolute;
            border-top: 1pt solid #8f8f90;
            border-left: 1pt solid #8f8f90;
            transition: .35s cubic-bezier(0.25,0.8,0.25,1);
        }
        :hover {
            background: unset;
            ::before {
                width: 50px;
                height: 50px;
            }
            ::after {
                width: 50px;
                height: 50px;
            }
        }
    }
`

const Card = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    min-height: 200px;
    height: fit-content;
    box-sizing: border-box;

    h3 {
        font-size: 12px;
        font-family: system-ui;
        text-transform: uppercase;
        white-space: pre-wrap;
        line-height: 14px;
        font-weight: 300;
        letter-spacing: 0;
        max-width: 500px;
        transition: .3s cubic-bezier(0.25,0.8,0.25,1) 0s;
        margin: 5px 0;
    }

    h1 {
        font-size: 5rem;
        font-weight: 700;
        font-family: system-ui;
        transition: .3s cubic-bezier(0.25,0.8,0.25,1) 0.1s;
        margin: 10px 0;
    }

    @media screen and (max-width: 767px) {
        h1 {
            font-size: 40px;
        }
    }
`

const ImageWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    img {
        max-width: 100%;
        height: auto;
        display: block;
    }
`

const Description = styled.p`
    font-size: 1rem;
    font-family: system-ui;
    font-weight: 300;
    line-height: 1.4;
    margin: 15px 0;
    max-width: 600px;
`

const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: .3s cubic-bezier(0.25,0.8,0.25,1) 0.15s;
    margin: 10px 0;
    h3 {
        margin-right: 20px;
    }
`

const Tools = styled.div`
    margin-top: 15px;
    h3 {
        font-size: 12px;
        text-transform: uppercase;
        font-family: system-ui;
        font-weight: 300;
        margin-bottom: 5px;
    }
    p {
        font-size: 0.9rem;
        font-family: system-ui;
        font-weight: 300;
        line-height: 1.4;
        max-width: 500px;
    }
`

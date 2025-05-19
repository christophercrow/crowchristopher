import styled from "styled-components";
import { a } from "@react-spring/web";
import { useState } from "react";

export default function WorksCard({ item, style, setProject, setShowCard }) {
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <CardWrapper
          style={style}
          href={item.link}
          target="_blank"
          onMouseOver={() => { if (!isButtonHovered) setProject(item); }}
          onMouseOut={() => { setProject(null); }}
        >
            <span></span>
            <Card>
                <h3>{item.year}</h3>
                <h1>{item.title}</h1>

                {item.description && <Description>{item.description}</Description>}

                <InfoRow>
                    <h3>{item.category}</h3>
                    <h3>{item.industry}</h3>
                </InfoRow>

                {item.tools && item.tools.length > 0 && (
                  <Tools>
                    <h3>Tools:</h3>
                    <p>{item.tools.join(', ')}</p>
                  </Tools>
                )}

                {/* Button to view the raw JPEG */}
                <ButtonWrapper
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    <a href="https://raw.githubusercontent.com/christophercrow/wink/refs/heads/dev-react/src/images/CrowChristopher_SESAPS.jpg" target="_blank" rel="noopener noreferrer">
                        View Poster
                    </a>
                </ButtonWrapper>
            </Card>
        </CardWrapper>
    );
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
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
    }
`;

const Card = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    min-height: 200px;
    height: fit-content;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: ${({ hidePreview }) => (hidePreview ? "0" : "auto")};
    overflow: hidden;
    margin-bottom: ${({ hidePreview }) => (hidePreview ? "0" : "20px")};
    opacity: ${({ hidePreview }) => (hidePreview ? "0" : "1")};
    visibility: ${({ hidePreview }) => (hidePreview ? "hidden" : "visible")};
    transition: opacity 0.3s ease, visibility 0.3s ease, height 0.3s ease, margin-bottom 0.3s ease;

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }
`;

const Description = styled.p`
    font-size: 1rem;
    font-family: system-ui;
    font-weight: 300;
    line-height: 1.4;
    margin: 15px 0;
    max-width: 600px;
`;

const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    h3 {
        margin-right: 20px;
    }
`;

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
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;

    a {
        display: inline-block;
        padding: 10px 20px;
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

import styled from "styled-components"

export default function Logo() {
    return (
        <LogoWrapper><h1>C</h1></LogoWrapper>
    )
}

const LogoWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 5px;
    background:rgb(255, 255, 255);
    display: flex;
    h1 {
        font-size: 48px;
        font-weight: bold;
        margin: auto;
    }
`
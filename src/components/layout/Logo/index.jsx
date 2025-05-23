import React, { Suspense } from "react";
import styled from "styled-components";
import { ReactComponent as LogoSVG } from "../../../assets/icons/favicon.svg";

export default function Logo() {
    return (
        <LogoWrapper>
            <Suspense fallback={null}>
                <LogoSVG />
            </Suspense>
        </LogoWrapper>
    );
}


const LogoWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 5px;
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 38px;
        height: 38px;
        object-fit: contain;
        display: block;
    }
`;

// src/components/BlogCard/index.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { a } from "@react-spring/web";
import axios from "axios";

export default function BlogCard({ item, style, setProject, setShowCard }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!item.link) return;

    const fetchLinkPreview = async () => {
      try {
        const response = await axios.get('/api/link-preview', {
          params: { url: item.link },
        });
        const data = response.data;
        if (data.images && data.images.length > 0) {
          setPreviewImage(data.images[0]);
        } else {
          // Optionally set a fallback image if no OG image is found
          setPreviewImage('/fallback-image.jpg'); // Ensure this image exists in your public folder
        }
      } catch (err) {
        console.error("Failed to fetch link preview:", err.message);
        setError("Unable to load preview image.");
        // Optionally set a fallback image on error
        setPreviewImage('/fallback-image.jpg');
      }
    };

    fetchLinkPreview();
  }, [item.link]);

  return (
    <CardWrapper
      style={style}
      onMouseOver={() => {
        if (!isHovered) setProject(item);
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setProject(null);
        setIsHovered(false);
      }}
    >
      <span></span>
      <Card>
        {/* Typical fields you show on the blog card */}
        <h3>{item.date}</h3>
        <h1>{item.title}</h1>
        {item.summary && <Description>{item.summary}</Description>}
        
        {/* The place to display the OG preview image on hover */}
        <ImageWrapper hidePreview={!isHovered}>
          {previewImage ? (
            <img src={previewImage} alt={`${item.title} preview`} loading="lazy" />
          ) : (
            <img src="/fallback-image.jpg" alt="Fallback preview" loading="lazy" />
          )}
        </ImageWrapper>
        

        <InfoRow>
          <h3>{item.category}</h3>
        </InfoRow>

        {/* "Read More" button -> linking externally or locally */}
        <ButtonWrapper>
          <a
            href={item.link} 
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </ButtonWrapper>
      </Card>
    </CardWrapper>
  );
}


/* ---------------------- Styled Components ---------------------- */
const CardWrapper = styled(a.div)`
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
  cursor: pointer;

  span {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #8f8f90;
    left: 0;
    top: 0;
  }

  &:hover {
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

  h1, h3 {
    margin: 0;
  }
  h1 {
    font-size: 2rem;
    margin-top: 10px;
    font-weight: 600;
    color: #fff;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    opacity: 0.8;
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

const ImageWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  height: ${({ hidePreview }) => (hidePreview ? "0" : "auto")};
  overflow: hidden;
  opacity: ${({ hidePreview }) => (hidePreview ? 0 : 1)};
  visibility: ${({ hidePreview }) => (hidePreview ? "hidden" : "visible")};
  transition: opacity 0.3s ease, height 0.3s ease, visibility 0.3s ease;

  img {
    max-width: 100%;
    display: block;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;

  h3 {
    margin-right: 20px;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    opacity: 0.9;
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

// src/components/ui/Card.jsx
import React from "react";

export default function Card({ cardProps }) {
  return (
    <div
      style={{
        background: cardProps.cardBody.backgroundColor,
        border: `${cardProps.cardBody.borderWidth}px solid ${cardProps.cardBody.borderColor}`,
        borderRadius: cardProps.cardBody.borderRadius,
        padding: "1.8em 2em",
        margin: "1em",
        color: "#e7f7ff",
        boxShadow: "0 6px 40px #182a4444",
        minWidth: 330,
        maxWidth: 450,
      }}
    >
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            background: cardProps.pin.backgroundColor,
            color: cardProps.pin.textColor,
            padding: "0.3em 0.7em",
            borderRadius: "16px",
            fontWeight: cardProps.pin.font.fontWeight,
            fontSize: cardProps.pin.font.fontSize,
            boxShadow: "0 2px 16px #47ffe966"
          }}
        >
          {cardProps.pin.title}
        </div>
      </div>
      <h2 style={{ color: cardProps.title.color, fontWeight: cardProps.title.font.fontWeight }}>
        {cardProps.title.text}
      </h2>
      <div style={{ color: cardProps.subtitle.color, marginBottom: "1em" }}>
        {cardProps.subtitle.text}
      </div>
      <div style={{ marginBottom: "1.5em" }}>
        <img
          src={cardProps.image.image.src}
          alt={cardProps.title.text}
          style={{
            width: "100%",
            maxHeight: "220px",
            objectFit: "cover",
            borderRadius: cardProps.image.borderRadius,
            boxShadow: "0 4px 28px #2227"
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "0.9em", flexWrap: "wrap", alignItems: "center" }}>
        {cardProps.techIcons.map(({ icon: Icon, label }) => (
          <span
            key={label}
            title={label}
            style={{
              fontSize: "2em",
              color: "#47ffe9",
              background: "#1f2a31",
              borderRadius: "7px",
              padding: "0.2em 0.35em",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px #1f6feb44",
            }}
          >
            <Icon />
          </span>
        ))}
      </div>
    </div>
  );
}

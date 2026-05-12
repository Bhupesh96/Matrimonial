import React, { useId } from "react";
import { Link } from "react-router-dom";

/**
 * <Brand />  – Dewangan Links logo block.
 *
 * Renders the gold wedding-rings SVG + "Dewangan Links" text +
 * optional MATRIMONY tagline. Same look on every page.
 *
 * Props:
 *   size      "sm" | "md" | "lg"           default "md"
 *   variant   "dark" | "light"             default "dark"
 *                ("dark"  = gold + brown on light bg
 *                 "light" = gold + cream on dark bg, e.g. footer)
 *   tagline   string | false               default "Find Your Perfect Match"
 *   to        string | null                default "/"     – wraps in <Link>; pass null for plain block
 *   className extra css classes
 */
const Brand = ({
  size = "md",
  variant = "dark",
  tagline = "Find Your Perfect Match",
  to = "/",
  className = "",
}) => {
  const reactId = useId();
  const id = `dwGrad${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const inner = (
    <>
      <svg
        className="dw-brand-icon"
        viewBox="0 0 44 28"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={id}
            x1="0"
            y1="0"
            x2="44"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#e8c46a" />
            <stop offset="55%" stopColor="#c8902a" />
            <stop offset="100%" stopColor="#7a4f0c" />
          </linearGradient>
        </defs>
        <circle
          cx="15"
          cy="14"
          r="10.5"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2.6"
        />
        <circle
          cx="29"
          cy="14"
          r="10.5"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2.6"
        />
        <path
          d="M22 7.5l-1.4 2.4 1.4 2.4 1.4-2.4z"
          fill="#c8902a"
          opacity="0.9"
        />
      </svg>

      <span className="dw-brand-text">
        <span className="dw-brand-name">
          Dewangan <b>Wedding</b>
        </span>
        {tagline ? <span className="dw-brand-tag">{tagline}</span> : null}
      </span>
    </>
  );

  const classes = `dw-brand dw-brand-${size} dw-brand-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} aria-label="Dewangan Links home">
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
};

export default Brand;

import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
  variant?: "top-left" | "top-right";
  style?: React.CSSProperties;
};

export const Spotlight = ({ 
  className, 
  fill, 
  variant = "top-left",
  style
}: SpotlightProps) => {

  // Define the transform matrix based on the variant
  const transformMatrix =
    variant === "top-left"
      ? "matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
      : "matrix(0.822377 -0.568943 0.568943 0.822377 155.12 2291.09)";

  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%]",
        className
      )}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="2500"
          ry="400"
          transform={transformMatrix}
          fill={fill || "white"}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
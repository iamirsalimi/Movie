export default function RadialProgress({ score }) {
  const circleRadius = 14;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const getStrokeColor = () => {
    if (score >= 7) return "#059669"; // green
    if (score >= 5) return "#facc15"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <div className="relative w-10 h-10 bg-secondary rounded-full">
      <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={circleRadius}
          fill="transparent"
          className="opacity-25"
          stroke={getStrokeColor()}
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="20"
          r={circleRadius}
          fill="transparent"
          stroke={getStrokeColor()}
          className="rounded-full"
          strokeWidth="2"
          strokeDasharray={circleCircumference}
          strokeDashoffset={circleCircumference * (1 - Math.min(score, 10) / 10)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-0 flex items-center justify-center w-full h-full text-[11px] font-bold text-white">
        {score}
      </div>
    </div>
  );
}

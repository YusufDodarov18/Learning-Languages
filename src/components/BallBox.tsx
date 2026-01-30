import type { BallBoxProps } from "../type";

function BallBox({ total, status }: BallBoxProps) {
  return (
    <div className="grid grid-cols-10 pt-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="border-2 border-cyan-700 w-20 h-5 rounded-lg"
          style={{
            backgroundColor:
              !status || status[i] === undefined
                ? "transparent"
                : status[i]
                  ? "oklch(72.3% 0.219 149.579)"
                  : "red",
          }}
        ></div>
      ))}
    </div>
  );
}

export default BallBox;

export default function Body({ body }) {
  return body.map((segment, i) => (
    <div
      key={i}
      style={{width: 35, height: 35, backgroundColor: "blue", position: "absolute", left: `${segment.x}px`, top: `${segment.y}px`, borderRadius: "40%", border: "1px solid darkblue", zIndex: 2,}}
    />
  ));
}
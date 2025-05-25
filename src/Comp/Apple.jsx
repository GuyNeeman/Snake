import appleImage from '../assets/apple.png';

export default function Apple({ position }) {
  return (
    <div style={{width: 35, height: 35, position: "absolute", left: position.x, top: position.y, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1}}>
      <img src={appleImage} alt="apple" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
    </div>
  );
}
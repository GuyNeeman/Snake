import appleImage from '../assets/apple.png';

export default function Apple({ position }) {

    return (
        <div
            style={{
                width: "35px",
                height: "35px",
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
            }}
        >
            <img
                src={appleImage}
                alt="apple"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxWidth: "35px",
                    maxHeight: "35px"
                }}
            />
        </div>
    );
}
import { useState } from "react";

export default function Apple({ position }) {
    const [inputs] = useState({ width: 35, height: 35 });

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
            <div
                style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    position: "relative",
                    boxShadow: "inset -1px -2px 3px rgba(0,0,0,0.3)",
                }}
            >
                <div
                    style={{
                        width: "3px",
                        height: "5px",
                        backgroundColor: "brown",
                        borderRadius: "1px",
                        position: "absolute",
                        top: "-3px",
                        left: "12px",
                    }}
                />
                <div
                    style={{
                        width: "6px",
                        height: "3px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "-3px",
                        left: "13px",
                        transform: "rotate(30deg)",
                    }}
                />
            </div>
        </div>
    );
}

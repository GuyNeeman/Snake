import { useRef } from "react";

export default function Body({ body, directionRef }) {
    return (
        <>
            {body.map((segment, index) => {
                const isLast = index === body.length - 1;
                let borderRadius;

                if (isLast) {
                    switch (directionRef.current) {
                        case "w": borderRadius = "20% 20% 50% 50%"; break;
                        case "a": borderRadius = "20% 50% 50% 20%"; break;
                        case "s": borderRadius = "50% 50% 20% 20%"; break;
                        case "d": borderRadius = "50% 20% 20% 50%"; break;
                        default: borderRadius = "35%";
                    }
                } else {
                    borderRadius = "35%";
                }

                return (
                    <div
                        key={index}
                        style={{
                            width: "35px",
                            height: "35px",
                            backgroundColor: "blue",
                            position: "absolute",
                            left: `${segment.x}px`,
                            top: `${segment.y}px`,
                            borderRadius: borderRadius,
                            border: "1px solid darkblue",
                            zIndex: 1,
                        }}
                    />
                );
            })}
        </>
    );
}
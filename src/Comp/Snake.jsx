import { useState, useEffect, useRef, useCallback } from "react";

export default function Snake({ position, setPosition, setSnake, snake, setBody, body }) {
    const [inputs] = useState({ width: 35, height: 35 });
    const directionRef = useRef("d");
    const nextDirectionRef = useRef("d");

    const handleKeyPress = useCallback((event) => {
        const keyMap = {
            w: "w", ArrowUp: "w",
            a: "a", ArrowLeft: "a",
            s: "s", ArrowDown: "s",
            d: "d", ArrowRight: "d",
        };
        const newDir = keyMap[event.key];
        if (!newDir) return;

        const opposite = { w: "s", s: "w", a: "d", d: "a" };

        if (newDir !== opposite[directionRef.current]) {
            nextDirectionRef.current = newDir;
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            directionRef.current = nextDirectionRef.current;

            setPosition(prevPosition => {
                const step = 35;
                let newPosition = { ...prevPosition };

                switch (directionRef.current) {
                    case "w": newPosition.y -= step; break;
                    case "a": newPosition.x -= step; break;
                    case "s": newPosition.y += step; break;
                    case "d": newPosition.x += step; break;
                }

                const isOutOfBounds =
                    newPosition.x < 0 || newPosition.x >= 595 ||
                    newPosition.y < 0 || newPosition.y >= 595;

                const hitsBody = snake > 0 && body.some(segment => segment.x === newPosition.x && segment.y === newPosition.y);

                const resetGame = () => {
                    setSnake(0);
                    setBody([]);
                    directionRef.current = "d";
                    nextDirectionRef.current = "d";
                    setPosition({ x: 70, y: 280 });
                };

                if (isOutOfBounds || hitsBody) {
                    resetGame();
                }

                setBody(prevBody => {
                    const updated = [prevPosition, ...prevBody];
                    return updated.slice(0, snake);
                });

                return newPosition;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [setPosition, setBody, snake, setSnake, body]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    return (
        <div
            style={{
                width: `${inputs.width}px`,
                height: `${inputs.height}px`,
                backgroundColor: "blue",
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                borderRadius: "20%",
                border: "2px solid darkblue",
                zIndex: 1,
            }}
        />
    );
}

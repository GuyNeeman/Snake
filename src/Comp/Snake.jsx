import { useState, useEffect, useRef, useCallback } from "react";

export default function Snake({ position, setPosition, setSnake, snake, setBody, body, gameover, setGameOver, setLastPoint, directionRef }) {
    const [inputs] = useState({ width: 35, height: 35 });
    const nextDirectionRef = useRef("");

    const handleKeyPress = useCallback((event) => {
        if (gameover) return;

        const newDir = getDirectionFromKey(event.key);
        if (!newDir) return;

        const oppositeDirections = { w: "s", s: "w", a: "d", d: "a" };
        if (newDir !== oppositeDirections[directionRef.current]) {
            nextDirectionRef.current = newDir;
        }
    }, [gameover]);

    const getDirectionFromKey = (key) => {
        const keyMap = {
            w: "w", ArrowUp: "w",
            a: "a", ArrowLeft: "a",
            s: "s", ArrowDown: "s",
            d: "d", ArrowRight: "d",
        };
        return keyMap[key];
    };

    const calculateNewPosition = (currentPosition) => {
        const step = 35;
        const newPosition = { ...currentPosition };

        switch (directionRef.current) {
            case "w": newPosition.y -= step; break;
            case "a": newPosition.x -= step; break;
            case "s": newPosition.y += step; break;
            case "d": newPosition.x += step; break;
        }

        return newPosition;
    };

    const checkCollision = (position) => {
        const isOutOfBounds =
            position.x < 0 || position.x >= 595 ||
            position.y < 0 || position.y >= 595;

        const hitsBody = snake > 0 &&
            body.some(segment => segment.x === position.x && segment.y === position.y);

        return isOutOfBounds || hitsBody;
    };

    const resetGame = () => {
        setBody([]);
        directionRef.current = "";
        nextDirectionRef.current = "";
        setPosition({ x: 70, y: 280 });
        setGameOver(true);
        setLastPoint(snake);
        setSnake(0);
    };

    const updateSnakeBody = (currentPosition) => {
        setBody(prevBody => {
            const updated = [currentPosition, ...prevBody];
            return updated.slice(0, snake);
        });
    };

    useEffect(() => {
        if (gameover) return;

        const gameInterval = setInterval(() => {
            directionRef.current = nextDirectionRef.current;

            setPosition(prevPosition => {
                const newPosition = calculateNewPosition(prevPosition);

                if (checkCollision(newPosition)) {
                    resetGame();
                    return prevPosition;
                }

                updateSnakeBody(prevPosition);
                return newPosition;
            });
        }, 150);

        return () => clearInterval(gameInterval);
    }, [setPosition, setBody, snake, body, gameover]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    const getHeadStyle = () => {
        const baseStyle = {
            width: `${inputs.width}px`,
            height: `${inputs.height}px`,
            backgroundColor: "blue",
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            border: "2px solid darkblue",
            zIndex: 3,
        };

        switch (directionRef.current) {
            case "w":
                return { ...baseStyle, borderRadius: "50% 50% 20% 20%" };
            case "a":
                return { ...baseStyle, borderRadius: "50% 20% 20% 50%" };
            case "s":
                return { ...baseStyle, borderRadius: "20% 20% 50% 50%" };
            case "d":
                return { ...baseStyle, borderRadius: "20% 50% 50% 20%" };
            default:
                return { ...baseStyle, borderRadius: "35%" };
        }
    };

    const renderEyes = () => {
        const eyeStyle = {
            position: "absolute",
            width: "8px",
            height: "8px",
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 4,
        };

        const pupilStyle = {
            position: "absolute",
            width: "4px",
            height: "4px",
            backgroundColor: "black",
            borderRadius: "50%",
            zIndex: 5,
        };

        const tongueStyle = {
            position: "absolute",
            width: "10px",
            height: "4px",
            backgroundColor: "red",
            zIndex: 4,
            borderRadius: "0 0 5px 5px",
        };

        switch (directionRef.current) {
            case "w":
                return (
                    <>
                        <div style={{ ...eyeStyle, left: "5px", top: "5px" }} />
                        <div style={{ ...pupilStyle, left: "6px", top: "6px" }} />
                        <div style={{ ...eyeStyle, left: "22px", top: "5px" }} />
                        <div style={{ ...pupilStyle, left: "23px", top: "6px" }} />
                        <div style={{ ...tongueStyle, left: "12px", top: "-4px" }} />
                    </>
                );
            case "a":
                return (
                    <>
                        <div style={{ ...eyeStyle, left: "5px", top: "5px" }} />
                        <div style={{ ...pupilStyle, left: "6px", top: "6px" }} />
                        <div style={{ ...eyeStyle, left: "5px", top: "22px" }} />
                        <div style={{ ...pupilStyle, left: "6px", top: "23px" }} />
                        <div style={{ ...tongueStyle, left: "-4px", top: "15px", transform: "rotate(90deg)" }} />
                    </>
                );
            case "s":
                return (
                    <>
                        <div style={{ ...eyeStyle, left: "5px", top: "22px" }} />
                        <div style={{ ...pupilStyle, left: "6px", top: "23px" }} />
                        <div style={{ ...eyeStyle, left: "22px", top: "22px" }} />
                        <div style={{ ...pupilStyle, left: "23px", top: "23px" }} />
                        <div style={{ ...tongueStyle, left: "12px", top: "35px", transform: "rotate(180deg)" }} />
                    </>
                );
            case "d":
                return (
                    <>
                        <div style={{ ...eyeStyle, left: "22px", top: "5px" }} />
                        <div style={{ ...pupilStyle, left: "23px", top: "6px" }} />
                        <div style={{ ...eyeStyle, left: "22px", top: "22px" }} />
                        <div style={{ ...pupilStyle, left: "23px", top: "23px" }} />
                        <div style={{ ...tongueStyle, left: "35px", top: "15px", transform: "rotate(270deg)" }} />
                    </>
                );
            default:
                return (
                    <>
                        <div style={{ ...eyeStyle, left: "5px", top: "5px" }} />
                        <div style={{ ...pupilStyle, left: "6px", top: "6px" }} />
                        <div style={{ ...eyeStyle, left: "22px", top: "5px" }} />
                        <div style={{ ...pupilStyle, left: "23px", top: "6px" }} />
                    </>
                );
        }
    };

    return (
        <div style={getHeadStyle()}>
            {renderEyes()}
        </div>
    );
}
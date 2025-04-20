import Snake from "./Snake.jsx";
import Apple from "./Apple.jsx";
import Body from "./Body.jsx";
import {useState, useEffect, useRef} from "react";

export default function Grid() {
    const [positionApple, setPositionApple] = useState({ x: 280, y: 420 });
    const [positionSnake, setPositionSnake] = useState({ x: 70, y: 280 });
    const [snake, setSnake] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [gameover, setGameOver] = useState(false);
    const [body, setBody] = useState([]);
    const [lastpoint, setLastPoint] = useState([]);
    const directionRef = useRef("");

    useEffect(() => {
        if (positionSnake.x === positionApple.x && positionSnake.y === positionApple.y) {
            const maxStepsX = Math.floor(595 / 35);
            const maxStepsY = Math.floor(595 / 35);

            let newX, newY, valid = false;

            while (!valid) {
                newX = Math.floor(Math.random() * maxStepsX) * 35;
                newY = Math.floor(Math.random() * maxStepsY) * 35;
                valid = !body.some(segment => segment.x === newX && segment.y === newY) &&
                    !(positionSnake.x === newX && positionSnake.y === newY);
            }

            setPositionApple({ x: newX, y: newY });
            setSnake(prev => prev + 1);
            console.log("PointGiven")
            if(snake >= highscore){
                setHighscore( snake);
            }
        }
    }, [positionSnake, positionApple, body]);

    const resetGame = () => {
        setSnake(0);
        setBody([]);
        setPositionSnake({ x: 70, y: 280 });
        setPositionApple({ x: 280, y: 420 });
        setGameOver(false);
    };

    return (
        <>
            <h2>Punkte = {snake} , High Score = {highscore}</h2>
            {gameover && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 999
                }}>
                    <div style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "2rem",
                        borderRadius: "1rem",
                        textAlign: "center",
                        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                        maxWidth: "300px"
                    }}>
                        <h2>Game Over!</h2>
                        <p>Your score: {lastpoint}</p>
                        <button onClick={resetGame} style={{
                            padding: "0.5rem 1rem",
                            fontSize: "1rem",
                            marginTop: "1rem",
                            cursor: "pointer"
                        }}>Restart</button>
                    </div>
                </div>
            )}

            <div className="container">
                <div
                    style={{
                        width: "595px",
                        height: "595px",
                        position: "relative",
                        backgroundColor: "#AAD751",
                        backgroundImage: `
                        linear-gradient(45deg, #A2D149 25%, transparent 25%),
                        linear-gradient(-45deg, #A2D149 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #A2D149 75%),
                        linear-gradient(-45deg, transparent 75%, #A2D149 75%)
                    `,
                        backgroundSize: "70px 70px",
                        backgroundPosition: "0 0, 0 35px, 35px -35px, -35px 0px"
                    }}
                >
                    <Body body={body}/>
                    <Snake
                        position={positionSnake}
                        setPosition={setPositionSnake}
                        setSnake={setSnake}
                        snake={snake}
                        setBody={setBody}
                        body={body}
                        gameover={gameover}
                        setGameOver={setGameOver}
                        setLastPoint={setLastPoint}
                        directionRef={directionRef}
                    />
                    <Apple position={positionApple} />
                </div>
            </div>
        </>
    );
}

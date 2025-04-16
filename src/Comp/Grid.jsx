import Snake from "./Snake.jsx";
import Apple from "./Apple.jsx";
import Body from "./Body.jsx";
import { useState, useEffect } from "react";

export default function Grid() {
    const [positionApple, setPositionApple] = useState({ x: 280, y: 420 });
    const [positionSnake, setPositionSnake] = useState({ x: 70, y: 280 });
    const [snake, setSnake] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [body, setBody] = useState([]);

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
            setSnake(prev => prev + 2);
            if(snake/2 >= highscore){
                setHighscore( snake/2+1);
            }
        }
    }, [positionSnake, positionApple, body]);

    return (
        <>
            <h2>Punkte = {snake / 2} , High Score = {highscore}</h2>
            <h5>ToDo: add head and rotate it 90*, add reset and gamestart</h5>
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
                    <Body body={body} />
                    <Snake
                        position={positionSnake}
                        setPosition={setPositionSnake}
                        setSnake={setSnake}
                        snake={snake}
                        setBody={setBody}
                        body={body}
                    />
                    <Apple position={positionApple} />
                </div>
            </div>
        </>
    );
}

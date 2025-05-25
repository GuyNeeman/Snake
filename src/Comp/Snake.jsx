import { useState, useEffect, useRef, useCallback } from "react";

const DIRS = { w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0] },
      OPP = { w: "s", s: "w", a: "d", d: "a" },
      KEY_MAP = { w: "w", ArrowUp: "w", a: "a", ArrowLeft: "a", s: "s", ArrowDown: "s", d: "d", ArrowRight: "d" };

export default function Snake({ position, setPosition, setSnake, snake, setBody, body, gameover, setGameOver, setLastPoint, directionRef }) {
  const nextDirectionRef = useRef("");

  const move = useCallback(() => {
    directionRef.current = nextDirectionRef.current;
    setPosition(pos => {
      const [dx, dy] = DIRS[directionRef.current] || [0, 0],
            newPos = { x: pos.x + dx * 35, y: pos.y + dy * 35 },
            out = newPos.x < 0 || newPos.x >= 595 || newPos.y < 0 || newPos.y >= 595,
            hit = body.some(s => s.x === newPos.x && s.y === newPos.y);

      if (out || hit) return reset(pos);
      setBody(b => [pos, ...b].slice(0, snake));
      return newPos;
    });
  }, [setPosition, body, snake]);

  const reset = pos => {
    setBody([]); setGameOver(true); setLastPoint(snake); setSnake(0);
    directionRef.current = nextDirectionRef.current = "";
    return { x: 70, y: 280 };
  };

  const handleKey = useCallback(e => {
    if (!gameover) {
      const dir = KEY_MAP[e.key];
      if (dir && dir !== OPP[directionRef.current]) nextDirectionRef.current = dir;
    }
  }, [gameover]);

  useEffect(() => {
    if (!gameover) {
      const id = setInterval(move, 150);
      return () => clearInterval(id);
    }
  }, [move, gameover]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const baseStyle = {
    width: "35px", height: "35px", backgroundColor: "blue", position: "absolute",
    left: `${position.x}px`, top: `${position.y}px`, border: "2px solid darkblue", zIndex: 3
  };

  const heads = { w: "50% 50% 20% 20%", a: "50% 20% 20% 50%", s: "20% 20% 50% 50%", d: "20% 50% 50% 20%" };
  const tongue = { w: ["12px", "-4px", 0], a: ["-4px", "15px", 90], s: ["12px", "35px", 180], d: ["35px", "15px", 270] };

  const eyes = dir => {
    const eye = (l, t) => <div style={{ ...eyeStyle, left: l, top: t }} />,
          pupil = (l, t) => <div style={{ ...pupilStyle, left: l, top: t }} />;
    const t = tongue[dir] || [],
          tongueEl = t.length ? <div style={{ ...tongueStyle, left: t[0], top: t[1], transform: `rotate(${t[2]}deg)` }} /> : null;

    const [l1, t1, l2, t2] = dir === "a" || dir === "d" ? ["5px", "5px", "5px", "22px"] : ["5px", "5px", "22px", "5px"];
    const [pl1, pt1, pl2, pt2] = [parseInt(l1) + 1 + "px", parseInt(t1) + 1 + "px", parseInt(l2) + 1 + "px", parseInt(t2) + 1 + "px"];
    return <>{eye(l1, t1)}{pupil(pl1, pt1)}{eye(l2, t2)}{pupil(pl2, pt2)}{tongueEl}</>;
  };

  const eyeStyle = { position: "absolute", width: "8px", height: "8px", backgroundColor: "white", borderRadius: "50%", zIndex: 4 },
        pupilStyle = { ...eyeStyle, width: "4px", height: "4px", backgroundColor: "black", zIndex: 5 },
        tongueStyle = { position: "absolute", width: "10px", height: "4px", backgroundColor: "red", zIndex: 4, borderRadius: "0 0 5px 5px" };

  return <div style={{ ...baseStyle, borderRadius: heads[directionRef.current] || "35%" }}>{eyes(directionRef.current)}</div>;
}
export default function Body({ body }) {
    return (
        <>
            {body.map((segment, index) => (
                <div
                    key={index}
                    style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "blue",
                        position: "absolute",
                        left: `${segment.x}px`,
                        top: `${segment.y}px`,
                        borderRadius: "20%",
                        border: "1px solid blue",
                        zIndex: 0,
                    }}
                />
            ))}
        </>
    );
}

import React, { useLayoutEffect, useState } from "react";

function Box() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useLayoutEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    const getStyle = () => {
        let styleObj = {
            height: (size.height - 120) / 7,
            width: size.width / 7,
            backgroundColor: "#f0e1af",
            borderWidth: 1,
            borderColor: "#000000",
        };
        return styleObj;
    };
    return (
        <div style={getStyle()}>
            <span>Text </span>
        </div>
    );
}

export default Box;

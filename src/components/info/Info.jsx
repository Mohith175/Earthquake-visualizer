import { useRef, useState, useEffect } from "react";
import "./Info.css"

export default function Info() {
    const infoBtnRef = useRef(null);
    const infoRef = useRef(null);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                infoRef.current &&
                !infoRef.current.contains(event.target) &&
                infoBtnRef.current &&
                !infoBtnRef.current.contains(event.target)
            ) {
                setShowInfo(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="floating-buttons">
            {showInfo && (
                <div className="info-popup" ref={infoRef}>
                    <b>Magnitude Colors:</b><br />
                    <ul>
                        <li><span className="color-yellow"></span> &lt; 5</li>
                        <li><span className="color-orange"></span> 5 – 6</li>
                        <li><span className="color-red"></span> ≥ 6</li>
                    </ul>
                </div>
            )}
            <button
                className="btn info-btn"
                ref={infoBtnRef}
                onClick={() => setShowInfo((prev) => !prev)}
            >
                ℹ
            </button>
        </div>
    );
}

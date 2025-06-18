import Countdown from "react-countdown";

export function Timer2() {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <div>YEAH</div>;
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            );
        }
    };
    return <Countdown date={Date.now() + 65000} renderer={renderer} zeroPadTime={3}></Countdown>;
}

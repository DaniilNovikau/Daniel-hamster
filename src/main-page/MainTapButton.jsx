import './MainTapButton.css';

export function MainTapButton({handleTap}) {

    const handleClick = (event) => {
        event.preventDefault();
        handleTap();
    }

    return (   
        <div className="tap-button" onClick={handleClick}>
            H
        </div>
    )
}
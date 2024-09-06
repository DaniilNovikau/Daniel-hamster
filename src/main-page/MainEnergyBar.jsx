import './MainEnergyBar.css';

export function MainEnergyBar({userData}) {

    return (   
        <div className="energy-bar">
            <p>E: {userData.energy}/{userData.maxEnergy}</p>
            <p>Boost</p>
        </div>
    )
}
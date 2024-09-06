import { useEffect, useState } from 'react';
import './MainUpgrades.css';

export function MainUpgrades({upgrades, upgradeGroup, handleUpgrade}) {
    const [currentUpgrade, setCurrentUpgrade] = useState({});

    const handleClick = (event) => {
        handleUpgrade(currentUpgrade.id, event.target.parentElement.getAttribute('data-key'));
    }

    useEffect(() => {
        setCurrentUpgrade(upgrades.find((upgrade) => upgrade.id === upgradeGroup));
    }, [upgrades, upgradeGroup])

    return (   
        <div className="upgrades">
            {currentUpgrade?.upgrades?.map(upgrade => 
                <div key={upgrade.id} data-key={upgrade.id} className='upgrades__tile'>
                    <p>Прибыль: {upgrade.reward}</p>
                    <div className='upgrades__tile-button' onClick={handleClick}>{upgrade.price} монет</div>
                </div>
            )}
        </div>
    )
}
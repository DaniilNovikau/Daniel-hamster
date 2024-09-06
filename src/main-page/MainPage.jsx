import './MainPage.css';
import { useState, useEffect } from 'react';
import { MainStats } from './MainStats';
import { MainTapButton } from './MainTapButton';
import { MainEnergyBar } from './MainEnergyBar';
import { MainNavigation } from './MainNavigation';
import { MainUpgrades } from './MainUpgrades';

export function MainPage() {
    const [userData, setUserData] = useState( JSON.parse(localStorage.getItem('userData')) || {});
    const [allUpgrades, setAllUpgrades] = useState( JSON.parse(localStorage.getItem('allUpgrades')) || []);
    const [isUpgrades, setIsUpgrades] = useState(false);
    const [upgradeGroup, setUpgradeGroup] = useState('');

    useEffect(() => {
        console.log('WTF', userData, allUpgrades);
        setUserData(
            userData ||
            {
                id: 'Admin',
                balance: 0,
                tapRevenue: 1,
                minuteRevenue: 60,
                energy: 1500,
                maxEnergy: 1500
            }
        );

        setAllUpgrades(allUpgrades || [
            {
                id: 'tap',
                upgrades: [
                    {
                        id: '1',
                        price: 10,
                        reward: 1
                    },
                    {
                        id: '2',
                        price: 500,
                        reward: 5
                    },
                    {
                        id: '3',
                        price: 10000,
                        reward: 10
                    },
                    {
                        id: '4',
                        price: 250000,
                        reward: 50
                    }
                ]
            },
            {
                id: 'minute',
                upgrades: [
                    {
                        id: '1',
                        price: 150,
                        reward: 60
                    },
                    {
                        id: '2',
                        price: 10000,
                        reward: 300
                    },
                    {
                        id: '3',
                        price: 75000,
                        reward: 600
                    },
                    {
                        id: '4',
                        price: 1250000,
                        reward: 3000
                    }
                ]
            }
        ]);

        const interval = setInterval(() => {
            setUserData(prev => {
                return {
                    ...prev,
                    energy: prev.energy + (prev.energy >= prev.maxEnergy ? 0 : 1)
                }
            })
        }, 10000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('allUpgrades', JSON.stringify(allUpgrades));
    }, [allUpgrades, userData])

    const { minuteRevenue } = userData;

    useEffect(() => {

        const interval = setInterval(() => {
            setUserData(prev => {
                return {
                    ...prev, 
                    balance: prev.balance + (minuteRevenue / 60)
                }
            });
        }, 1000);
 
        return () => clearInterval(interval);
    }, [minuteRevenue])

    const handleTap = () => {
        setUserData({
            ...userData,
            balance: userData.balance + userData.tapRevenue,
            energy: userData.energy - 1
        });
    }

    const navigateToUpgrades = (menuId) => {
        if(menuId === 'clear') {
            clearGame();
            return;
        }
        setIsUpgrades(menuId !== 'main');
        setUpgradeGroup(menuId);
    }

    const clearGame = () => {
        setUserData(
            {
                id: 'Admin',
                balance: 0,
                tapRevenue: 1,
                minuteRevenue: 60,
                energy: 1500,
                maxEnergy: 1500
            }
        );

        setAllUpgrades([
            {
                id: 'tap',
                upgrades: [
                    {
                        id: '1',
                        price: 10,
                        reward: 1
                    },
                    {
                        id: '2',
                        price: 500,
                        reward: 5
                    },
                    {
                        id: '3',
                        price: 10000,
                        reward: 10
                    },
                    {
                        id: '4',
                        price: 250000,
                        reward: 50
                    }
                ]
            },
            {
                id: 'minute',
                upgrades: [
                    {
                        id: '1',
                        price: 150,
                        reward: 60
                    },
                    {
                        id: '2',
                        price: 10000,
                        reward: 300
                    },
                    {
                        id: '3',
                        price: 75000,
                        reward: 600
                    },
                    {
                        id: '4',
                        price: 1250000,
                        reward: 3000
                    }
                ]
            }
        ]);
    }

    const handleUpgrade = (groupId, upgradeId) => {
        console.log(allUpgrades);
        const currentUpgrade = allUpgrades.find((upgrade) => upgrade.id === groupId).upgrades.find((u) => u.id === upgradeId);

        if(userData.balance < currentUpgrade.price) {
            alert('У вас недостаточно деняк на балансе.');
            return;
        }

        if(groupId === 'tap') {
            setUserData({
                ...userData,
                balance: userData.balance - currentUpgrade.price,
                tapRevenue: userData.tapRevenue + currentUpgrade.reward
            });
        } else if(groupId === 'minute') {
            setUserData({
                ...userData,
                balance: userData.balance - currentUpgrade.price,
                minuteRevenue: userData.minuteRevenue + currentUpgrade.reward
            });
        }

        setAllUpgrades(allUpgrades.map((upgrade) => {
            if(upgrade.id === groupId) {
                return {
                    ...upgrade,
                    upgrades: upgrade.upgrades.map((u) => {
                        if(u.id === upgradeId) {
                            return {
                                ...u,
                                price: Math.round((u.price + u.price * 0.5) * 1.1)
                            };
                        }

                        return u;
                    })
                };
            }

            return upgrade;
        }));
    }

    return (   
        <div className="main">
            <MainStats userData={userData}/>
            { !isUpgrades ? (
                <>
                    <MainTapButton handleTap={handleTap}/>
                    <MainEnergyBar userData={userData}/>
                </>
            )  : <MainUpgrades upgrades={allUpgrades} upgradeGroup={upgradeGroup} handleUpgrade={handleUpgrade}/> }
            
            <MainNavigation navigateToUpgrades={navigateToUpgrades}/>
        </div>
    )
}
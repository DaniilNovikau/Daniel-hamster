import './MainStats.css';

export function MainStats({userData}) {

    return (   
        <div className="stats">
            <div className='stats__tiles'>
                <div className='stats__tiles_item'>
                    <p>Прибыль за тап</p>
                    <p>{userData.tapRevenue}</p>
                </div>
                <div className='stats__tiles_item'>
                    <p>Прибыль за минуту</p>
                    <p>{userData.minuteRevenue}</p>
                </div>
            </div>
            <div className='stats__coins'>
                <img></img>
                <p>{userData.balance}</p>
            </div>
        </div>
    )
}
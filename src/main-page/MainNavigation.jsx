import './MainNavigation.css';


export function MainNavigation({navigateToUpgrades}) {

    const handleClick = (event) => {
        navigateToUpgrades(event.target.id);
        document.querySelectorAll('.navigation__item_clicked').forEach((element) => element.classList.remove('navigation__item_clicked'));
        event.target.classList.add('navigation__item_clicked');
    }

    return (   
        <div className="navigation">
            <div id='main' className='navigation__item navigation__item_clicked' onClick={handleClick}>Дом</div>
            <div id='tap' className='navigation__item' onClick={handleClick}>Тап</div>
            <div id='minute' className='navigation__item' onClick={handleClick}>Минуту</div>
            <div id='clear' className='navigation__item' onClick={handleClick}>Очистить</div>
        </div>
    )
}
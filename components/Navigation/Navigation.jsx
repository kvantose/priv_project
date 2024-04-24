import { useLocation } from "react-router-dom";
import './Navigation.css'

export default function Navigation() {
    const location = useLocation();
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {location.state.login === "admin" && <li><a href="/admin">Админ панель</a></li>}
                <li><a href="/main">Главная</a></li>
                <li><a href="/">Выйти</a></li>
            </ul>
        </nav>
    );
}
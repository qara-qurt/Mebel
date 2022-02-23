import { Button } from '../components/Button';
import {useNavigate} from 'react-router-dom';

export const MainBanner = () => {

    const navigate = useNavigate()

    return(
        <div className="content__show d-flex align-items-center justify-content-between">
            <div className="show__left">
                <h1>Всегда комфорт,<br/>всегда качество</h1>
                <h4>Выбирайте самое лучшее с нами!</h4>
                <div onClick={()=>navigate('/offers')}><Button title='Товары'/></div>
            </div>
        </div>
    )
}

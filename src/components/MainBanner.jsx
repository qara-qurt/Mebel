import { Button } from '../components/Button';

export const MainBanner = () => {
    return(
        <div className="content__show d-flex align-items-center justify-content-between">
            <div className="show__left">
                <h1>Всегда комфорт,<br/>всегда качество</h1>
                <h4>Выбирайте самое лучшее с нами!</h4>
                <Button title='Товары'/>
            </div>
        </div>
    )
}

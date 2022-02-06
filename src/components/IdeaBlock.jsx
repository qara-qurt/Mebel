import { Link } from 'react-router-dom';
import gray from '../assets/img/gray.jpg';

export const IdeaBlock = () => {
    return(
        <div className="content__ideas">
            <h4 className='title'>Больше идеи и вдохнавлений</h4>
            <div className="ideas__category">
                    <Link to="/">Спальня</Link>
                    <Link to="/">Гостинная</Link>
                    <Link to="/">Кухня</Link>
                    <Link to="/">Рабочий.каб</Link>
                    <Link to="/">Детская</Link>
                    <Link to="/">Прихожая</Link>
            </div>
            <div className="ideas__photos">
                <img className='big-photos' src={gray} alt="" />
                <img src={gray} alt="" />
                <img src={gray} alt="" />
                <img src={gray} alt="" />
                <img src={gray} alt="" />
                <img src={gray} alt="" />
                <img src={gray} alt="" />
                <img className='middle-photos' src={gray} alt="" />
            </div>
        </div>
    )
}
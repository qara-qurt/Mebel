import Carousel from '../layout/Carousel';

export const RecBlock = ({data}) => {
    return(
        <div className="content__rec">
            <h4 className='title'>Реконмендаций для вас</h4>
            <div className='rec__cards d-flex'>
                <Carousel items = {data} />
            </div>
        </div>
    )
}

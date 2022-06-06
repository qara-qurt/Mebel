import Carousel from '../layout/Carousel';

export const NewBlock = ({data}) => {
    return(
        <div className="content__new">
            <h4 className='title'>Новинки</h4>
            <div className='rec__cards d-flex'>
                <Carousel items = {data.slice().reverse()} /> 
            </div>
        </div>
    )
}
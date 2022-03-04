import { useEffect, useState } from 'react';
import Carousel from '../layout/Carousel';

export const NewBlock = ({data}) => {
    return(
        <div className="content__new">
            <h4 className='title'>Новинкий</h4>
            <div className='rec__cards d-flex'>
                <Carousel items = {data.slice().reverse()} /> 
            </div>
        </div>
    )
}
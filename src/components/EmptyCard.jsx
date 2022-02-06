import empty from '../assets/img/empty.jpg'

export const EmptyCard = () => {
    return(
        <div className='d-flex align-items-center justify-content-center flex-column' style={{marginTop:90}}> 
            <h2 style={{fontWeight:600}}>Корзина пустая</h2>
            <img src={empty} alt="Пустая корзина" style={{marginTop:50}}/>
        </div>
    )
}

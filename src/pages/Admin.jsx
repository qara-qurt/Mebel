import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

const Admin = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [size, setSize] = useState("")
    const [colors, setColors] = useState("")
    const [img, setImg] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault(e.target.value)
        const formData = new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("size",size)
        formData.append("colors",colors)
        formData.append("img",img,)
    }
    
    return (
        <Container>
            <div className='admin'>
                <form action="submit" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Название' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder='Описание'  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="text" placeholder='Цена'  value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    <input type="text" placeholder='Размер (высота-ширина-глубина)'  value={size} onChange={(e)=>setSize(e.target.value)}/>
                    <input type="text" placeholder='Цвета' value={colors} onChange={(e)=>setColors(e.target.value)}/>
                    <input type="file" placeholder='Фото' accept='images/*' onChange={(e)=>setImg(e.target.files[0])}/>
                    <button type='submit'>Создать</button>
                </form>
            </div>
        </Container>
    )
}

export default Admin;
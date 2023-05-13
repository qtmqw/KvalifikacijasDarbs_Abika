import React from 'react'
import { Container } from 'react-bootstrap'
const AdminPage = () => {
    return (
        <Container>
            <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold pt-[60px] text-center mx-auto mb-5'>Home</h1>
            <div className='grid grid-cols-2 gap-3 mb-3'>
                <div className='bg-gray-300 rounded-lg p-5'>
                    <h1>pirmais</h1>
                </div>
                <div className='bg-gray-300 rounded-lg p-5'>
                    <h1>otrais</h1>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className='bg-gray-300 rounded-lg p-5'>
                    <h1>tresais</h1>
                </div>
                <div className='bg-gray-300 rounded-lg p-5'>
                    <h1>ceturtais</h1>
                </div>
            </div>
        </Container>
    )
}

export default AdminPage
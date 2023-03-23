import React, { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { Button } from "@material-tailwind/react"
import { Login } from '../API/Users'


const Prof = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        const res = Login({ email, password });
    }

    return (
        <Container className='py-10' >
            <div className='flex py-[50px] max-w-[85%] mx-auto'>
                <div className='bg-[#fcedda] p-6 rounded-lg shadow-lg w-[50%]'>
                    <h1 className='font-bold mx-auto md:text-4xl sm:text-3xl text-3xl py-2 mb-3 mt-3'>
                        Pieslēgties
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div className="px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-md">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="E-MAIL"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full  px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-md mb-2">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="password"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4"
                                            type="password"
                                            placeholder="password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </label>
                            </div>
                        </div>
                        <Button type="submit" className='bg-[#FF7D1A] font-bold text-white w-auto rounded-xl ml-4 px-10 py-3'>
                            Pieslēgties
                        </Button>
                        <Link to="/ParolesMaina" className="text-black ml-5">Aizmirsāt paroli?</Link>
                    </form>
                </div>
                <div className='w-[50%] p-10'>
                    <h1 className='font-bold mx-auto md:text-4xl sm:text-3xl text-3xl py-2 mb-5'>
                        Reģistrēties
                    </h1>
                    <div className='text-semibold text-2xl'>
                        <h1 className="font-bold mb-3 text-xl">
                            Kāpēc reģistrēties?
                        </h1>
                        <p className="text-base mb-4">
                            Reģistrējoties Jums tiks pieejama pasūtīšans funkcija, ar kuras palīdzību Jūs spēsiet iegādāties mūsu preces.
                        </p>
                    </div>
                    <Link to="/Registreties" >
                        <Button className='bg-[#FF7D1A] text-white w-auto rounded-xl px-10 py-3 font-bold'>
                            Reģistrēties
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    )
}
export default Prof
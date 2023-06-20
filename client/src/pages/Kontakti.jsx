import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaMobile, FaMapMarked } from 'react-icons/fa';
import { FloatingLabel, Form, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';

const Kont = () => {
    const form = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_a0x9ncm', 'template_lo7n8le', form.current, 'Oa7iM7Kjfxirv1Zmz').then(
            (result) => {
                toast.success('E-pasts veiksmīgi nosūtīts');
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
        e.target.reset();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'user_name') {
            setName(value);
        } else if (name === 'user_email') {
            setEmail(value);
        } else if (name === 'message') {
            setMessage(value);
        }

        setIsFormValid(name && email && message);
    };

    return (
        <Container className='py-10 mx-auto'>

            <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold text-center my-3 pb-5 '>Kontakti</h1>

            <div className='w-[100%] flex mb-5 justify-center'>
                <div className='flex clex-col md:mx-auto xl:mx-0'>
                    <FaMobile className='xl:w-4 xl:h-9 mx-1' /><p className='md:text-md sm:text-sm xl:text-2xl xl:mr-10 lg:mr-10 md:mr-10 mt-[2px]'>67382030, 20005038, 29462665</p>
                    <FaEnvelope className='xl:w-6 xl:h-10 mx-1' /><a href="mailto:abika@inbox.lv" className='md:text-md sm:text-sm xl:text-2xl xl:mr-10 lg:mr-10 md:mr-10 sm:mr-3 no-underline text-black'><p>abika@inbox.lv</p></a>
                    <FaMapMarked className='xl:w-6 xl:h-9 mx-1' /><a href="https://goo.gl/maps/KGR9PbkcxnyssUnp7" className='md:text-md sm:text-sm xl:text-2xl no-underline text-black'>Vagonu iela 23, Rīga</a>
                </div>
            </div>

            <div className=' mx-auto mb-10'>
                <iframe className='rounded-3xl' width="100%" height='500px' frameborder="0" scrolling="yes" src="https://maps.google.com/maps?width=683&amp;height=400&amp;hl=en&amp;q=Abika&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>

            <div className='w-auto flex flex-wrap justify-between'>

                <div className='flex flex-col text-sm'>
                    <p><span className='font-bold'>SIA Abika adrese: </span>Vagonu iela 23, Rīga, LV-1009</p>
                    <p><span className='font-bold'>Epasts: </span> abika@inbox.lv</p>
                    <p><span className='font-bold'>Telefons: </span>67382030, 20005038, 29462665</p>
                    <p className='mt-3'><p className='font-bold'>Darba laiks:</p>Darba dienās no plkst. 9.00 līdz 17.00</p>
                    <p className='mt-3'><p className='font-bold'>Rekvizīti:</p>SIA Abika</p>
                    <p>LV–40003600614</p>
                    <p>Juridiskā adrese: Pulkveža Brieža iela 93–4, Sigulda, LV–2150   Faktiskā adrese: Vagonu iela 23, Rīga, LV-1009</p>
                    <p>Swedbanka, HABALV22</p>
                    <p>LV70HABA0551003890106</p>
                </div>

                <div class="w-full md:w-96 md:max-w-full">
                    <div class="p-6 border border-gray-300 sm:rounded-md">
                        <h1 className='text-xl mb-4'>Parādījās jautājumi?</h1>
                        <form ref={form} onSubmit={sendEmail}>
                            <label class="block mb-6">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Vārds Uzvārds"
                                    className="mb-3 text-gray-400"
                                    name="user_name"
                                >
                                    <Form.Control
                                        className="w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3"
                                        type="text"
                                        placeholder="Vārds Uzvārds"
                                        name="user_name"
                                        value={name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FloatingLabel>
                            </label>
                            <label className='block mb-6'>
                                <FloatingLabel
                                    controlId='floatingInput'
                                    label='E-PASTS'
                                    className='mb-3 text-gray-400'
                                    name='user_email'
                                >
                                    <Form.Control
                                        className='w-full mx-auto bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3'
                                        type='email'
                                        placeholder='name@example.com'
                                        name='user_email'
                                        value={email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FloatingLabel>
                            </label>
                            <label className='block mb-6'>
                                <FloatingLabel
                                    controlId='floatingTextarea2'
                                    className='text-gray-400'
                                    label='Jautājums'
                                    name='message'
                                >
                                    <Form.Control
                                        as='textarea'
                                        placeholder='Question'
                                        style={{ height: '100px' }}
                                        name='message'
                                        value={message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FloatingLabel>
                            </label>
                            <Button
                                type='submit'
                                className='px-5 text-white bg-[#FF7D1A] rounded-lg'
                                disabled={!isFormValid}
                            >
                                Nosūtīt
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default Kont
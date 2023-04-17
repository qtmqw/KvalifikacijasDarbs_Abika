import React from 'react'
import Drebes1 from '../assets/drebes1.jpg';
import Drebes2 from '../assets/drebes2.jpeg'
import Drebes3 from '../assets/drebes3.jpeg'
import Drebes4 from '../assets/drebes4.jpeg'
import Drebes5 from '../assets/drebes5.jpeg'
import { Carousel, Container } from 'react-bootstrap'
import { Button } from "@material-tailwind/react"
import { Link } from 'react-router-dom';


const Saak = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item >
          <img
            className="d-block w-full 2xl:h-[1000px] xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[180px]"
            src={Drebes4}
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-full 2xl:h-[1000px] xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[180px]"
            src={Drebes3}
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-full 2xl:h-[1000px] xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[180px]"
            src={Drebes5}
          />
        </Carousel.Item>
      </Carousel>
      <Container>
        <div className='max-w-[100%] mx-auto flex pt-20'>
          <div className='w-[50%] flex flex-col justify-center text-xs ml-5 mx-auto '>
            <h1 className=' text-2xl font-bold py-2'>SIA Abika vairumtirdzniecības noliktava piedāvā sieviešu, vīriešu apģērbu un veļu!</h1>
            <p className=' text-base'>
              Mūsu klienti ir dažādi tir  dzniecības uzņēmumi, sākot no individuāliem komersantiem līdz veikalu tīkliem. Iepirkties SIA Abika ir izdevīgi, jo:
            </p>
            <p className='text-base'>
              <h1 className='font-bold text-base'>1. Jūs ietaupāt laiku.</h1>Salīdzinot ar iepirkšanos ārvalstīs, kur gan ceļā gan iepērkoties jāpatērē ilgs laiks, SIA Abika papildināt preču krājumus var stundas vai dažu desmitu minūšu laikā.
              <h1 className='font-bold text-base'>2. Prece atbilst LR likumdošanas prasībām.</h1>SIA Abika apģērbiem ir piestiprinātas uzlīmes latviešu valodā ar preces nosaukumu, ražotājvalsti un citu nepieciešamo informāciju.
              <h1 className='font-bold text-base'>3. Jūs ietaupāt transporta izdevumus.</h1>Latvijas klientiem ceļš līdz Rīgai ir īsāks nekā līdz citu valstu galvaspilsētām un lielpilsētām.
            </p>
          </div>
          <img className='h-full w-[50%]' src={Drebes1} />
        </div>

        {/* 
Sieviešu apģērbi
Vīriešu apģērbi
Veļa
Apavi
Aksesuāri
*/}

        <div className='mt-5 mb-4 flex sm:flex-wrap lg:flex-nowrap md:w-[60%] sm:w-[60%] sm:mx-auto lg:w-full gap-4 justify-center'>
          <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
            <img src={Drebes2} alt="Sieviešu apģērbi" className='' />
            <h1 className=' text-2xl text-center my-3'>
              Sieviešu apģērbi
            </h1>
            <Link to="/Sortiments?category=642ab93c04519f8cce6470b7">
              <Button className='w-full bg-[#FF7D1A] '>
                Apskatīt
              </Button>
            </Link>
          </div>
          <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
            <img src={Drebes2} alt="Sieviešu apģērbi" className='' />
            <h1 className=' text-2xl text-center my-3'>
              Vīriešu apģērbi
            </h1>
            <Link to="/Sortiments?category=642ab95504519f8cce6470b8">
              <Button className='w-full bg-[#FF7D1A] '>
                Apskatīt
              </Button>
            </Link>
          </div>
          <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
            <img src={Drebes2} alt="Sieviešu apģērbi" className='' />
            <h1 className=' text-2xl text-center my-3'>
              Apavi
            </h1>
            <Link to="/Sortiments?category=642ab97204519f8cce6470ba">
              <Button className='w-full bg-[#FF7D1A] '>
                Apskatīt
              </Button>
            </Link>
          </div>
        </div>

        <div className='mb-5 flex sm:flex-wrap lg:flex-nowrap lg:w-[65%] md:w-[60%] sm:w-[60%] sm:mx-auto gap-4 justify-center'>
          <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
            <img src={Drebes2} alt="Sieviešu apģērbi" className='' />
            <h1 className=' text-2xl text-center my-3'>
              Veļa
            </h1>
            <Link to="/Sortiments?category=642ab96304519f8cce6470b9">
              <Button className='w-full bg-[#FF7D1A] '>
                Apskatīt
              </Button>
            </Link>
          </div>
          <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
            <img src={Drebes2} alt="Sieviešu apģērbi" className='' />
            <h1 className=' text-2xl text-center my-3'>
              Aksesuāri
            </h1>
            <Link to="/Sortiments?category=642ab98304519f8cce6470bb">
              <Button className='w-full bg-[#FF7D1A] '>
                Apskatīt
              </Button>
            </Link>
          </div>
        </div>
      </Container >

    </>
  )
}

export default Saak
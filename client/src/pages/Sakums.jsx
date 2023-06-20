import React from 'react'
import Drebes1 from '../assets/drebes1.jpg';
import Drebes3 from '../assets/drebes3.jpeg'
import Drebes4 from '../assets/drebes4.jpeg'
import Drebes5 from '../assets/drebes5.JPG'
import { Carousel, Container } from 'react-bootstrap'
import { Button } from "@material-tailwind/react"
import { Link } from 'react-router-dom';
import W from '../assets/categoryimages/W.JPG'
import V from '../assets/categoryimages/V.JPG'
import M from '../assets/categoryimages/M.JPG'
import AK from '../assets/categoryimages/AK.png'
import A from '../assets/categoryimages/A.JPG'

const Saak = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item >
          <img
            className="d-block w-full xl:h-[700px] lg:h-[450px] sm:h-[150px]"
            src={Drebes4}
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-full xl:h-[700px] lg:h-[450px] sm:h-[150px]"
            src={Drebes3}
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-full xl:h-[700px] lg:h-[450px] sm:h-[150px]"
            src={Drebes5}
          />
        </Carousel.Item>
      </Carousel>
      <Container fluid='sm'>
        <div className="flex flex-wrap max-w-full lg:pt-20 sm:pt-10">
          <div className="lg:w-[48%] md:w-full flex flex-col justify-center text-xs mr-5 lg:text-justify sm:text-center">
            <h1 className="text-2xl font-bold py-2">
              SIA Abika vairumtirdzniecības noliktava piedāvā sieviešu, vīriešu
              apģērbu un veļu!
            </h1>
            <p className="text-base">
              Mūsu klienti ir dažādi tir dzniecības uzņēmumi, sākot no individuāliem
              komersantiem līdz veikalu tīkliem. Iepirkties SIA Abika ir izdevīgi,
              jo:
            </p>
            <ul className="text-base list-disc mt-3">
              <li>
                <h1 className="font-bold text-base">Jūs ietaupāt laiku.</h1> Salīdzinot ar
                iepirkšanos ārvalstīs, kur gan ceļā gan iepērkoties jāpatērē ilgs
                laiks, SIA Abika papildināt preču krājumus var stundas vai dažu
                desmitu minūšu laikā.
              </li>
              <li>
                <h1 className="font-bold text-base">Prece atbilst LR likumdošanas prasībām.</h1>{" "}
                SIA Abika apģērbiem ir piestiprinātas uzlīmes latviešu valodā ar
                preces nosaukumu, ražotājvalsti un citu nepieciešamo informāciju.
              </li>
              <li>
                <h1 className="font-bold text-base">Jūs ietaupāt transporta izdevumus.</h1>{" "}
                Latvijas klientiem ceļš līdz Rīgai ir īsāks nekā līdz citu valstu
                galvaspilsētām un lielpilsētām.
              </li>
            </ul>
          </div>
          <img className="h-full lg:w-1/2 md:w-full rounded-lg" src={Drebes1} alt="Image" />
        </div>

        <div className='hidden lg:block md:block'>
          <div className='mt-5 flex flex-nowrap md:w-[100%] lg:w-full gap-4 mx-auto'>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={W} alt="Sieviešu apģērbi" className='w-[100%] h-auto mx-auto' />
              <h1 className='text-lg sm:text-2xl text-center my-3'>
                Sieviešu apģērbi
              </h1>
              <Link to="/Sortiments?category=642ab93c04519f8cce6470b7">
                <Button className='w-full bg-[#FF7D1A]'>
                  Apskatīt
                </Button>
              </Link>
            </div>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={M} alt="Sieviešu apģērbi" className='w-[100%] h-auto' />
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
              <img src={A} alt="Sieviešu apģērbi" className='w-[100%] h-auto' />
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
          <div className='mb-5 mt-4 flex flex-nowrap lg:w-[70%] md:w-[70%] gap-4 mx-auto'>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md w-[50%]'>
              <img src={V} alt="Sieviešu apģērbi" className='w-[100%] h-auto' />
              <h1 className=' text-2xl text-center my-3'>
                Veļa
              </h1>
              <Link to="/Sortiments?category=642ab96304519f8cce6470b9">
                <Button className='w-full bg-[#FF7D1A] '>
                  Apskatīt
                </Button>
              </Link>
            </div>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md w-[39%]'>
              <img src={AK} alt="Sieviešu apģērbi" className='w-[100%] h-auto' />
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
        </div>
        {/* sm */}
        <div className='lg:hidden md:hidden sm:block'>
          <div className='mt-4 grid grid-cols-2 gap-2'>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={W} alt="Sieviešu apģērbi" className='w-full h-auto mx-auto' />
              <h1 className='text-lg sm:text-2xl text-center my-3'>
                Sieviešu
              </h1>
              <Link to="/Sortiments?category=642ab93c04519f8cce6470b7">
                <Button className='w-full bg-[#FF7D1A]'>
                  Apskatīt
                </Button>
              </Link>
            </div>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={M} alt="Sieviešu apģērbi" className='' />
              <h1 className=' text-2xl text-center my-3'>
                Vīriešu
              </h1>
              <Link to="/Sortiments?category=642ab95504519f8cce6470b8">
                <Button className='w-full bg-[#FF7D1A] '>
                  Apskatīt
                </Button>
              </Link>
            </div>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={A} alt="Sieviešu apģērbi" className='' />
              <h1 className=' text-2xl text-center my-3'>
                Apavi
              </h1>
              <Link to="/Sortiments?category=642ab97204519f8cce6470ba">
                <Button className='w-full bg-[#FF7D1A] '>
                  Apskatīt
                </Button>
              </Link>
            </div>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={V} alt="Sieviešu apģērbi" className='' />
              <h1 className=' text-2xl text-center my-3'>
                Veļa
              </h1>
              <Link to="/Sortiments?category=642ab96304519f8cce6470b9">
                <Button className='w-full bg-[#FF7D1A] '>
                  Apskatīt
                </Button>
              </Link>
            </div>
          </div>
          <div className='mx-auto w-[50%] mt-2 mb-5'>
            <div className='p-3 bg-[#fdedd5] rounded-xl shadow-md'>
              <img src={AK} alt="Sieviešu apģērbi" className='' />
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
        </div>
      </Container >
    </>
  )
}

export default Saak
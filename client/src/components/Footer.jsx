import React from 'react';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaEnvelope,
  FaMobile,
  FaMapMarked
} from 'react-icons/fa';
import Abika from '../assets/abika.png'


const Footer = () => {
  return (
    <div className='bg-[#fdedd5]  shadow-lg max-w-full p-4 '>
      <div className="flex justify-between   ">
        <img src={Abika} className='w-[10%] h-[10%] flex self-center mr-5' />
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-black uppercase ">Izvēlne</h2>
            <div className="text-gray-600 font-medium grid ">
                <a href="/Par_mums" className='mb-2 no-underline text-black'>Par mums</a>
                <a href="/Sortiments" className='mb-2 no-underline text-black'>Sortiments</a>
                <a href="/Kontakti" className='mb-2 no-underline text-black'>Kontakti</a>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-black uppercase ">Kontakti</h2>
            <div className="text-gray-600 font-medium grid">
              <div className='flex clex-col mb-2'>
                <FaEnvelope className='w-4 h-5 mr-1' /><a href="mailto:abika@inbox.lv" className='mb-2 no-underline text-black'>abika@inbox.lv</a>
              </div>
              <div className='flex clex-col mb-2'>
                <FaMapMarked className='w-4 h-5 mr-1' /><a href="" className='mb-2 no-underline text-black'>Vagonu iela 23, Rīga</a>
              </div>
              <div className='flex clex-col mb-2'>
                <FaMobile className='w-4 h-5 mr-1' /><a href="" className='mb-2 no-underline text-black'>67382030, 20005038, 29462665</a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-black uppercase ">Mēs sociālos tīklos</h2>
            <div className='flex justify-between md:w-[50%]'>
              <FaFacebookSquare size={30} />
              <FaInstagram size={30} />
              <FaTwitterSquare size={30} />
            </div>
          </div>
        </div>
      </div>
      <hr className=" border-gray-200 sm:mx-auto lg:my-4" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">©2021 Visas tiesības aizsargātas. Jebkāda veida satura pārpublicēšana bez rakstiskas atļaujas stingri aizliegta</span>
      </div>
    </div>
  );
};

export default Footer;

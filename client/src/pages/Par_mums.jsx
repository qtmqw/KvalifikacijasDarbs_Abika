import React, { useCallback, useState } from 'react'
import Abika from '../assets/abika.JPG';
import PM1 from '../assets/PM1.JPG';
import PM2 from '../assets/PM2.JPG';
import PM3 from '../assets/PM3.JPG';
import PM4 from '../assets/PM4.JPG';
import { Container } from 'react-bootstrap'
import ImageViewer from 'react-simple-image-viewer';


const Pm = () => {

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [PM4, PM3, PM2, PM1];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Container fluid='sm' className='py-10 mx-auto'>
      <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold text-center my-3 '>Par mums</h1>
      <div className=' lg:flex py-[30px] w-[100%]'>
        <div className='flex flex-col text-sm my-auto mr-2 lg:text-left sm:text-center tracking-wide w-[50%]'>
          <h1 className='md:text-4xl sm:text-3xl text-3xl font-bold mb-4'></h1>
          <h2 className='md:text-2xl sm:text-1xl text-1xl mb-4'> SIA Abika ir vairumtirdzniecības uzņēmums, kas darbojas no 2002. gada. </h2>
          <h2 className='md:text-2xl sm:text-1xl text-1xl mb-4'> <span className='font-bold'>Sortimentā</span> ir sieviešu un vīriešu apģērbs, veļa, apavi un aksesuāri.</h2>
          <h2 className='md:text-2xl sm:text-1xl text-1xl mb-4'> Mūsu misija ir apģērbu tirgotājiem preču sagādi padarīt vieglāku, ērtāku un ātrāku. Tāpēc regulāri veicam uzlabojumus uzņēmuma darbā.</h2>
          <h2 className='md:text-2xl sm:text-1xl text-1xl italic'> Privātpersonas neapkalpojam.</h2>
        </div>
        <div className='w-[50%]'>
          <img className='w-full h-full mx-auto lg:my-4 sm:mt-4 rounded-lg' src={Abika} alt='/' />
        </div>
      </div>
      <div className='w-full lg:py-[2rem]  '>
        <div className=' mx-auto grid lg:gap-4 sm:gap-2 grid-cols-4 grid-rows-1 '>
          {images.map((src, index) => (
            <img
              src={src}
              onClick={() => openImageViewer(index)}
              className="w-full h-full rounded-lg cursor-pointer"
              key={index}
              style={{ margin: '2px' }}
              alt=""
            />
          ))}

          {isViewerOpen && (
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
      </div>
    </Container>
  )
}

export default Pm
import React, { useCallback, useState } from 'react'
import Abika1 from '../assets/abika1.png';
import { Container } from 'react-bootstrap'
import ImageViewer from 'react-simple-image-viewer';


const Pm = () => {

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    `https://abika.lv/content/data/gallery/par-mums/1489559519-3893.jpeg`,
    `https://abika.lv/content/data/gallery/par-mums/1489559520-0764.jpeg`,
    `https://abika.lv/content/data/gallery/par-mums/1489559521-4285.jpeg`,
    `https://abika.lv/content/data/gallery/par-mums/1489559520-7414.jpeg`
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Container className='py-10 mx-auto'>
      <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold text-center my-3 '>Par mums</h1>
      <div className=' lg:flex py-[30px] '>
        <div className='flex flex-col text-sm'>
          <h1 className='md:text-4xl sm:text-3xl text-3xl font-bold mb-4'></h1>
          <h2 className='md:text-2xl sm:text-1xl text-1xl mb-4'> SIA Abika ir vairumtirdzniecības uzņēmums, kas darbojas no 2002. gada. </h2>
          <h2 className='md:text-2xl sm:text-1xl text-1xl mb-4'> <span className='font-bold'>Sortimentā</span> ir sieviešu un vīriešu apģērbs, veļa, apavi un aksesuāri.</h2>
          <h2 className='md:text-2xl sm:text-1xl text-1xl mb-4'> Mūsu misija ir apģērbu tirgotājiem preču sagādi padarīt vieglāku, ērtāku un ātrāku. Tāpēc regulāri veicam uzlabojumus uzņēmuma darbā.</h2>
          <h2 className='md:text-2xl sm:text-1xl text-1xl italic'> Privātpersonas neapkalpojam.</h2>
        </div>
        <div>
          <img className='w-full h-auto mx-auto my-4' src={Abika1} alt='/' />
        </div>
      </div>
      <div className='w-full py-[2rem] '>
        <div className=' mx-auto grid gap-4 grid-cols-4 grid-rows-1 '>
          {images.map((src, index) => (
            <img
              src={src}
              onClick={() => openImageViewer(index)}
              className="w-full h-full"
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
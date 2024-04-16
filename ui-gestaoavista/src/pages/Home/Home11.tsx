
import Carousel from 'react-bootstrap/Carousel';
import Icon from '../../components/IconSVG/IconSVG';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import Host, { Port } from '../../LinkAPI';
import { Skeleton } from '@mui/material';
import './Home.scss';



interface ICarouselItem {
  pathSlideCarousel: string;
  pathFileCarousel: string;
  carouselTimer: number;
}


function Home() {

  const [carouselData, setCarouselData] = useState<ICarouselItem[]>([]);
  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? Number(userIdString) : 0;

  const getDocumentDataByIdUser = async (id: number) => {
    try {
      const response = await fetch(`${Host}${Port}/api/Document/GetDocumentsCarouselByUser?idUser=${id}`);
      const data = await response.json();
      setCarouselData(data);
      console.log("documents:", data);

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getDocumentDataByIdUser(userId);
  }, []);

  return (
    <>
      {carouselData.length > 0 ? (
        <Carousel className="custom-carousel" >
          {carouselData.map((item, index) => (
            <Carousel.Item key={index} interval={item.carouselTimer}>
              <a href={item.pathFileCarousel} target="_blank" rel="noreferrer">
                <img className="custom-image" src={item.pathSlideCarousel} alt={`Carousel ${index}`} />
              </a>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Skeleton variant="rectangular" height={500} animation="wave" />
      )}

    </>
  )
}


export default Home;
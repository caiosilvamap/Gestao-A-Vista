import React, { useEffect, useState } from 'react';
import { Carousel } from "@material-tailwind/react";
import { Skeleton } from "@mui/material";
import { Button } from "react-bootstrap";
import CarouselTimer from "./CarouselTimer";
import IconSVG from "../../components/IconSVG/IconSVG";
import Host, { Port } from '../../LinkAPI';

interface ICarouselItem {
    pathSlideCarousel: string;
    pathFileCarousel: string;
    carouselTimer: number;
}

function Home() {
    const [carouselData, setCarouselData] = useState<ICarouselItem[]>([]);
    const [showCarousel, setShowCarousel] = useState<boolean>(false);
    const [autoplayDelay, setAutoplayDelay] = useState<number>(5); // Valor padrão

    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? Number(userIdString) : 0;

    const getDocumentDataByIdUser = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Document/GetDocumentsCarouselByUser?userId=${id}`);
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

    const handleCarouselTimerChange = (value: number) => {
        setAutoplayDelay(value);
    };

    const ToggleCarousel = () => {
        setShowCarousel(!showCarousel);
    };

    return (
        <>
            {carouselData.length > 0 ? (
                <><Carousel
                    placeholder={"carousel"}
                    transition={{ duration: 1 }}
                    className="rounded-xl"
                    autoplay={true}
                    autoplayDelay={autoplayDelay * 1000}
                    loop={true}
                >
                    {carouselData.map((item, index) => (
                        <div key={index}>
                            <a href={item.pathFileCarousel} target="_blank" rel="noreferrer">
                                <img className="max-h-[650px] w-screen object-contain m-auto" src={item.pathSlideCarousel} alt={`Carousel ${index}`} />
                            </a>
                        </div>
                    ))}
                </Carousel>
                    <div className="mt-5 flex items-baseline gap-3">
                        <Button onClick={ToggleCarousel}>
                            <IconSVG src="src/images/icon/icon-timer.svg"
                                width={30}
                                height={30}
                                className="dark:invert mr-2"
                            />
                        </Button>
                        {showCarousel ? <CarouselTimer onChange={handleCarouselTimerChange} /> : null}
                    </div>
                </>
            ) : (
                <Skeleton variant="rectangular" height={500} animation="wave" />
            )}
        </>
    );
}

export default Home;

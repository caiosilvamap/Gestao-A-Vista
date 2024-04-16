import { Button, Skeleton } from '@mui/material';

import { useEffect, useState } from 'react';


import dayjs, { Dayjs } from 'dayjs';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import CarDumperAddDialog from '../../componentsGTA/CarDumperAddDialog';
import CarDumperEditDialog from '../../componentsGTA/CarDumperEditDialog';
import DataGridGTA from '../../componentsGTA/DataGridGTA';
import { DataTableElements, ElementRow } from '../../componentsGTA/Table';
import CarDumperDetailsDialog from '../../componentsGTA/CarDumperDetailsDialog';
import Host, { Port } from '../../Conf';
import InformationDialog from '../../componentsGTA/InformationDialog';
import TogleDash from '../../componentsGTA/TogleDash';


interface StackValues {
    id: number,
    idStack: number,
    idStackStatus: number,
    TOC: Date,
    ActualWeight: number,
    Completed: number,
    idCarDumper: number,
    idReclaiming: number,
    Weight: number,
}

interface Reclaiming {
    idStack: number,
    idUser: number,
    idDestiny: number,
    begin?: string,
    end?: string
}

interface ReclaimingTrain {
    id?: string
    idReclaiming: number,
    idTrain: number,
    numberOfCars: number,
    weight?: string,
}

function CarDumper() {
    const [train, setTrain] = useState(0);
    const [statusDumper, setStatusDumper] = useState(0);
    const [stack, setStack] = useState(0);
    const [idCarDumper, setIdCarDumper] = useState<number>(0);

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDetails, setOpenDetails] = useState<boolean>(false);

    const [dashMode, setDashMode] = useState("dash");
    const [dateMode, setDateMode] = useState("only");
    const [selectedDateBegin, setSelectedDateBegin] = useState<Dayjs | null>(dayjs());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Dayjs | null>(dayjs());


    const [informationText, setInformationText] = useState('');

    const [openInformationModal, setOpenInformationModal] = useState<boolean>(false);

    const [selectedArrivalDate, setSelectedArrivalDate] = useState<Dayjs | null>(dayjs());
    const [selectedBeginDate, setSelectedBeginDate] = useState<Dayjs | null>(dayjs());
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs());
    const [dataCarDumper, setDataCarDumper] = useState<DataTableElements<ElementRow>[]>([]);


    const [dataFilteredCarDumper, setDataFilteredCarDumper] = useState<DataTableElements<ElementRow>[]>([]);


    const [dataReclaiming, setDataReclaiming] = useState<Reclaiming[]>([]);
    const [dataReclaimingTrain, setDataReclaimingTrain] = useState<ReclaimingTrain[]>([]);

    const handleArrivalDateChange = (date: Dayjs | null) => {
        setSelectedArrivalDate(date);

    }
    const handleBeginDateChange = (date: Dayjs | null) => {
        setSelectedBeginDate(date);

    }

    const handleEndDateChange = (date: Dayjs | null) => {
        setSelectedEndDate(date);

    }

    const handleAddButton = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleAddClose = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleEditButton = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleRowSelect = (data: any) => {

    }

    const handleInformationModal = (text: string) => {
        setOpenInformationModal((cur) => !cur);
        setInformationText(text);
    }

    const handleEditCarDumper = (data: any) => {

        //const existsInCarDumper = checkIfExistsInStacks(data);
        console.log(data);

        if (false) {
            handleInformationModal('Não é possível editar esta virada.');
        } else {
            setIdCarDumper(data);
            handleEditClose();
        }
    }

    const handleDetailButton = (data: any) => {
        setIdCarDumper(data);
        handleDetailOpenClose();
    }

    const handleEditClose = () => {
        setOpenEdit((cur) => !cur);
    }

    const handleDetailOpenClose = () => {
        setOpenDetails((cur) => !cur);
    }


    const checkIfExistsInStacks = (data: any) => {
        const trainId = dataCarDumper.map(e => e.elements.find((e) => e.column === 'id')?.value );

        //const existsInReclaiming = dataReclaiming.some((row) => {
        //    return row.idCarDumper == data;
        //});

        return false;
    };


    const fetchDataReclaimingTrain = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Stack/GetAllReclaimingTrain`);
            const data = await response.json();
            setDataReclaimingTrain(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataReclaiming = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Stack/GetAllReclaiming`);
            const data = await response.json();
            setDataReclaiming(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataCarDumper = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Car/GetAllCarDumper`)
            const data = await response.json();
            setDataCarDumper(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = () => {
        setOpenAdd((cur) => !cur);
        fetchDataCarDumper();
    }

    const handleSubmitEdit = () => {
        setOpenEdit((cur) => !cur);
        fetchDataCarDumper();
    }

    useEffect(() => {
        fetchDataCarDumper();
        //fetchDataReclaiming();
        //fetchDataReclaimingTrain();
    }, []);

    const handleModeChanged = () => {
        setDashMode(dashMode === 'dash' ? 'hist' : 'dash');

        setSelectedDateBegin(dayjs());
        setSelectedDateEnd(dayjs());

        localStorage.setItem('selectedDateBegin', dayjs().toISOString());
        localStorage.setItem('selectedDateEnd', dayjs().toISOString());
        setDateMode('only');

    }

    const handleDateMode = () => {
        if (typeof setDateMode === 'function') {
            setDateMode(dateMode === 'only' ? 'between' : 'only');
        }
        if (dateMode === 'only') {

            localStorage.setItem('selectedDateBegin', dayjs(selectedDateBegin).toISOString());
            localStorage.setItem('selectedDateEnd', dayjs(selectedDateEnd).toISOString());
        }

    }

    const handleDateBeginChange = (date: Dayjs | null) => {
        if (date) {
            setSelectedDateBegin(date);
            localStorage.setItem('selectedDateBegin', date.toISOString());

            if (dateMode === 'only') {
                setSelectedDateEnd(date);
                localStorage.setItem('selectedDateEnd', date.toISOString());
            } else {
                setSelectedDateEnd(dayjs(localStorage.getItem('selectedDateEnd')));
            }

        } else {
            setSelectedDateBegin(dayjs());
        }
    };

    const handleDateEndChange = (date: Dayjs | null) => {
        if (date) {
            setSelectedDateEnd(date);
            localStorage.setItem('selectedDateEnd', date.toISOString());
        } else {
            setSelectedDateEnd(dayjs());
        }
    };

    function filterData(dateBegin: any, dateEnd: any): DataTableElements<ElementRow>[]{
        return dataCarDumper.filter((item) => {
            const date = dayjs(item.elements.find((element) => element.column === "Fim")?.value, "DD/MM/YYYY HH:mm:ss");
            return date.isAfter(dateBegin) && date.isBefore(dateEnd);
        });
    };

    useEffect(() => {
        
        if (dashMode != 'hist') {
            console.log(1);
            const filteredData = filterData(
                dayjs(dayjs().format("DD/MM/YYYY 00:00:00"), "DD/MM/YYYY HH:mm:ss"),
                dayjs(dayjs().format("DD/MM/YYYY 22:59:59"), "DD/MM/YYYY HH:mm:ss")
            ).sort((a, b) => (a.elements.find((element) => element.column === "Id")?.value > b.elements.find((element) => element.column === "Id")?.value ? -1 : 1));

            setDataFilteredCarDumper(filteredData);
        }

    }, [dataCarDumper, dashMode]);

    useEffect(() => {
        if (dashMode === 'hist') {
            const filteredData = filterData(
                dayjs(selectedDateBegin?.format("DD/MM/YYYY 00:00:00"), "DD/MM/YYYY HH:mm:ss"),
                dayjs(selectedDateEnd?.format("DD/MM/YYYY 22:59:59"), "DD/MM/YYYY HH:mm:ss")
            ).sort((a, b) => (a.elements.find((element) => element.column === "Id")?.value > b.elements.find((element) => element.column === "Id")?.value ? -1 : 1));

            setDataFilteredCarDumper(filteredData);
        }


    }, [selectedDateBegin, selectedDateEnd]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Descargas" />

            {openAdd ? <CarDumperAddDialog handleClose={handleAddClose} openAdd={openAdd} handleSubmit={handleSubmit} /> : <></>}
            {openEdit ? <CarDumperEditDialog handleClose={handleEditClose} openAdd={openEdit} id={idCarDumper} handleSubmit={handleSubmitEdit} /> : <></>}
            {openDetails ? <CarDumperDetailsDialog handleClose={handleDetailOpenClose} openAdd={openDetails} id={idCarDumper} /> : <></>}
            {openInformationModal ? <InformationDialog handleClose={handleInformationModal} openAdd={openInformationModal} > {informationText} </InformationDialog> : <></>}

            <div style={{ display: "flex", justifyContent: "flex-end" }} className="my-2" >
                <Button variant="contained" size="large" color="success" onClick={handleAddButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="mr-3" width="15px" height="15px" viewBox="0 0 32 32" version="1.1">

                        <title>plus</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                            <g id="Icon-Set-Filled" transform="translate(-362.000000, -1037.000000)" fill="#ffffff">
                                <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" >

                                </path>
                            </g>
                        </g>
                    </svg>
                    Adicionar
                </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start" }} className="my-3 mt-2" >

                <TogleDash
                    handleDateBeginChange={handleDateBeginChange}
                    handleDateEndChange={handleDateEndChange}
                    handleModeChanged={handleModeChanged}
                    dashMode={dashMode}
                    handleDateMode={handleDateMode}
                    dateMode={dateMode}
                />
             </div>

            

            <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">

                {dataCarDumper.length > 0 ?

                    <DataGridGTA
                        isDetail={true}
                        isEdit={true}
                        handleEditButton={handleEditCarDumper}
                        handleDetailButton={handleDetailButton} sortOrder={'desc'} fieldSort={'Id'}
                        
                        data={dataFilteredCarDumper} pageSize={10} pageSizeOptions={10} idColumn={'Id'}
                        hiddenColumns={['Id', 'IdTrain', 'IdMaterial', 'User', 'Status']}
                        handleRowSelect={handleRowSelect} />
                    : <Skeleton variant="rectangular" height={500} animation="wave" />}
            </div>

        </DefaultLayout>
    );
}

export default CarDumper;
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

function ResumeCarDumper() {
    const [train, setTrain] = useState(0);
    const [statusDumper, setStatusDumper] = useState(0);
    const [stack, setStack] = useState(0);
    const [idCarDumper, setIdCarDumper] = useState<number>(0);

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDetails, setOpenDetails] = useState<boolean>(false);


    const [informationText, setInformationText] = useState('');

    const [openInformationModal, setOpenInformationModal] = useState<boolean>(false);

    const [selectedArrivalDate, setSelectedArrivalDate] = useState<Dayjs | null>(dayjs());
    const [selectedBeginDate, setSelectedBeginDate] = useState<Dayjs | null>(dayjs());
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs());
    const [dataCarDumper, setDataCarDumper] = useState<DataTableElements<ElementRow>[]>([]);


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


        const trainId = dataCarDumper.map(e => e.elements.find((e) => e.column === 'id')?.value);

        console.log(trainId);

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
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Resumo do virador" />



            <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">

                {dataCarDumper.length > 0 ?

                    <DataGridGTA isDetail={false} isEdit={false} handleEditButton={handleEditCarDumper} handleDetailButton={handleDetailButton}
                        sortOrder={'desc'} fieldSort={'Id'} data={dataCarDumper} pageSize={10} pageSizeOptions={10} idColumn={'Id'}
                        hiddenColumns={['Id', 'IdTrain', 'IdMaterial', 'User', 'Status']} handleRowSelect={handleRowSelect} />
                    : <Skeleton variant="rectangular" height={500} animation="wave" />}
            </div>

        </DefaultLayout>
    );
}

export default ResumeCarDumper;
import { FormControlLabel, Grid, Skeleton } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataGridGTA from '../../componentsGTA/DataGridGTA';
import { DataTableElements, ElementRow } from '../../componentsGTA/Table';
import TogleDash from '../../componentsGTA/TogleDash';
import Host, { Port } from '../../Conf';
import DefaultLayout from '../../layout/DefaultLayout';


interface StackValues {
    stack: {
        id: number,
        idMaterial: number,
        name: string,
        capacity: number,
        toc: Date,
        tom: Date
    },
    stackValues: {
        id: number,
        idStack: number,
        idStackStatus: number,
        actualWeight: number,
        completed: number,
        toc: Date
    }
}


interface componentsValues {
    idAnalysisComponent: number,
    idComponent: number,
    value: number,
    idAnalysis: number
    name: string;
}

interface Analisys {
    idAnalysis: number,
    dateSampleTaken: Date,
    timeOfCreate: Date,
    timeOfUpdate: Date,
    integrity: boolean,
    idMaterial: number,
    idAnalysisOrigin: number,
    idAnalysisCode: number,
    comment: string,
    active: boolean,
    componentsValues: componentsValues[],
    analysisCode: {
        idAnalysisCode: number,
        name: string,
        description: string,
        idElementType: number,
        active: true,
        analyses: any
    },
    analysisOrigin: {
        idAnalysisOrigin: 3,
        name: string,
        active: true,
        analyses: any
    },
    material: {
        idMaterial: number,
        brandCode: string,
        description: string,
        active: boolean,
        idMaterialType: number,
        materialType: any,
        materialComponentLimits: any
    }
}

function QualityMap() {
    const { stack } = useParams();

    const [dataStackValues, setDataStackValues] = useState<Analisys[]>([]);
    const [dataStack, setDataStack] = useState<StackValues>();

    const [selectedDateBegin, setSelectedDateBegin] = useState<Dayjs | null>(dayjs());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Dayjs | null>(dayjs());

    const [dashMode, setDashMode] = useState("dash");
    const [dateMode, setDateMode] = useState("only");

    const fetchDataStackValues = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Stack/GetAnalisysByStackId?id=${id}`);
            const data = await response.json();

            setDataStackValues(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataTrain = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Train/GetTrainByAnalisyId?id=${id}`);
            const data = await response.json();

            setDataStackValues(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataStack = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Stack/GetStackByID?id=${id}`);
            const data = await response.json();

            setDataStack(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    useEffect(() => {
        

    }, [selectedDateBegin, selectedDateEnd]);


    useEffect(() => {

        if (stack) {
            fetchDataStackValues(Number(stack));
            fetchDataStack(Number(stack));
        }

    }, [stack]);


    useEffect(() => {

        if (dataStackValues) {
            console.log(dataStackValues);
        }

    }, [dataStackValues]);

    return (
        <DefaultLayout>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Mapa de qualidade da Pilha {dataStack?.stack.name}
                </h2>

                <nav>
                    <ol className="flex items-center gap-2">

                        <li>
                            <Link to={`/stacks/`}>Pilhas /</Link>
                        </li>
                        <li className="text-primary"> Qualidade da pilha</li>
                    </ol>
                </nav>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start"}} className="mb-1 " >

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
                <Grid container spacing={2} >

                    <Grid item md={4} sm={6} xs={12}>Capacidade: {dataStack?.stack.capacity}</Grid>
                    <Grid item md={4} sm={6} xs={12}>Volume Atual: {dataStack?.stackValues.actualWeight}</Grid>
                    <Grid item md={4} sm={6} xs={12}>Pilha: {Number(dataStack?.stackValues.completed).toFixed(2)}%</Grid >
                </Grid>
            </div>

            {dataStack && dataStack?.stack.id > 0 && dataStackValues.length > 0 ?
                <>
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">

                    </div>
                </>
                :
                <Skeleton variant="rectangular" height={550} animation="wave" />
            }

        </DefaultLayout>
    );
}


export default QualityMap;
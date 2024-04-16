import { Button, FormControlLabel, Skeleton, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import TrainAddDialog from '../../componentsGTA/TrainAddDialog';
import TrainEditDialog from '../../componentsGTA/TrainEditDialog';
import DataGridGTA from '../../componentsGTA/DataGridGTA';
import { DataTableElements, ElementRow } from '../../componentsGTA/Table';
import TrainDetailDialog from '../../componentsGTA/TrainDetailDialog';
import Host, { Port } from '../../Conf';
import { GridColDef } from '@mui/x-data-grid';
import AnalisyAddDialog from '../../componentsGTA/AnalisyAddDialog';
import AnalisyEditDialog from '../../componentsGTA/AnalisyEditDialog';
import TogleDash from '../../componentsGTA/TogleDash';
import InformationDialog from '../../componentsGTA/InformationDialog';

interface Train {
    id: 1,
    idTrainOrigin: number,
    idCarType: number,
    idMaterial: number,
    idAnalysis: number,
    name: string,
    numberOfCars: number,
    specWeight: number,
    realWeight: number,
    arrivaLBc: Date
    arrivalLine: Date,
    trainOrigin: null,
    carType: null,
    material: null,
    analysis: null
}

interface Material {
    idMaterial: number,
    brandCode: string,
    description: string,
    active: boolean,
    idMaterialType: number,
    materialType?: any,
    materialComponentLimits?: any
}

function Train() {
    const [trainId, setTrainId] = useState<number>(0);
    const [analisyId, setAnalisyId] = useState<number>(0);

    const [selectedDateBegin, setSelectedDateBegin] = useState<Dayjs | null>(dayjs());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Dayjs | null>(dayjs());

    const [informationText, setInformationText] = useState('');

    const [dashMode, setDashMode] = useState("dash");
    const [dateMode, setDateMode] = useState("only");

    const [openInformationModal, setOpenInformationModal] = useState<boolean>(false);
    const [availableFilterSwitch, setAvailableFilterSwitch] = useState<boolean>(true);

    const [materialCode, setMaterialCode] = useState('');
    const [openAddAnalisy, setOpenAddAnalisy] = useState(false);
    const [openEditAnalisy, setOpenEditAnalisy] = useState(false);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [dataCarDumper, setDataCarDumper] = useState<DataTableElements<ElementRow>[]>([]);
    const [dataTrain, setDataTrain] = useState<DataTableElements<ElementRow>[]>([]);
    const [filtredDataTrain, setFiltredDataTrain] = useState<DataTableElements<ElementRow>[]>([]);
    const [train, setTrain] = useState<Train>();

    const [material, setMaterial] = useState<Material>();

    const handleAddButton = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleAddClose = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleAddCloseAnalisy = () => {
        setOpenAddAnalisy((cur) => !cur);
        setAnalisyId(0);
        setMaterialCode('');
        setTrain(undefined);
        setMaterial(undefined);
    }

    const handleEditCloseAnalisy = () => {
        setOpenEditAnalisy((cur) => !cur);
        setAnalisyId(0);
        setMaterialCode('');

        setTrain(undefined);
        setMaterial(undefined);
    }

    //const handleEditOpenClose = () => {
    //    setOpenEdit((cur) => !cur);
    //}

    const handleDetailOpenClose = () => {
        setOpenDetail((cur) => !cur);
    }

    const handleInformationModal = (text: string) => {
        setOpenInformationModal((cur) => !cur);
        setInformationText(text);
    }

    const checkIfExistsInCarDumper = (data: any) => {
        const existsInCarDumper = dataCarDumper.some((row) => {
            const existsTrainInCarDumper = row.elements.find((e) => e.column === 'IdTrain')?.value == data;
            return existsTrainInCarDumper;
        });

        return existsInCarDumper;
    };

    const handleEditOpenClose = (data: any) => {
        const existsInCarDumper = checkIfExistsInCarDumper(data);

        if (false) {
            handleInformationModal('Não é possível editar essa composição');
        } else {
            setOpenEdit((cur) => !cur);
        }
    }

    const fetchDataCarDumper = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Car/GetAllCarDumper`)
            const data = await response.json();
            setDataCarDumper(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataTrain = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Train/GetAllTrain`)
            const data = await response.json();
            setDataTrain(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataTrainByid = async (id: number) => {
        if (id > 0) {
            try {
                const response = await fetch(`${Host}${Port}/api/Train/GetTrainById?id=${id}`)
                const data = await response.json();
                setTrain(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const updateAnalisyofTrain = async (idTrain: number, idAnalisy: number) => {
        try {
            fetch(`${Host}${Port}/api/Train/UpdateAnalysiTrain?idTrain=${idTrain}&idAnalysi=${idAnalisy}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => {
                    if (response.status === 200) {
                        fetchDataTrain();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataMaterialBymaterialid = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Material/GetMaterialById?idMaterial=${id}`)
            const data = await response.json();
            setMaterial(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditTrain = (data: any) => {
        if (data) {
            setTrainId(data)
            handleEditOpenClose(data);
        }
    }

    const handleDetailButton = async (data: any) => {
        if (data) {
            setTrainId(data)
            handleDetailOpenClose();
        }
    }

    const handleSubmitTrain = () => {
        setOpenAdd((cur) => !cur);
        fetchDataTrain();
    }

    const handleSubmitEditTrain = () => {
        setOpenEdit((cur) => !cur);
        fetchDataTrain()
    }

    useEffect(() => {
        fetchDataTrain();
    }, []);

    const handleRowSelect = (data: any) => {
        setTrainId(data);
    }

    useEffect(() => {
        fetchDataTrainByid(trainId);
    }, [trainId]);

    useEffect(() => {
        if (train) {
            setAnalisyId(train.idAnalysis);
            fetchDataMaterialBymaterialid(train.idMaterial);
        }

    }, [train]);



    useEffect(() => {
        if (material)
            setMaterialCode(material.brandCode);

    }, [material]);

    const handleAnalisyButton = (data: any) => {

        if (data.row.IdAnalysis === "0") {


            setOpenAddAnalisy(true);
        } else {


            const existsInCarDumper = checkIfExistsInCarDumper(data.id);

            console.log(data);

            if (false) {
                handleInformationModal('Não é possível editar esta análise.');
            } else {
                setOpenEditAnalisy(true);
            }

           
        }

    }

    const columns: GridColDef[] = [];

    columns.push({
        field: 'Analisy',
        headerName: 'Análise',
        width: 80,
        renderCell: (params) => (
            <Button variant='contained' size="small" color={params.row.IdAnalysis === "0" ? "success" : "warning"} sx={{ height: '3vh' }} onClick={() => handleAnalisyButton(params)}>

                {params.row.IdAnalysis === "0" ?

                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 35 35" version="1.1">

                        <title>plus</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                            <g id="Icon-Set-Filled" transform="translate(-362.000000, -1037.000000)" fill="#FFFFFF">
                                <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" >

                                </path>
                            </g>
                        </g>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 20 20" fill="none">
                        <path fill="#FFFFFF" fill-rule="evenodd" d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z" />
                    </svg>
                }
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    className="fill-current"
                    height="20" xmlSpace="preserve "
                    viewBox="0 0 50 50">

                    <g >
                        <path d="M39.114 34.332C37.38 31.449 32.326 23.487 31 21.402V10h1a2 2 0 0 0 0-4H16a2 2 0 0 0 0 4h1v11.402c-1.326 2.085-6.38 10.047-8.114 12.93-.512.851-.772 1.749-.772 2.668 0 2.757 2.243 5 4.999 5h21.773c2.757 0 5-2.243 5-5 0-.919-.26-1.817-.772-2.668zM34.884 38h-21.77c-.551 0-1-.448-1-1 0-.183.067-.386.199-.605 1.935-3.217 8.31-13.235 8.374-13.336.205-.322.313-.694.313-1.075V10.003h6v11.981a2 2 0 0 0 .312 1.074c.064.101 6.439 10.119 8.374 13.336.132.22.199.423.199.605A1 1 0 0 1 34.884 38z" />
                    </g>
                </svg>

            </Button>
        )
    });

    const handleAnalisyAdd = (id: number) => {
        setOpenAddAnalisy(false);
        setOpenEditAnalisy(false);

        if (train)
            updateAnalisyofTrain(train?.id, id);

        setAnalisyId(id);
    }


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

    function handleSwitchAvailableChange(result: boolean) {
        setAvailableFilterSwitch(result);
    }

    useEffect(() => {
        if (dataTrain) {
            if (availableFilterSwitch) {

                //setFiltredDataTrain(dataTrain.filter(e => e.elements.find(element => element.column === "Disponível")?.value === 'True'));

            } else {
                setFiltredDataTrain(dataTrain);
            }
        }

    }, [dataTrain, availableFilterSwitch]);

    useEffect(() => {
        setFiltredDataTrain(dataTrain.filter((item) => item.elements.find((element) => element.column === "Disponível")?.value === 'True'));
        fetchDataCarDumper();
    }, [dataTrain]);

    useEffect(() => {
        const filterData = (dateBegin: any, dateEnd: any) => {
            return dataTrain.filter((item) => {
                const date = dayjs(item.elements.find((element) => element.column === "Data de Chegada")?.value, "DD/MM/YYYY HH:mm:ss");
                return date.isAfter(dateBegin) && date.isBefore(dateEnd);
            });
        };

        const filteredData = dashMode === 'hist' ?  filterData(
            dayjs(selectedDateBegin?.format("DD/MM/YYYY 00:00:00"), "DD/MM/YYYY HH:mm:ss"),
            dayjs(selectedDateEnd?.format("DD/MM/YYYY 22:59:59"), "DD/MM/YYYY HH:mm:ss")
        ) : dataTrain;

        if (availableFilterSwitch) {
            setFiltredDataTrain(filteredData.filter((item) => item.elements.find((element) => element.column === "Disponível")?.value === 'True'));
        } else {
            setFiltredDataTrain(filteredData);
        }

    }, [selectedDateBegin, selectedDateEnd, availableFilterSwitch]);

    return (
        <DefaultLayout>

            {openAddAnalisy ?
                <AnalisyAddDialog
                    handleAddClose={handleAddCloseAnalisy}
                    openAdd={openAddAnalisy}
                    materialCode={materialCode}
                    handleAnalisyAdd={handleAnalisyAdd}
                    showMaterialList={'nao'} />

                : <></>
            }

            {openEditAnalisy ?
                <AnalisyEditDialog
                    analisyId={analisyId}
                    handleClose={handleEditCloseAnalisy}
                    openAdd={openEditAnalisy}
                    handleSubmit={handleAnalisyAdd} />
                : <></>
            }
            {openInformationModal ? <InformationDialog handleClose={handleInformationModal} openAdd={openInformationModal} > {informationText} </InformationDialog> : <></>}

            <Breadcrumb pageName="Composição" />

            {openAdd ? <TrainAddDialog handleClose={handleAddClose} openAdd={openAdd} handleSubmit={handleSubmitTrain} /> : <></>}
            {openEdit ? <TrainEditDialog handleClose={handleEditOpenClose} openAdd={openEdit} id={trainId} handleSubmit={handleSubmitEditTrain} /> : <></>}
            {openDetail ? <TrainDetailDialog handleClose={handleDetailOpenClose} openAdd={openDetail} id={trainId} /> : <></>}

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

            <div style={{ display: "flex", justifyContent: "flex-start" }} className="my-2" >
                
                <TogleDash
                    handleDateBeginChange={handleDateBeginChange}
                    handleDateEndChange={handleDateEndChange}
                    handleModeChanged={handleModeChanged}
                    dashMode={dashMode}
                    handleDateMode={handleDateMode}
                    dateMode={dateMode}
                />
                <FormControlLabel control={<Switch defaultChecked={availableFilterSwitch} value={availableFilterSwitch} onChange={e => { handleSwitchAvailableChange(Boolean(e.target.checked)) }} />} label="Composições disponíveis" />
            </div>

            <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">

                {filtredDataTrain.length > 0 ?

                    <DataGridGTA
                        isEdit={true}
                        sortOrder={'desc'}
                        fieldSort={'Id'}
                        handleEditButton={handleEditTrain}
                        data={filtredDataTrain}
                        pageSize={15}
                        pageSizeOptions={15}
                        idColumn={'Id'}
                        hiddenColumns={['Id', 'IdAnalysis', 'Origem', 'IdMaterial', 'Disponível','AverageWeight']}
                        addColumns={columns}
                        handleRowSelect={handleRowSelect}
                    />

                    : <Skeleton variant="rectangular" height={500} animation="wave" />}
            </div>
        </DefaultLayout>
    );
}

export default Train;
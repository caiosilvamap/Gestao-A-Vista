import { Button, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DataGridGTA from '../../componentsGTA/DataGridGTA';
import StopAddDialog from '../../componentsGTA/StopAddDialog';
import { DataTableElements, ElementRow } from '../../componentsGTA/Table';
import Host, { Port } from '../../Conf';
import DefaultLayout from '../../layout/DefaultLayout';

function Stop() {

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [dataCarDumper, setDataCarDumper] = useState<DataTableElements<ElementRow>[]>([]);

    const fetchDataCarDumper = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Car/GetAllCarDumper`)
            const data = await response.json();
            setDataCarDumper(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddButton = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleSubmit = () => {
        setOpenAdd((cur) => !cur);
        fetchDataCarDumper();
    }

    useEffect(() => {
        fetchDataCarDumper();
    }, []);

  return (
      <DefaultLayout>
          {openAdd ? <StopAddDialog handleClose={handleAddButton} openAdd={openAdd} handleSubmit={handleSubmit} /> : <></>}


          <Breadcrumb pageName="Paradas" />

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

          <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">

              {dataCarDumper.length > 0 ?


                  <DataGridGTA isDetail={true} isEdit={true} fieldSort={'Id'} data={dataCarDumper} pageSize={10} pageSizeOptions={10} idColumn={'Id'} sortOrder={'desc'}
                      hiddenColumns={['Id', 'IdTrain', 'User', 'Status', 'Material','IdMaterial', 'Peso Inicial', 'Peso Final', 'Destino', 'Vagões', 'Emissão']} />
                  : <Skeleton variant="rectangular" height={500} animation="wave" />}
          </div>

      </DefaultLayout>
  );
}

export default Stop;
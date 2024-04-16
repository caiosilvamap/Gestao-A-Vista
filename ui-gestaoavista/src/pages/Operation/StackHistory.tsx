import { Button, FormControl, Skeleton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataGridGTA from '../../componentsGTA/DataGridGTA';
import { DataTableElements, ElementRow } from '../../componentsGTA/Table';
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

function StackHistory() {

    const { stack } = useParams();

    const [dataStackValues, setDataStackValues] = useState<DataTableElements<ElementRow>[]>([]);
    const [dataStack, setDataStack] = useState<StackValues>();

    const fetchDataStackValues = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Stack/GetAllStackValuesById?id=${id}`);
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

    useEffect(() => {

        if (stack) {
            fetchDataStackValues(Number(stack));
            fetchDataStack(Number(stack));
        }

    }, [stack])

    const navigate = useNavigate();

    const handleOnClickQuality = (data: any) => {
        console.log(data.id);

        navigate(`/qualityMap/${data.id}`);
    }


    const colums: GridColDef[] = [
        //field: 'quality', headerName: 'Qualidade', width: 80, editable: false, renderCell: (params) => (
        //    <FormControl>
        //        <Button color="inherit" onClick={() => handleOnClickQuality(params)}>
        //            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="20px" width="20px" version="1.1" id="_x32_" viewBox="0 0 512 512" xmlSpace="preserve">

        //                <g>
        //                    <polygon points="251.703,230.024 195.24,187.179 172.747,216.824 229.21,259.661  " />
        //                    <path d="M365.624,450.3l-30.242-25.594c17.5-8.618,33.39-20.008,46.992-33.626   c31.925-31.889,51.748-76.203,51.736-124.902c0.008-30.404-7.729-59.188-21.336-84.205c-12.864-23.666-30.981-43.959-52.751-59.528   l40.898-53.896L310.579,0L184.865,165.678l90.346,68.549l53.971-71.132c16.035,11.178,29.385,25.988,38.753,43.24   c9.664,17.797,15.139,38.082,15.142,59.844c-0.008,34.764-14.017,66.005-36.786,88.81c-22.809,22.773-54.05,36.778-88.814,36.794   c-33.753-0.016-64.165-13.215-86.796-34.812c-1.41-1.351-2.729-2.796-4.072-4.203h24.247v-23.365H77.89v23.365h25.644   c8.59,15.254,19.345,29.093,31.881,41.084c18.318,17.536,40.511,31.139,65.113,39.528l-20.001,16.92   c-10.826,9.163-17.07,22.622-17.07,36.809V512h219.241v-24.891C382.699,472.922,376.45,459.463,365.624,450.3z" />
        //                </g>
        //            </svg>

        //        </Button>
        //    </FormControl>
        //)
    ];

    return (
        <DefaultLayout>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Histórico da pilha {dataStack?.stack.name}
                </h2>

                <nav>
                    <ol className="flex items-center gap-2">

                        <li>
                            <Link to={`/stacks/`}>Pilhas /</Link>
                        </li>
                        <li className="text-primary"> Detalhes da pilha</li>
                    </ol>
                </nav>
            </div>

            

            {dataStack && dataStack?.stack.id > 0 && dataStackValues.length > 0 ?
                <>
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                        <DataGridGTA
                            data={dataStackValues}
                            addColumns={colums}
                            pageSize={10}
                            pageSizeOptions={10} idColumn={'Id'} hiddenColumns={['Id', 'IdStack', 'IdStackStatus', 'IdStacking', 'IdReclaiming', 'Completed', 'IdCarDumper']}
                        />
                    </div>
                </>
                :
                <Skeleton variant="rectangular" height={550} animation="wave" />
            }

        </DefaultLayout>
    );
}

export default StackHistory;
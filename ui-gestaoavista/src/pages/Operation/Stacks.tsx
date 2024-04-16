import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button, FormControl, Skeleton, Switch } from '@mui/material';
import { useState } from 'react';
import DataGridGTA from '../../componentsGTA/DataGridGTA';
import { DataTableElements, ElementRow } from '../../componentsGTA/Table';
import StackAddDialog from '../../componentsGTA/StackAddDialog';
import StackingEditDialog from '../../componentsGTA/StackEditDialog';
import StackingDetailDialog from '../../componentsGTA/StackDetailDialog';
import Host, { Port } from '../../Conf';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import StackingAddDialog from '../../componentsGTA/StackingDialogAdd';
import ReclaimingAddDialog from '../../componentsGTA/ReclaimingAddDialog';
import ReclaimingEditDialog from '../../componentsGTA/ReclaimingEditDialog';

function Stacking() {

    const [material, setMaterial] = useState('DOLO');
    const [idStacking, setIdStacking] = useState(0);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [openStacking, setOpenStacking] = useState<boolean>(false);
    const [openReclaiming, setOpenReclaiming] = useState<boolean>(false);
    const [openEditReclaiming, setOpenEditReclaiming] = useState<boolean>(false);

    const [idStack, setIdStack] = useState(0);

    const [dataStacking, setDataStacking] = useState<DataTableElements<ElementRow>[]>([]);

    const fetchDataStacking = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Stack/GetAllStacksView`);
            const data = await response.json();
            setDataStacking(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddButton = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleAddClose = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleEditClose = () => {
        setOpenEdit((cur) => !cur);
    }

    const handleDetailOpenClose = () => {
        setOpenDetail((cur) => !cur);
    }

    const handleReclaimingOpenClose = () => {
        setOpenReclaiming((cur) => !cur);
    }

    const handleReclaimingEditOpenClose = () => {
        setOpenEditReclaiming((cur) => !cur);
    }

    const handleStackingOpenClose = () => {
        setOpenStacking((cur) => !cur);
    }

    const handleSubmitStacking = () => {
        setOpenAdd((cur) => !cur);
        fetchDataStacking();
    }

    const handleSubmitEditStacking = () => {
        setOpenEdit((cur) => !cur);
        fetchDataStacking();
    }

    const handleEditStacking = (data: any) => {
        setIdStacking(data);
        handleEditClose();
    }

    const handleDetailStacking = (data: any) => {
        setIdStacking(data);
        handleDetailOpenClose();
    }

    useEffect(() => {
        fetchDataStacking();
    }, [])

    const handleRowSelect = () => {

    }

    const handleOnClickStacking = (data: any) => {
        setIdStack(data.id);
        handleStackingOpenClose();
        
        console.log(data.id);
    }

    const handleOnClickReclaiming = (data: any) => {
        setIdStack(data.id);
        handleReclaimingOpenClose();
    }

    const handleOnClickReclaimingEdit = (data: any) => {
        setIdStack(data.id);
        handleReclaimingEditOpenClose();
    }

    const handleReclaimingSubmit = () => {
        fetchDataStacking();
        handleReclaimingOpenClose();
    }

    const handleReclaimingEditSubmit = () => {
        fetchDataStacking();
        handleReclaimingEditOpenClose();
    }

    const navigate = useNavigate();

    const handleOnClickHistory = (data: any) => {
        console.log(data.id);

        navigate(`/stackHistory/${data.id}`);
    }


    const columns: GridColDef[] = [
        {
            field: 'reclaming', headerName: 'Retomar', width: 160, editable: false, renderCell: (params) => (
                <FormControl>

                    {params.row.Status === "Em consumo"  ?
                        <Button color="success" variant="outlined" onClick={() => handleOnClickReclaimingEdit(params)}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#079053" height="20px" width="30px" viewBox="100 80 350 355" version="1.1" id="Capa_1" xmlSpace="preserve">
                                <g>
                                    <path d="M44.8,352.8c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3c-1.39-1.4-3.33-2.2-5.3-2.2c-1.98,0-3.91,0.8-5.3,2.2   c-1.4,1.39-2.2,3.33-2.2,5.3c0,1.97,0.8,3.91,2.2,5.3c1.39,1.4,3.33,2.2,5.3,2.2C41.47,355,43.41,354.2,44.8,352.8z" />
                                    <path d="M98.2,270.2c-1.4,1.39-2.2,3.33-2.2,5.3c0,1.97,0.8,3.91,2.2,5.3c1.39,1.4,3.33,2.2,5.3,2.2c1.97,0,3.91-0.8,5.3-2.2   c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3c-1.39-1.4-3.33-2.2-5.3-2.2C101.53,268,99.59,268.8,98.2,270.2z" />
                                    <path d="M295.5,340c-1.97,0-3.91,0.8-5.3,2.2c-1.4,1.39-2.2,3.33-2.2,5.3c0,1.97,0.8,3.91,2.2,5.3c1.39,1.4,3.33,2.2,5.3,2.2   c1.97,0,3.91-0.8,5.3-2.2c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3C299.41,340.8,297.47,340,295.5,340z" />
                                    <path d="M103.5,355h128c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-128c-4.142,0-7.5,3.358-7.5,7.5S99.358,355,103.5,355z" />
                                    <path d="M503.5,364h-13.729l-79.03-52.687c-5.606-3.738-12.556-4.89-19.068-3.16c-6.511,1.729-11.974,6.177-14.986,12.203   l-5.389,10.778l-21.084-74.151c-2.296-9.411-9.444-16.941-18.636-19.771c-0.75-0.487-1.595-0.853-2.521-1.049l-50.342-10.679   c-0.033-0.119-0.06-0.238-0.099-0.356l-23.951-71.853c-0.002-0.006-0.004-0.012-0.006-0.019L249.906,139h5.594   c4.142,0,7.5-3.358,7.5-7.5c0-4.142-3.358-7.5-7.5-7.5h-16.118c-0.015,0-0.03,0-0.045,0H119.5c-17.369,0-31.5,14.131-31.5,31.5   v29.53l-16.604-3.522c-7.114-1.507-14.425,2.22-17.381,8.868l-24.369,54.83c-2.139,4.813-1.703,10.324,1.167,14.741   S38.542,267,43.81,267h14.615l-44.062,50.053C5.596,324.304,0,335.261,0,347.5C0,369.28,17.72,387,39.5,387h256   c21.78,0,39.5-17.72,39.5-39.5c0-2.148-0.179-4.255-0.51-6.312l18.421,33.893c0.032,0.059,0.073,0.11,0.107,0.168   c0.037,0.063,0.064,0.131,0.103,0.193c0.059,0.096,0.131,0.181,0.194,0.273c0.089,0.13,0.177,0.26,0.272,0.384   c0.105,0.135,0.217,0.26,0.33,0.386c0.109,0.122,0.217,0.246,0.333,0.36c0.115,0.112,0.237,0.215,0.358,0.319   c0.126,0.109,0.249,0.22,0.381,0.32c0.13,0.098,0.268,0.183,0.403,0.272c0.133,0.087,0.263,0.18,0.401,0.258   c0.156,0.089,0.32,0.162,0.482,0.24c0.127,0.061,0.25,0.128,0.381,0.182c0.191,0.079,0.39,0.138,0.587,0.201   c0.11,0.035,0.216,0.079,0.327,0.108c0.214,0.057,0.435,0.094,0.655,0.132c0.102,0.018,0.201,0.046,0.303,0.059   c0.153,0.02,0.309,0.02,0.464,0.031c0.171,0.012,0.342,0.034,0.515,0.034c0.008,0,0.016-0.001,0.024-0.001h127.852   c0.037,0,0.074,0.001,0.11,0.001s0.073,0,0.11-0.001H503.5c4.142,0,7.5-3.358,7.5-7.5S507.642,364,503.5,364z M359.223,355.284   l-34.949-64.303c6.911-0.193,13.19-2.942,17.924-7.341l19.158,67.377L359.223,355.284z M335.495,260.063l0.146,0.511   c0.227,0.94,0.36,1.917,0.36,2.926c0,6.893-5.607,12.5-12.5,12.5c-4.326,0-8.144-2.21-10.389-5.559l-1.011-1.861   c-0.015-0.028-0.034-0.054-0.05-0.082c-0.672-1.532-1.05-3.221-1.05-4.999c0-6.893,5.607-12.5,12.5-12.5   c5.583,0,10.322,3.681,11.921,8.742C335.446,259.849,335.464,259.956,335.495,260.063z M261.721,221.88l-118.822-25.205   c0.061-0.384,0.101-0.774,0.101-1.175v-32c0-0.276,0.224-0.5,0.5-0.5h98.594L261.721,221.88z M103,187.5v-32   c0-9.098,7.402-16.5,16.5-16.5h114.594l3,9H143.5c-8.547,0-15.5,6.953-15.5,15.5v30.015l-25.036-5.311   C102.986,187.972,103,187.738,103,187.5z M71.5,252H43.81c-0.095,0-0.271,0-0.419-0.228s-0.077-0.389-0.038-0.476l24.369-54.829   c0.095-0.214,0.33-0.334,0.561-0.287l234.15,49.668c-4.011,4.78-6.433,10.937-6.433,17.65c0,3.047,0.505,5.976,1.424,8.717   l-163.138-27.189l-13.641-5.108C115.457,237.409,109.64,236,103.5,236c-12.345,0-23.381,5.696-30.63,14.594   c-0.007,0.007-0.014,0.014-0.021,0.021l-1.225,1.392C71.583,252.006,71.542,252,71.5,252z M42.225,308.105l22.431-25.481   C68.021,301.014,84.153,315,103.5,315c10.229,0,19.561-3.909,26.583-10.31l9.084,9.084c5.949,5.95,13.86,9.226,22.273,9.226h103.11   c-5.346,6.739-8.551,15.25-8.551,24.5s3.205,17.761,8.551,24.5H70.449C75.795,365.261,79,356.75,79,347.5   C79,326.637,62.738,309.51,42.225,308.105z M109.376,251.717l5.251,1.966C122.556,257.744,128,265.996,128,275.5   c0,13.509-10.991,24.5-24.5,24.5S79,289.009,79,275.5S89.991,251,103.5,251C105.525,251,107.492,251.251,109.376,251.717z    M161.441,308c-4.407,0-8.551-1.716-11.667-4.833l-10.639-10.639C141.611,287.37,143,281.594,143,275.5   c0-4.137-0.642-8.126-1.827-11.876L259.677,308H161.441z M15,347.5c0-6.141,2.276-11.757,6.022-16.061   c0.783-0.414,1.51-0.965,2.13-1.67l1.604-1.822C28.862,324.844,33.969,323,39.5,323c13.509,0,24.5,10.991,24.5,24.5   S53.009,372,39.5,372S15,361.009,15,347.5z M295.5,372c-13.509,0-24.5-10.991-24.5-24.5s10.991-24.5,24.5-24.5   c2.386,0,4.691,0.349,6.873,0.988l3.341,1.251C314.136,329.119,320,337.635,320,347.5C320,361.009,309.009,372,295.5,372z    M311.944,311.6c-0.042-0.021-0.087-0.039-0.13-0.059c-1.523-0.694-3.093-1.301-4.711-1.799l-99.636-37.311l98.583,16.431   l15.977,29.396C319.046,315.551,315.646,313.302,311.944,311.6z M371.635,364l18.468-36.935c1.105-2.211,3.03-3.779,5.42-4.414   c2.389-0.635,4.839-0.229,6.897,1.143L462.729,364H371.635z" />
                                </g>
                            </svg>
                            Retomar
                        </Button>

                        :
                        <Button color="error" variant="outlined" onClick={() => handleOnClickReclaiming(params)}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#CC3035" height="20px" width="30px" viewBox="100 80 350 355" version="1.1" id="Capa_1" xmlSpace="preserve">
                                <g>
                                    <path d="M44.8,352.8c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3c-1.39-1.4-3.33-2.2-5.3-2.2c-1.98,0-3.91,0.8-5.3,2.2   c-1.4,1.39-2.2,3.33-2.2,5.3c0,1.97,0.8,3.91,2.2,5.3c1.39,1.4,3.33,2.2,5.3,2.2C41.47,355,43.41,354.2,44.8,352.8z" />
                                    <path d="M98.2,270.2c-1.4,1.39-2.2,3.33-2.2,5.3c0,1.97,0.8,3.91,2.2,5.3c1.39,1.4,3.33,2.2,5.3,2.2c1.97,0,3.91-0.8,5.3-2.2   c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3c-1.39-1.4-3.33-2.2-5.3-2.2C101.53,268,99.59,268.8,98.2,270.2z" />
                                    <path d="M295.5,340c-1.97,0-3.91,0.8-5.3,2.2c-1.4,1.39-2.2,3.33-2.2,5.3c0,1.97,0.8,3.91,2.2,5.3c1.39,1.4,3.33,2.2,5.3,2.2   c1.97,0,3.91-0.8,5.3-2.2c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3C299.41,340.8,297.47,340,295.5,340z" />
                                    <path d="M103.5,355h128c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-128c-4.142,0-7.5,3.358-7.5,7.5S99.358,355,103.5,355z" />
                                    <path d="M503.5,364h-13.729l-79.03-52.687c-5.606-3.738-12.556-4.89-19.068-3.16c-6.511,1.729-11.974,6.177-14.986,12.203   l-5.389,10.778l-21.084-74.151c-2.296-9.411-9.444-16.941-18.636-19.771c-0.75-0.487-1.595-0.853-2.521-1.049l-50.342-10.679   c-0.033-0.119-0.06-0.238-0.099-0.356l-23.951-71.853c-0.002-0.006-0.004-0.012-0.006-0.019L249.906,139h5.594   c4.142,0,7.5-3.358,7.5-7.5c0-4.142-3.358-7.5-7.5-7.5h-16.118c-0.015,0-0.03,0-0.045,0H119.5c-17.369,0-31.5,14.131-31.5,31.5   v29.53l-16.604-3.522c-7.114-1.507-14.425,2.22-17.381,8.868l-24.369,54.83c-2.139,4.813-1.703,10.324,1.167,14.741   S38.542,267,43.81,267h14.615l-44.062,50.053C5.596,324.304,0,335.261,0,347.5C0,369.28,17.72,387,39.5,387h256   c21.78,0,39.5-17.72,39.5-39.5c0-2.148-0.179-4.255-0.51-6.312l18.421,33.893c0.032,0.059,0.073,0.11,0.107,0.168   c0.037,0.063,0.064,0.131,0.103,0.193c0.059,0.096,0.131,0.181,0.194,0.273c0.089,0.13,0.177,0.26,0.272,0.384   c0.105,0.135,0.217,0.26,0.33,0.386c0.109,0.122,0.217,0.246,0.333,0.36c0.115,0.112,0.237,0.215,0.358,0.319   c0.126,0.109,0.249,0.22,0.381,0.32c0.13,0.098,0.268,0.183,0.403,0.272c0.133,0.087,0.263,0.18,0.401,0.258   c0.156,0.089,0.32,0.162,0.482,0.24c0.127,0.061,0.25,0.128,0.381,0.182c0.191,0.079,0.39,0.138,0.587,0.201   c0.11,0.035,0.216,0.079,0.327,0.108c0.214,0.057,0.435,0.094,0.655,0.132c0.102,0.018,0.201,0.046,0.303,0.059   c0.153,0.02,0.309,0.02,0.464,0.031c0.171,0.012,0.342,0.034,0.515,0.034c0.008,0,0.016-0.001,0.024-0.001h127.852   c0.037,0,0.074,0.001,0.11,0.001s0.073,0,0.11-0.001H503.5c4.142,0,7.5-3.358,7.5-7.5S507.642,364,503.5,364z M359.223,355.284   l-34.949-64.303c6.911-0.193,13.19-2.942,17.924-7.341l19.158,67.377L359.223,355.284z M335.495,260.063l0.146,0.511   c0.227,0.94,0.36,1.917,0.36,2.926c0,6.893-5.607,12.5-12.5,12.5c-4.326,0-8.144-2.21-10.389-5.559l-1.011-1.861   c-0.015-0.028-0.034-0.054-0.05-0.082c-0.672-1.532-1.05-3.221-1.05-4.999c0-6.893,5.607-12.5,12.5-12.5   c5.583,0,10.322,3.681,11.921,8.742C335.446,259.849,335.464,259.956,335.495,260.063z M261.721,221.88l-118.822-25.205   c0.061-0.384,0.101-0.774,0.101-1.175v-32c0-0.276,0.224-0.5,0.5-0.5h98.594L261.721,221.88z M103,187.5v-32   c0-9.098,7.402-16.5,16.5-16.5h114.594l3,9H143.5c-8.547,0-15.5,6.953-15.5,15.5v30.015l-25.036-5.311   C102.986,187.972,103,187.738,103,187.5z M71.5,252H43.81c-0.095,0-0.271,0-0.419-0.228s-0.077-0.389-0.038-0.476l24.369-54.829   c0.095-0.214,0.33-0.334,0.561-0.287l234.15,49.668c-4.011,4.78-6.433,10.937-6.433,17.65c0,3.047,0.505,5.976,1.424,8.717   l-163.138-27.189l-13.641-5.108C115.457,237.409,109.64,236,103.5,236c-12.345,0-23.381,5.696-30.63,14.594   c-0.007,0.007-0.014,0.014-0.021,0.021l-1.225,1.392C71.583,252.006,71.542,252,71.5,252z M42.225,308.105l22.431-25.481   C68.021,301.014,84.153,315,103.5,315c10.229,0,19.561-3.909,26.583-10.31l9.084,9.084c5.949,5.95,13.86,9.226,22.273,9.226h103.11   c-5.346,6.739-8.551,15.25-8.551,24.5s3.205,17.761,8.551,24.5H70.449C75.795,365.261,79,356.75,79,347.5   C79,326.637,62.738,309.51,42.225,308.105z M109.376,251.717l5.251,1.966C122.556,257.744,128,265.996,128,275.5   c0,13.509-10.991,24.5-24.5,24.5S79,289.009,79,275.5S89.991,251,103.5,251C105.525,251,107.492,251.251,109.376,251.717z    M161.441,308c-4.407,0-8.551-1.716-11.667-4.833l-10.639-10.639C141.611,287.37,143,281.594,143,275.5   c0-4.137-0.642-8.126-1.827-11.876L259.677,308H161.441z M15,347.5c0-6.141,2.276-11.757,6.022-16.061   c0.783-0.414,1.51-0.965,2.13-1.67l1.604-1.822C28.862,324.844,33.969,323,39.5,323c13.509,0,24.5,10.991,24.5,24.5   S53.009,372,39.5,372S15,361.009,15,347.5z M295.5,372c-13.509,0-24.5-10.991-24.5-24.5s10.991-24.5,24.5-24.5   c2.386,0,4.691,0.349,6.873,0.988l3.341,1.251C314.136,329.119,320,337.635,320,347.5C320,361.009,309.009,372,295.5,372z    M311.944,311.6c-0.042-0.021-0.087-0.039-0.13-0.059c-1.523-0.694-3.093-1.301-4.711-1.799l-99.636-37.311l98.583,16.431   l15.977,29.396C319.046,315.551,315.646,313.302,311.944,311.6z M371.635,364l18.468-36.935c1.105-2.211,3.03-3.779,5.42-4.414   c2.389-0.635,4.839-0.229,6.897,1.143L462.729,364H371.635z" />
                                </g>
                            </svg>
                            Retomar
                        </Button>

                    }

                </FormControl>
            )
        },
        {
            field: 'history', headerName: 'Histórico', width: 80, editable: false, renderCell: (params) => (
                <FormControl>
                    <Button color="inherit" onClick={() => handleOnClickHistory(params)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z" fill="#000000" />
                        </svg>
                        
                    </Button>
                </FormControl>
            )
        },
       
    ];

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pilhas" />
            {openAdd ? <StackAddDialog handleClose={handleAddClose} openAdd={openAdd} handleSubmit={handleSubmitStacking} /> : <></>}
            {openEdit ? <StackingEditDialog handleClose={handleEditClose} openAdd={openEdit} id={idStacking} handleSubmit={handleSubmitEditStacking} /> : <></>}
            {openDetail ? <StackingDetailDialog handleClose={handleDetailOpenClose} open={openDetail} id={idStacking} /> : <></>}

            {openReclaiming  ? <ReclaimingAddDialog
                handleClose={handleReclaimingOpenClose}
                open={openReclaiming}
                stackId={idStack}
                handleSubmit={handleReclaimingSubmit }
            /> : <></>}

            {openEditReclaiming ? <ReclaimingEditDialog
                handleClose={handleReclaimingEditOpenClose}
                open={openEditReclaiming}
                stackId={idStack}
                handleSubmit={handleReclaimingEditSubmit}
            /> : <></>}
            

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
                {dataStacking.length > 0 ?
                    <DataGridGTA
                        addColumns={columns}
                        sortOrder={'desc'}
                        fieldSort={'Id'}
                        isDetail={true}
                        isEdit={true}
                        handleEditButton={handleEditStacking}
                        handleDetailButton={handleDetailStacking}
                        data={dataStacking}
                        pageSize={10}
                        pageSizeOptions={10}
                        idColumn={'Id'}
                        hiddenColumns={['Id','TOC','TOM']}
                        handleRowSelect={handleRowSelect}
                    />
                    : <Skeleton variant="rectangular" height={500} animation="wave" />
                }
            </div>

        </DefaultLayout>
    );
}

export default Stacking;
import Breadcrumb from "../../../components/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLayout";
import React, { useEffect, useState } from 'react';
import { JsonToTable, DataTableElements, ElementRow } from '../../../components/Table/Table';
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Skeleton, Switch, TextField } from '@mui/material';
import Host, { Port } from '../../../LinkAPI';
import DataGridGTA from "../../../components/Table/DataGridGTA";
import { GridColDef } from "@mui/x-data-grid";
import { DialogScreen } from "../../../components/componentsGTA/DialogScreen";
import Icon from "../../../components/IconSVG/IconSVG";
import UserAddDialog from "./UserAddDialog";
import UserEditDialog from "./UserEditDialog";
import UserDeleteDialog from "./UserDeleteDialog";
import UserDetailsDialog from "./UserDetailsDialog";
import IconSVG from "../../../components/IconSVG/IconSVG";
import SearchAppBar from "../../../components/componentsGTA/Search";
import { enqueueSnackbar } from 'notistack';



function User() {

    const [userData, setUserData] = useState<DataTableElements<ElementRow>[]>([]);
    const [openAddUser, setOpenAddUser] = useState<boolean>(false);
    const [openEditUser, setOpenEditUser] = useState<boolean>(false);
    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
    const [openDetailsUser, setOpenDetailsUser] = useState<boolean>(false);
    const [userId, setUserId] = useState(0);
    const [dataUserGroupType, setDataUserGroupType] = useState<DataTableElements<ElementRow>[]>([]);
    const [search, setSearch] = useState('');
    const [columnNamesKey, setColumnsNameKey] = useState<string[]>([]);


    const fetchUserData = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/User/GetAll`);
            const data = await response.json();
            setUserData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleAddUser = () => {
        setOpenAddUser((cur) => !cur);
    }

    const handleCloseUser = () => {
        setOpenAddUser((cur) => !cur);
    }

    const handleEditUser = (data: any) => {
        setOpenEditUser((cur) => !cur);
    }

    const handleEditCloseUser = () => {
        setOpenEditUser((cur) => !cur);
    }

    const handleDeleteUser = () => {
        setOpenDeleteUser((cur) => !cur);
    }

    const handleDeleteCloseUser = () => {
        setOpenDeleteUser((cur) => !cur);
    }

    const handleDetailsCloseUser = () => {
        setOpenDetailsUser((cur) => !cur);
    }

    const handleDetailsUser = () => {
        setOpenDetailsUser((cur) => !cur);
    }

    const handleAddSubmit = () => {
        setOpenAddUser((cur) => !cur);
        fetchDataUserGroupType();
        fetchUserData();
    }

    const handleDeleteSubmit = () => {
        setOpenDeleteUser((cur) => !cur);
        fetchUserData();
    }

    const handleEditSubmit = () => {
        setOpenEditUser((cur) => !cur);
        fetchDataUserGroupType();
        fetchUserData();
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    const fetchDataUserGroupType = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/UserGroup/GetAllToSelect`)
            const data = await response.json();
            setDataUserGroupType(data);
        } catch (error) {
            console.log('Error fetchin data:', error);
        }
    }

    const handleRowSelect = (data: any) => {
        setUserId(data);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };


    useEffect(() => {
        fetchDataUserGroupType();
    }, []);

    useEffect(() => {
        if (userData.length > 0 && userData[0].elements) {
            const columns = userData[0].elements.map(e => e.column);
            setColumnsNameKey(columns);
        } else {
            console.error("Não foi possível extrair as colunas do userData");
        }
    }, [userData]);

    return (
        <>
            <Breadcrumb pageName="Usuários" />

            {openAddUser ? <UserAddDialog handleClose={handleCloseUser} openAdd={openAddUser} handleSubmit={handleAddSubmit} /> : <></>}
            {openEditUser ? <UserEditDialog handleClose={handleEditCloseUser} openAdd={openEditUser} data={userId} handleSubmit={handleEditSubmit} /> : <></>}
            {openDeleteUser ? <UserDeleteDialog handleClose={handleDeleteCloseUser} openAdd={openDeleteUser} data={userId} handleSubmit={handleDeleteSubmit} /> : <></>}
            {openDetailsUser ? <UserDetailsDialog handleClose={handleDetailsCloseUser} openAdd={openDetailsUser} data={userId} handleSubmit={undefined} /> : <></>}




            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="mx-2 my-2">

                <SearchAppBar onChange={handleChange} />

                <Button variant="contained" size="large" color="success" onClick={handleAddUser}>
                    <IconSVG src="src/images/icon/icon-add.svg" />
                    <span className="ml-2">Adicionar</span>
                </Button>
            </div>




            <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                {userData.length > 0 ?
                    <DataGridGTA
                        sortOrder={'desc'}
                        fieldSort={'Id'}
                        isDelete={true}
                        isDetail={true}
                        isEdit={true}
                        handleDeleteButton={handleDeleteUser}
                        handleEditButton={handleEditUser}
                        handleDetailButton={handleDetailsUser}
                        data={userData}
                        pageSize={10}
                        pageSizeOptions={10}
                        idColumn={'Id'}
                        flex={1}
                        hiddenColumns={['Id', 'Gerencia Geral']}
                        handleRowSelect={handleRowSelect}
                        search={search}
                        searchColumn={columnNamesKey}
                    />
                    : <Skeleton variant="rectangular" height={500} animation="wave" />
                }
            </div>
        </>
    );
}
export default User;
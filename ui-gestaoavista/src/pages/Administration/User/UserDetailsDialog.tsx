import React, { useEffect, useState } from "react";
import { DialogScreen } from "../../../components/componentsGTA/DialogScreen";
import { DataTableElements, ElementRow } from "../../../components/TableTwo";
import Host, { Port } from "../../../LinkAPI";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import TextMaskCustom from "./TextMaskCustom";
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
    data: any;
}

interface IUserGroup {
    id: number,
    name: string
}

function UserDetailsDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [fieldsChanged, setFieldsChanged] = useState(false);

    const [userDate, setUserDate] = useState<Dayjs | null>(dayjs());
    const [userId, setUserId] = useState(0);
    const [socialName, setSocialName] = useState('');
    const [userName, setUserName] = useState<string>('');
    const [userGroudType, setUserGroupType] = useState(0);
    const [isUserGeneric, setIsUserGeneric] = useState<boolean>(false);
    const [isUserActive, setIsUserActive] = useState<boolean>(true);
    const [dataUserGroupType, setDataUserGroupType] = useState<IUserGroup[]>([]);

    const fetchDataUserGroupType = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/UserGroup/GetAll`);
            const data = await response.json();
            setDataUserGroupType(data);
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUserActive(event.target.checked);
        setFieldsChanged(true);
    };

    const handleChangeisUserGeneric = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUserGeneric(event.target.checked);
    }


    const getUserDataById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/User/GetById?id=${id}`);
            const data = await response.json();
            setSocialName(data.name);
            setUserName(data.userName);
            setUserGroupType(data.UserGroupId);
            setIsUserActive(data.active);
            setIsUserGeneric(data.generic);
            setUserId(data.id);
            setUserDate(data.creationDate);
            console.log('userData:', data);
        } catch (error) {
            console.error('Error fething data:', error);
        }
    }

    useEffect(() => {
        getUserDataById(data);
        fetchDataUserGroupType()
    }, [])

    return (
        <Dialog open={openAdd} onClose={handleClose} fullWidth>

            <DialogTitle>Editar usuário</DialogTitle>

            <DialogContent>
                Nome Social
                <TextField
                    focused
                    margin="dense"
                    id="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => { setSocialName(e.target.value); setFieldsChanged(true); }}
                    value={socialName}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </DialogContent>

            <DialogContent>
                Nome de Usuário
                <TextField
                    margin="dense"
                    id="user"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => { setUserName(e.target.value); setFieldsChanged(true); }}
                    value={userName}
                    InputProps={{
                        readOnly: true, inputComponent: TextMaskCustom as any,
                    }}
                />
            </DialogContent>

            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                    <Select
                        disabled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Grupo"
                        onChange={e => { setUserGroupType(Number(e.target.value)); setFieldsChanged(true); }}
                        value={userGroudType}
                    >
                        {dataUserGroupType.length > 0 ? (
                            dataUserGroupType.map((e) => (

                                <MenuItem key={e.id} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))
                        ) : null}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogContent>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                        className="dark:bg-white dark:bg-opacity-70"
                        value={'27/02/2024 09:00'}
                        readOnly={true}
                        ampm={false}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        format="DD/MM/YYYY HH:mm"
                        sx={{ backgroundColor: '#EEEEEE', mt: 1, width: '25ch' }}

                    />
                </LocalizationProvider>
            </DialogContent>

            <DialogContent>
                Ativo
                <Switch
                    disabled
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    checked={isUserActive}
                />
            </DialogContent>
            <DialogContent>
                É Genérico?
                <Switch
                    disabled
                    onChange={handleChangeisUserGeneric}
                    inputProps={{ 'aria-label': 'controlled' }}
                    checked={isUserGeneric}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>
            </DialogActions>
        </Dialog>
    );
}
export default UserDetailsDialog;

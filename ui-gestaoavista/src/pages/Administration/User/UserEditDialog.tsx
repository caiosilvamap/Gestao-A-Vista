import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogScreen } from "../../../components/componentsGTA/DialogScreen";
import { DataTableElements, ElementRow } from "../../../components/TableTwo";
import Host, { Port } from "../../../LinkAPI";
import { Alert, AlertColor, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import TextMaskCustom from "./TextMaskCustom";
import { enqueueSnackbar } from "notistack";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import axios from "axios";


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

function UserEditDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [alert, setAlert] = useState(false);
    const [outputError, setOutputError] = useState<string[]>([]);
    const [fieldsChanged, setFieldsChanged] = useState(false);

    const [userId, setUserId] = useState(0);
    const [socialName, setSocialName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userGroupId, setUserGroupId] = useState(0);
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const [selectedUserGroup, setSelectedUserGroup] = useState<number>(0);
    const [isUserGeneric, setIsUserGeneric] = useState<boolean>(false);
    const [isUserActive, setIsUserActive] = useState<boolean>(true);
    const [dataUserGroupType, setDataUserGroupType] = useState<IUserGroup[]>([]);

    const fetchDataUserGroupType = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/UserGroup/GetAllToSelect`);
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

    const validateAndSetError = (condition: boolean, errorMessage: string): number => {
        let aux = 0;
        if (condition) {
            setOutputError(prev => {
                if (prev.includes(errorMessage)) {
                    return prev;
                } else {
                    return [...prev, errorMessage];
                }
            });
            aux++;
        } else {
            setOutputError(prev => prev.filter((e: string) => e !== errorMessage));
        }
        return aux;
    }

    const validateInput = (): number => {
        let aux = 0;

        aux += validateAndSetError(userName === '', 'Insira um Nome de Usuário');
        aux += validateAndSetError(socialName === '', 'Insira um Nome');
        aux += validateAndSetError(userGroupId === 0, 'Selecione um Grupo de usuário');
        aux += validateAndSetError(userPassword !== userConfirmPassword, 'As senhas estão divergentes');
        aux += validateAndSetError(!fieldsChanged, 'Nenhum campo foi alterado');

        return aux;
    }

    useEffect(() => {

        setAlert(outputError.length > 0);

    }, [outputError]);

    const handleEditUserButton = (userId: number) => {
        if (validateInput() === 0) {
            const formData = new FormData();
            formData.append('Id', `${userId}`);
            formData.append('UserName', userName);
            formData.append('Name', socialName);
            formData.append('Active', `${isUserActive}`);
            formData.append('UserGroupId', `${userGroupId}`);
            formData.append('Password', userPassword)
            formData.append('Generic', `${isUserGeneric}`);


            axios.post(`${Host}${Port}/api/User/Edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((response) => {
                if (response.status === 200) {
                    handleSubmit();
                    enqueueSnackbar('Usuário Alterado com Sucesso!', { variant: 'success' as AlertColor });
                    return response;
                } else {
                    enqueueSnackbar('Erro ao Alterar o Usuário!', { variant: 'error' as AlertColor });
                    throw new Error('error');
                }
            })
                .then((data) => {
                    console.log('Response Data:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {

            setPasswordsMatch(false);
        };
    }

    const getUserDataById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/User/GetById?id=${id}`);
            const data = await response.json();
            setSocialName(data.name);
            setUserName(data.userName);
            setUserGroupId(data.userGroupId);
            setIsUserActive(data.active);
            setIsUserGeneric(data.generic);
            setUserId(data.id);
            console.log('userName:', data.userName);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getUserDataById(data);
        fetchDataUserGroupType()
    }, [])


    return (
        <Dialog open={openAdd} onClose={handleClose} className='w-100 justify-self-center' >

            <DialogTitle>Editar usuário</DialogTitle>

            {alert && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {outputError?.map((e: string) => { return (<div>{e}</div>) })}
                </Alert>
            )}

            <DialogContent className='w-auto gap-5 h-full flex flex-col'>

                <TextField
                    required
                    margin="dense"
                    id="name"
                    label={socialName}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => { setSocialName(e.target.value); setFieldsChanged(true); }}
                    inputProps={{
                        autoComplete: "off",
                    }}
                    autoComplete="off"
                    sx={{ flexGrow: 1 }}
                />



                <TextField
                    required
                    InputProps={{
                        autoComplete: "off", inputComponent: TextMaskCustom as any
                    }}
                    autoComplete="off"
                    margin="dense"
                    id="userName"
                    label={userName}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => { setUserName(e.target.value.toUpperCase()); setFieldsChanged(true); }}
                    sx={{ flexGrow: 1 }}
                />

                {isUserGeneric ? (
                    <>
                        <TextField
                            margin="dense"
                            label="Nova Senha"
                            id="password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={e => { setUserPassword(e.target.value); setFieldsChanged(true); }}
                        />

                        <TextField
                            margin="dense"
                            label="Confirmar Senha"
                            id="confirmPassword"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={e => { setUserConfirmPassword(e.target.value); setFieldsChanged(true); }}
                        />

                    </>
                ) : null}

                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Grupo"
                        autoWidth
                        onChange={e => { setUserGroupId(Number(e.target.value)); setFieldsChanged(true); }}
                        value={userGroupId}
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

                <FormGroup>

                    <FormControlLabel control={<Switch defaultChecked onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} checked={isUserActive} />} label="Ativo?" />

                    <FormControlLabel disabled control={<Switch onChange={handleChangeisUserGeneric} inputProps={{ 'aria-label': 'controlled' }} checked={isUserGeneric} />} label="Genérico?" />

                </FormGroup>

            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>
                <Button variant="contained" color="success" onClick={() => handleEditUserButton(userId)}>Editar</Button>
            </DialogActions>

        </Dialog>
    );
}
export default UserEditDialog;

import { IMaskInput } from 'react-imask';
import React, { useEffect, useState } from "react";
import { DialogScreen } from "../../../components/componentsGTA/DialogScreen";
import { DataTableElements, ElementRow } from "../../../components/TableTwo";
import Host, { Port } from "../../../LinkAPI";
import { Alert, AlertColor, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import TextMaskCustom from './TextMaskCustom';
import { enqueueSnackbar } from 'notistack';
import { Label } from '@mui/icons-material';
import axios from 'axios';




interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
}

interface IUserGroup {
    id: number,
    name: string
}


function UserAddDialog({ openAdd, handleSubmit, handleClose }: Props) {
    const [alert, setAlert] = useState(false);
    const [outputError, setOutputError] = useState<string[]>([]);

    const [userName, setUserName] = useState<string>('');
    const [socialName, setSocialName] = useState('');
    const [userGroupId, setUserGroupId] = useState(0);
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const [selectedUserGroup, setSelectedUserGroup] = useState<number>(0);
    const [isUserGeneric, setIsUserGeneric] = useState<boolean>(false);
    const [isUserActive, setIsUserActive] = useState<boolean>(true);
    const [dataUserGroupType, setDataUserGroupType] = useState<IUserGroup[]>([]);
    const userId = 0;

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
        console.log('active user', isUserActive);
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

        aux += validateAndSetError(socialName === '', 'Insira um Nome');
        aux += validateAndSetError(userName === '', 'Insira um Nome de Usuário');
        aux += validateAndSetError(userGroupId === 0, 'Selecione um Grupo de usuário');
        aux += validateAndSetError(userPassword !== userConfirmPassword, 'As senhas estão divergentes');

        return aux;
    }

    useEffect(() => {

        setAlert(outputError.length > 0);

    }, [outputError]);

    const handleSubmitUserButton = () => {
        if (validateInput() === 0) {
            const formData = new FormData();
            formData.append('Id', `${userId}`);
            formData.append('UserName', userName);
            formData.append('Name', socialName);
            formData.append('Active', `${isUserActive}`);
            formData.append('UserGroupId', `${userGroupId}`);
            formData.append('Password', userPassword)
            formData.append('Generic', `${isUserGeneric}`);

            axios.post(`${Host}${Port}/api/User/Add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((response) => {
                if (response.status === 200) {
                    handleSubmit();
                    enqueueSnackbar('Usuário Adicionado com Sucesso!', { variant: 'success' as AlertColor });
                    return response;
                } else {
                    enqueueSnackbar('Erro ao Adicionar Usuário!', { variant: 'error' as AlertColor });
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
        }
    }

    useEffect(() => {
        fetchDataUserGroupType()
    }, [])


    return (
        <Dialog open={openAdd} onClose={handleClose} className='w-100 justify-self-center' >
            {isUserGeneric ? (
                <DialogTitle>Adicionar usuário Genérico</DialogTitle>
            ) : (
                <DialogTitle>Adicionar usuário do MASTER</DialogTitle>)}

            {alert && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {outputError?.map((e: string) => { return (<div>{e}</div>) })}
                </Alert>
            )}

            <DialogContent className='w-auto gap-5 h-full flex flex-col'>

                <TextField
                    required
                    label="Nome Social"
                    margin="dense"
                    id="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setSocialName(e.target.value)}
                    inputProps={{
                        autoComplete: "off",
                    }}
                    autoComplete="off"
                    sx={{ flexGrow: 1 }}
                />

                <TextField
                    required
                    label="Nome de Usuário"
                    margin="dense"
                    id="userName"
                    type="text"
                    onChange={e => setUserName(e.target.value)}
                    fullWidth
                    variant="standard"
                    name="numberformat"
                    InputProps={{
                        inputComponent: TextMaskCustom as any, autoComplete: "off"
                    }}
                    autoComplete="off"
                    sx={{ flexGrow: 1 }}

                />

                {isUserGeneric ? (
                    <>
                        <TextField
                            required
                            label="Senha"
                            margin="dense"
                            id="password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={e => setUserPassword(e.target.value)}
                            sx={{ flexGrow: 1 }}
                        />

                        <TextField
                            required
                            label="Confirmar Senha"
                            margin="dense"
                            id="confirmPassword"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={e => setUserConfirmPassword(e.target.value)}
                            sx={{ flexGrow: 1 }}
                        />

                    </>
                ) : null}

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Grupo"
                        onChange={e => setUserGroupId(Number(e.target.value))}
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

                <FormGroup className='w-1' >
                    <FormControlLabel control={<Switch defaultChecked onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />} label="Ativo?" />
                    <FormControlLabel control={<Switch onChange={handleChangeisUserGeneric} inputProps={{ 'aria-label': 'controlled' }} />} label="Genérico?" />
                </FormGroup>

            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>
                <Button variant="contained" color="success" onClick={handleSubmitUserButton}>Salvar</Button>
            </DialogActions>

        </Dialog>
    );
}
export default UserAddDialog;
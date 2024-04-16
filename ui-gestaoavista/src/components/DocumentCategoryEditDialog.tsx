import { Alert, AlertColor, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Host, { Port } from "../LinkAPI";
import axios from "axios";
import { enqueueSnackbar } from "notistack";


interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
    data: any;
}

function DocumentCategoryAddDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [alert, setAlert] = useState(false);
    const [fieldsChanged, setFieldsChanged] = useState(false);
    const [outputError, setOutputError] = useState<string[]>([]);
    const [docCategoryName, setDocCategoryName] = useState('');
    const [isDocCategoryActive, setIsDocCategoryActive] = useState<boolean>(true);
    const [docCategoryId, setDocCategoryId] = useState(0);

    const getDocumentCategpryById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/DocumentCategory/GetById?id=${id}`);
            const data = await response.json();
            setDocCategoryName(data.name);
            setIsDocCategoryActive(data.active);
            setDocCategoryId(data.id);
            console.log('userName:', data.userName);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChangeIsActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDocCategoryActive(event.target.checked);
        setFieldsChanged(true);
    };

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

        aux += validateAndSetError(docCategoryName === '', 'Insira um Nome');
        aux += validateAndSetError(!fieldsChanged, 'Nenhum campo foi alterado');

        return aux;
    }

    useEffect(() => {

        setAlert(outputError.length > 0);

    }, [outputError]);

    const handleEditDocumentCategoryButton = (docCategoryId: number) => {
        if (validateInput() === 0) {
            const formData = new FormData();
            formData.append("Id", `${docCategoryId}`);
            formData.append("Name", docCategoryName);
            formData.append("Active", `${isDocCategoryActive}`);

            axios.post(`${Host}${Port}/api/DocumentCategory/Edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((response) => {
                if (response.status === 200) {
                    handleSubmit();
                    enqueueSnackbar('Categoria Alterada com Sucesso!', { variant: 'success' as AlertColor });
                    return response;
                } else {
                    enqueueSnackbar('Erro ao Alterar Categoria!', { variant: 'error' as AlertColor });
                    throw new Error('error');
                }
            })
                .then((data) => {
                    console.log('Response Data:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    useEffect(() => {
        getDocumentCategpryById(data);
    }, [])

    return (
        <Dialog open={openAdd} onClose={handleClose} className='w-100 justify-self-center' >

            <DialogTitle>Editar Categoria</DialogTitle>

            {alert && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {outputError?.map((e: string) => { return (<div>{e}</div>) })}
                </Alert>
            )}

            <DialogContent className='w-auto gap-5 h-full flex flex-col'>

                <TextField
                    required
                    label={docCategoryName}
                    margin="dense"
                    id="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => {setDocCategoryName(e.target.value); setFieldsChanged(true);}}
                    inputProps={{
                        autoComplete: "off",
                    }}
                    autoComplete="off"
                    sx={{ flexGrow: 1 }}
                />

                <FormControlLabel control={<Switch onChange={handleChangeIsActive} inputProps={{ 'aria-label': 'controlled' }} checked={isDocCategoryActive} />} label="Ativo?" />

            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>
                <Button variant="contained" color="success" onClick={() => handleEditDocumentCategoryButton(docCategoryId)}>Editar</Button>
            </DialogActions>

        </Dialog>
    );

}
export default DocumentCategoryAddDialog;
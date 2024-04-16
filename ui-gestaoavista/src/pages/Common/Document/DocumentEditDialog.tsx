import { Alert, AlertColor, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Host, { Port } from "../../../LinkAPI";
import { enqueueSnackbar } from "notistack";
import React from "react";


interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
    data: any;
}

interface IDocumentCategory {
    id: number,
    name: string
}

function DocumentEditDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [alert, setAlert] = useState(false);
    const [outputError, setOutputError] = useState<string[]>([]);
    const [fieldsChanged, setFieldsChanged] = useState(false);

    const [documentId, setDocumentId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [selectedFile, setSelectedFiles] = useState<File>();
    const [selectedSlide, setSelectedSlide] = useState<File>();
    const [pathFile, setPathFile] = useState<string>('');
    const [pathSlide, setPathSlide] = useState<string>('');
    const [documentName, setDocumentName] = useState<string>('');
    const [documentCategoryId, setDocumentCategoryId] = useState(0);
    const [dataDocumentCategory, setDataDocumentCategory] = useState<IDocumentCategory[]>([]);
    const [isDocumentPublic, setIsDocumentPublic] = useState<boolean>(false);
    const [isDocumentActive, setIsDocumentActive] = useState<boolean>(true);

    const userGroupId = localStorage.getItem('userGroupId');


    const fetchDataDocumentCategory = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/DocumentCategory/GetAllToSelect`);
            const data = await response.json();
            setDataDocumentCategory(data);
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            setSelectedFiles(event.target.files[0]);
            setFieldsChanged(true);

        }
    };

    const handleSlideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            setSelectedSlide(event.target.files[0]);
            setFieldsChanged(true);
        }
    };

    const handleChangeDocumentIsActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDocumentActive(event.target.checked);
        setFieldsChanged(true);
    };

    const handleChangeDocumentIsPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDocumentPublic(event.target.checked);
        setFieldsChanged(true);
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

        aux += validateAndSetError(documentName === '', 'Insira um Nome para o documento');
        aux += validateAndSetError(!fieldsChanged, 'Nenhum campo foi alterado');

        return aux;
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    useEffect(() => {

        setAlert(outputError.length > 0);

    }, [outputError]);

    const getDocumentDataById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Document/GetById?id=${id}`);
            const data = await response.json();
            console.log("getDocument:", data);
            setPathFile(data.pathFile);
            setPathSlide(data.pathSlide);
            setDocumentName(data.name);
            setIsDocumentPublic(data.isPublic);
            setIsDocumentActive(data.active);
            setDocumentId(data.id);
            setUserId(data.userId);
            setDocumentCategoryId(data.documentCategoryId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleEditDocumentButton = (documentId: number) => {
        if (validateInput() === 0) {
            const formData = new FormData();
            formData.append('Id', `${documentId}`);
            formData.append('Name', documentName);
            formData.append('Active', `${isDocumentActive}`);
            formData.append('IsPublic', `${isDocumentPublic}`);
            formData.append('UserId', `${userId}`);
            formData.append('DocumentCategoryId', `${documentCategoryId}`);
            formData.append('File', selectedFile || '');
            formData.append('Slide', selectedSlide || '');

            console.log("Form Data:", formData);

            console.log(formData.values());

            axios.post(`${Host}${Port}/api/Document/Edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((response) => {
                if (response.status === 200) {
                    enqueueSnackbar('Documento Alterado com Sucesso!', { variant: 'success' as AlertColor });
                    return response;
                } else {
                    enqueueSnackbar('Erro ao Alterar o Documento!', { variant: 'error' as AlertColor });
                    throw new Error('Error uploading files');
                }
            })
                .then((data) => {
                    console.log('Response Data:', data);
                    handleSubmit();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    useEffect(() => {
        getDocumentDataById(data);
        fetchDataDocumentCategory();
    }, []);


    return (
        <Dialog open={openAdd} onClose={handleClose} className='w-100 justify-self-center'>

            {isDocumentPublic && userGroupId == '2' ? (

                <React.Fragment>
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        <p>Documentos Públicos Não Podem ser Alterados</p>
                    </Alert>
                    <DialogActions>
                        <Button variant="outlined" color="warning" onClick={handleClose}>Sair</Button>
                    </DialogActions>
                </React.Fragment>


            ) : (


                <React.Fragment>
                    <DialogTitle>Editar Documento</DialogTitle>

                    {alert && (
                        <Alert severity="error">
                            <AlertTitle>Erro</AlertTitle>
                            {outputError?.map((e: string) => { return (<div>{e}</div>) })}
                        </Alert>
                    )}

                    <DialogContent className='w-auto gap-5 h-full flex flex-col'>

                        <TextField
                            required
                            label={documentName}
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={e => { setDocumentName(e.target.value); setFieldsChanged(true); }}
                            inputProps={{
                                autoComplete: "off",
                            }}
                            autoComplete="off"
                            sx={{ flexGrow: 1 }}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Categoria"
                                onChange={e => setDocumentCategoryId(Number(e.target.value))}
                                value={documentCategoryId}
                            >
                                {dataDocumentCategory.length > 0 ? (
                                    dataDocumentCategory.map((e) => (

                                        <MenuItem key={e.id} value={e.id}>
                                            {e.name}
                                        </MenuItem>
                                    ))
                                ) : null}
                            </Select>
                        </FormControl>

                        <Button
                            component="label"
                            role={undefined}
                            variant={selectedFile || pathFile ? "contained" : "outlined"}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            {selectedFile ?
                                (
                                    <p className="max-w-35 text-base[12px] overflow-hidden text-ellipsis font-thin whitespace-nowrap">
                                        {selectedFile.name}
                                    </p>
                                ) :
                                "Upload File"
                            }
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple={false} style={{ display: "none" }} />
                        </Button>

                        <Button
                            component="label"
                            aria-required
                            role={undefined}
                            variant={selectedSlide || pathSlide ? "contained" : "outlined"}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            {selectedSlide ?
                                (
                                    <p className="max-w-35 text-base[12px] overflow-hidden text-ellipsis font-thin whitespace-nowrap">
                                        {selectedSlide.name}
                                    </p>
                                ) :
                                "Upload Slide"
                            }
                            <VisuallyHiddenInput type="file" onChange={handleSlideChange} accept="image/png, image/jpg, image/jpeg" multiple={false} style={{ display: "none" }} />
                        </Button>


                        <FormGroup className="w-1">
                            <FormControlLabel control={<Switch onChange={handleChangeDocumentIsActive} checked={isDocumentActive} inputProps={{ 'aria-label': 'controlled' }} />} label="Ativo?" />

                            {userGroupId === '1' || userGroupId === '3' ?

                                <FormControlLabel control={<Switch onChange={handleChangeDocumentIsPublic} checked={isDocumentPublic} inputProps={{ 'aria-label': 'controlled' }} />} label="Público?" />

                                : <></>
                            }
                        </FormGroup>

                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>
                        <Button variant="contained" color="success" onClick={() => handleEditDocumentButton(documentId)}>Editar</Button>
                    </DialogActions>
                </React.Fragment>

            )}
        </Dialog>
    )

}

export default DocumentEditDialog;
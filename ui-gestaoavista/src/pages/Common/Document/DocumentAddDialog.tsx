import { useEffect, useRef, useState } from "react";
import Host, { Port } from "../../../LinkAPI";
import { Alert, AlertColor, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Label } from "@mui/icons-material";



interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;

}

interface IDocumentCategory {
    id: number,
    name: string
}



function DocumentAddDialog({ openAdd, handleSubmit, handleClose }: Props) {
    const [alert, setAlert] = useState(false);
    const [outputError, setOutputError] = useState<string[]>([]);

    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [selectedSlide, setSelectedSlide] = useState<File | undefined>();
    const [documentCategoryId, setDocumentCategoryId] = useState(0);
    const [documentId, setDocumentId] = useState<Number>(0);
    const [documentName, setDocumentName] = useState<string>('');
    const [isDocumentPublic, setIsDocumentPublic] = useState<boolean>(false);
    const [isDocumentActive, setIsDocumentActive] = useState<boolean>(true);
    const [dataDocumentCategory, setDataDocumentCategory] = useState<IDocumentCategory[]>([])



    const userGroupId = localStorage.getItem('userGroupId');

    const userIdString = localStorage.getItem('userId');

    const userId = userIdString ? Number(userIdString) : 0;

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

            setSelectedFile(event.target.files[0]);
            console.log(selectedFile)
        }
    };

    const handleSlideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            setSelectedSlide(event.target.files[0]);
            console.log(selectedSlide)
        }
    };

    const handleChangeDocumentIsActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDocumentActive(event.target.checked);
    };

    const handleChangeDocumentIsPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDocumentPublic(event.target.checked);
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
        aux += validateAndSetError(selectedSlide === undefined, 'Insira uma imagem para o slide');

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

    const handleSubmitDocumentButton = () => {
        if (validateInput() === 0 && selectedSlide) {
            const formData = new FormData();
            formData.append('UserId', `${userId}`);
            formData.append('DocumentCategoryId', `${documentCategoryId}`);
            formData.append('Id', `${documentId}`);
            formData.append('Name', documentName);
            formData.append('Active', `${isDocumentActive}`);
            formData.append('IsPublic', `${isDocumentPublic}`);
            formData.append('Slide', selectedSlide);

            if (selectedFile) {
                formData.append('File', selectedFile);
            }

            axios.post(`${Host}${Port}/api/Document/Upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'

                },
            }).then((response) => {
                if (response.status === 200) {
                    handleSubmit();
                    enqueueSnackbar('Documento Adicionado com Sucesso!', { variant: 'success' as AlertColor });
                    return response;
                } else {
                    enqueueSnackbar('Erro ao Adicionar Documento!', { variant: 'error' as AlertColor });
                    throw new Error('Error uploading files');
                }
            })
                .catch((error) => {
                    enqueueSnackbar('Erro ao Adicionar o Documento!', { variant: 'error' as AlertColor });
                    console.error('Error:', error);
                });

        }
    }

    useEffect(() => {
        fetchDataDocumentCategory()
    }, [])


    return (
        <Dialog open={openAdd} onClose={handleClose} className='w-100 justify-self-center'>

            <DialogTitle>Adicionar Documentos</DialogTitle>

            {alert && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {outputError?.map((e: string) => { return (<div>{e}</div>) })}
                </Alert>
            )}

            <DialogContent className='w-auto gap-5 h-full flex flex-col'>

                <TextField
                    required
                    label="Nome do Documento"
                    margin="dense"
                    id="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setDocumentName(e.target.value)}
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
                    variant={selectedFile ? "contained" : "outlined"}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    {selectedFile ? (
                        <p className="max-w-35 text-base[12px] overflow-hidden text-ellipsis font-thin whitespace-nowrap">
                            {selectedFile.name}
                        </p>
                    ) : (
                        "Upload File"
                    )}
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple={false} style={{ display: "none" }} />
                </Button>


                <Button
                    component="label"
                    aria-required
                    role={undefined}
                    variant={selectedSlide ? "contained" : "outlined"}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    {selectedSlide ? (
                        <p className="max-w-35 text-base[12px] overflow-hidden text-ellipsis font-thin whitespace-nowrap">
                            {selectedSlide.name}
                        </p>
                    ) : (
                        "Upload Slide"
                    )}
                    <VisuallyHiddenInput type="file" onChange={handleSlideChange} accept="image/png, image/jpg, image/jpeg" multiple={false} style={{ display: "none" }} />
                </Button>



                <FormGroup className="w-1">
                    <FormControlLabel control={<Switch defaultChecked onChange={handleChangeDocumentIsActive} inputProps={{ 'aria-label': 'controlled' }} />} label="Ativo?" />

                    {userGroupId === '1' || userGroupId === '3' ?

                        <FormControlLabel control={<Switch onChange={handleChangeDocumentIsPublic} inputProps={{ 'aria-label': 'controlled' }} />} label="Público?" />

                        : <></>
                    }
                </FormGroup>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>
                <Button variant="contained" color="success" onClick={handleSubmitDocumentButton}>Salvar</Button>
            </DialogActions>

        </Dialog>
    )
}

export default DocumentAddDialog;
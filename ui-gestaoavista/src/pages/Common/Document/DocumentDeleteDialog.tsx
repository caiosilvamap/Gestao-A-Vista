import { useEffect, useState } from "react";
import Host, { Port } from "../../../LinkAPI";
import { Alert, AlertColor, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";


interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
    data: any;
}

function DocumentDeleteDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [alert, setAlert] = useState(false);
    const [outputError, setOutputError] = useState<string[]>([]);

    const [documentId, setDocumentId] = useState(0);
    const [documentName, setDocumentName] = useState('');
    const [documentIsPublic, setDocumentIsPublic] = useState<boolean>();

    const userGroupId = localStorage.getItem('userGroupId');

    const getDocumentById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/Document/GetById?id=${id}`);
            const data = await response.json();
            setDocumentId(data.Id);
            setDocumentName(data.name);
            setDocumentIsPublic(data.isPublic)
        } catch (error) {
            console.error('Error fething data:', error);
        }
    }

    useEffect(() => {
        getDocumentById(data);
    }, [])

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

        aux += validateAndSetError(documentIsPublic === true, 'Documentos Públicos Não Podem ser Apagados');

        return aux;
    }

    useEffect(() => {

        setAlert(outputError.length > 0);

    }, [outputError]);

    const handleDeleteDocumentButton = (documentId: number) => {
        const id = documentId;

        if (validateInput() === 0) {
            fetch(`${Host}${Port}/api/Document/Delete?&idDocument=${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        handleSubmit();
                        enqueueSnackbar('Documento Apagado com Sucesso!', { variant: 'success' as AlertColor });
                        return response.json();
                    } else {
                        enqueueSnackbar('Erro ao Apagar o Documento!', { variant: 'error' as AlertColor });
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

    return (
        <Dialog open={openAdd} onClose={handleClose}>
            {documentIsPublic && userGroupId !== '1' ? (
                <React.Fragment>
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        <p>Documentos Públicos Não Podem ser Apagados</p>
                    </Alert>
                    <DialogActions>
                        <Button variant="outlined" color="warning" onClick={handleClose}>Sair</Button>
                    </DialogActions>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <DialogTitle>{"Excluir Documento"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {`Tem certeza que deseja excluir o documento ${documentName} ?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="warning" onClick={handleClose}>Sair</Button>
                        <Button variant="contained" color="error" onClick={() => handleDeleteDocumentButton(data)}>Excluir</Button>
                    </DialogActions>
                </React.Fragment>
            )}
        </Dialog>
    );

}
export default DocumentDeleteDialog;

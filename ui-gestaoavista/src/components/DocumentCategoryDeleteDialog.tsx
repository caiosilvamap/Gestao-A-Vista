import { useEffect, useState } from "react";

import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { enqueueSnackbar } from "notistack";
import Host, { Port } from "../LinkAPI";

interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
    data: any;
}

function DocumentCategoryDeleteDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [documentCategoryId, setDocumentDataCategoryId] = useState(0);
    const [documentCategoryName, setDocumentCategoryName] = useState('');

    const getDocumentCategoryById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/DocumentCategory/GetById?id=${id}`);
            const data = await response.json();
            setDocumentDataCategoryId(data.id);
            setDocumentCategoryName(data.name);
        } catch (error) {
            console.error('Error fething data:', error);
        }
    }

    useEffect(() => {
        getDocumentCategoryById(data);
    }, [])

    const handleDeleteDocumentCategoryButton = (docCategoryId: number) => {
        const id = docCategoryId;

        fetch(`${Host}${Port}/api/DocumentCategory/Delete?&id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    enqueueSnackbar('Categoria Apagada com Sucesso!', { variant: 'success' as AlertColor });
                    handleSubmit();
                    return response.json();
                } else {
                    enqueueSnackbar('Erro ao Apagar a Categoria!', { variant: 'error' as AlertColor });
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


    return (
        <Dialog open={openAdd} onClose={handleClose}>

            <DialogTitle>{"Excluir Categoria"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {`Tem certeza que deseja excluir a Categoria ${documentCategoryName} ?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="warning" onClick={handleClose}>Sair</Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteDocumentCategoryButton(data)}>Excluir</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DocumentCategoryDeleteDialog;


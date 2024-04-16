import { useEffect, useState } from "react";
import Host, { Port } from "../../../LinkAPI";
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { enqueueSnackbar } from "notistack";

interface Props {
    openAdd: any;
    handleClose: any;
    handleSubmit: any;
    data: any;
}

function UserDeleteDialog({ openAdd, handleSubmit, handleClose, data }: Props) {
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState('');

    const getUserById = async (id: number) => {
        try {
            const response = await fetch(`${Host}${Port}/api/User/GetById?id=${id}`);
            const data = await response.json();
            setUserId(data.Id);
            setUserName(data.userName);
        } catch (error) {
            console.error('Error fething data:', error);
        }
    }

    useEffect(() => {
        getUserById(data);
    }, [])

    const handleDeleteUserButton = (userId: number) => {
        const id = userId;

        fetch(`${Host}${Port}/api/User/Delete?&IdUser=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    enqueueSnackbar('Usuário Apagado com Sucesso!', { variant: 'success' as AlertColor });
                    handleSubmit();
                    return response.json();
                } else {
                    enqueueSnackbar('Erro ao Apagar o Usuário!', { variant: 'error' as AlertColor });
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

            <DialogTitle>{"Excluir Usuário"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {`Tem certeza que deseja excluir o usuário ${userName} ?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="warning" onClick={handleClose}>Sair</Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteUserButton(data)}>Excluir</Button>
            </DialogActions>
        </Dialog>
    );
}
export default UserDeleteDialog;


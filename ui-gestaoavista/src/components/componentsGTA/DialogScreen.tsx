import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface IDialog {
    children: any,
    title: string,
    handleClose: any,
    handleSubmit?: () => void,
    open: boolean;
    alert?: boolean;
    outputError?: string[];
    maxWidth: any,
    titleButton?: string,
    colorButton?: any,
    isEdit?: boolean,
    isAdd?: boolean
}

export const DialogScreen = ({ children, title, handleClose, handleSubmit, open, alert, outputError, maxWidth, isEdit, isAdd }: IDialog) => {

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={maxWidth}  >
            {alert && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {outputError?.map((e:string) => { return (<div>{e}</div>) })}
                </Alert>
            )}

            <DialogTitle className="dark:bg-meta-4 dark:text-white"><div className="font-bold">{title}</div></DialogTitle>
            <DialogContent className="dark:bg-meta-4 dark:text-white">
                {children}
            </DialogContent>

            <DialogActions className="dark:bg-meta-4 dark:text-white">
                <Button variant="outlined" color="error" onClick={handleClose}>Sair</Button>

                {isEdit && (
                    <Button variant="contained" color="warning" onClick={handleSubmit}>Editar</Button>
                )}

                {isAdd && (
                    <Button variant="contained" color="success" onClick={handleSubmit}>Adicionar</Button>
                )}

            </DialogActions>
        </Dialog>
    )
}
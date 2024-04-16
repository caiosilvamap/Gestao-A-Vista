import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DocumentCategory from "../../../components/DocumentCategory";
import Breadcrumb from "../../../components/Breadcrumb";

function Configurations() {
    return (
        <>
            <Breadcrumb pageName="Configurações" />
            <Grid2 container spacing={2} className="py-3 ">
                <DocumentCategory />
            </Grid2>
        </>
    );
}
export default Configurations;
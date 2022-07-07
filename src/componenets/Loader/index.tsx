import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useActions } from '../../hooks/redux/useActions';
import { useTypedSelector } from '../../hooks/redux/useSelectedTypes';

export default function Loader() {

    const app = useTypedSelector(s => s.app)

    const actions = useActions()

    const handleClose = () => {
        actions.setLoading(false)
    };

    return (
        <div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={app.loading}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </div>
    );
}

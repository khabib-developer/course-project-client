import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import  ActionCreaters from '../../store/action'


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreaters, dispatch)
}
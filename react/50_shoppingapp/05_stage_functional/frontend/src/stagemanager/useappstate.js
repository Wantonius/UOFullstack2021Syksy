import {useContext} from 'react';
import StateContext from './context/StateContext';

const useAppState = () => {
	return useContext(StateContext)
}

export default useAppState;
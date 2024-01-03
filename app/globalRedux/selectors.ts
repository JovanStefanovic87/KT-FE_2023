import { RootState } from './store';

export const selectIsMobile = (state: RootState) => state.device.isMobile;

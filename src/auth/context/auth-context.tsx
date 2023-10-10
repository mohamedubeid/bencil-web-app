import { createContext } from 'react';
import { AuthContextType } from '../../components/auth/interfaces';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

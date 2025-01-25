import { useEffect, useReducer, useCallback, useMemo } from 'react';
// import { Auth } from '@aws-amplify';
// import { Auth, Amplify } from 'aws-amplify';

// config
import awsconfig from '../../aws-exports';
//
import { AuthContext } from './auth-context';

import { User, LoginDataType } from '../../components/auth/interfaces';


interface AuthProviderProps {
  children: React.ReactNode;
}

interface State {
  user: User | null;
  loading: boolean;
}

type Action = { type: 'INITIAL'; payload: { user: User | null } } | { type: 'LOGOUT' };

const initialState: State = {
  user: null,
  loading: true,
};

const reducer = (state: State, action: Action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};


// Amplify.configure(awsconfig);

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      // const currentUser = await Auth.currentAuthenticatedUser();

      const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : /*await Auth.currentAuthenticatedUser();*/ null;

      if (currentUser) {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...currentUser,
              id: currentUser.attributes.sub,
              // displayName: `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`,
              // role: 'admin',
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = () => {}
  // const login = useCallback(async ({email, password/*, remember_me*/}: LoginDataType) => {
  //   const currentUser = await Auth.signIn(email, password);
  //   //i think here we need to add the user data to local storage write me code for that in aws im talking to you 
  //   // localStorage.setItem('user', JSON.stringify(currentUser));
  //   dispatch({
  //     type: 'INITIAL',
  //     payload: {
  //       user: {
  //         ...currentUser,
  //         id: currentUser.attributes.sub,
  //         // displayName: `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`,
  //         // role: 'admin',
  //       },
  //     },
  //   });
  // }, []);

  // REGISTER
  const register = () => {}

  // const register = useCallback(async (email: string, password: string) => {
  //   await Auth.signUp({
  //     username: email,
  //     password: password,
  //     autoSignIn: {
  //       enabled: true,
  //     },
  //   });
  // }, []);

  // CONFIRM REGISTER
  const confirmRegister = () => {}

  // const confirmRegister = useCallback(async (email: string, code: string) => {
  //   await Auth.confirmSignUp(email, code);
  // }, []);

  // RESEND CODE REGISTER
  // const resendCodeRegister = useCallback(async (email: string) => {
  //   await Auth.resendSignUp(email);
  // }, []);

  // LOGOUT
  const logout = () => {}
  // const logout = useCallback(async () => {
  //   await Auth.signOut();
  //   dispatch({
  //     type: 'LOGOUT',
  //   });
  // }, []);

  // FORGOT PASSWORD
  // const forgotPassword = useCallback(async (email: string) => {
  //   await Auth.forgotPassword(email);
  // }, []);

  // NEW PASSWORD
  // const newPassword = useCallback(async (email: string, code: string, password: string) => {
  //   await Auth.forgotPasswordSubmit(email, code, password);
  // }, []);


  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      // newPassword,
      // forgotPassword,
      confirmRegister,
      // resendCodeRegister,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      // newPassword,
      // forgotPassword,
      confirmRegister,
      // resendCodeRegister,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}


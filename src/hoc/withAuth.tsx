import { axiosAPI } from '@seventech/utils';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  pageProps: any;
}

export const withAuth = (Component: React.ComponentType<Props>) => {

  const AuthComponent: React.FC<Props> = ({ pageProps }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      if (!isLoggedIn) {
        axiosAPI
          .get('/auth/get-me')
          .then((res: { data: { isAdmin: boolean } }) => {
            setIsLoggedIn(!!res.data.isAdmin);
          })
          .catch((error: any) => {
            console.log(error);
            Router.push('/login');
          });
      }
    }, [isLoggedIn]);

    return isLoggedIn ? <Component {...pageProps} /> : <Loading />;
  };

  return AuthComponent;
};

const Loading = () => {
  return (
    <div className='h-screen w-full bg-white' />
  )
}

export const withMeAuth = (Component: React.ComponentType<Props>) => {

  const AuthMeComponent: React.FC<Props> =({ pageProps })  => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      if (!isLoggedIn) {

        axiosAPI
          .get('/auth/get-me')
          .then((res: { data: { email: any; }; }) => {
            setIsLoggedIn(!!res.data.email);
          })
          .catch((error: any) => {
            console.log(error);
            Router.push('/login')
          });
      }
    }, [isLoggedIn]);

    return isLoggedIn ? <Component {...pageProps} /> : <Loading />
  }

  return AuthMeComponent;
}
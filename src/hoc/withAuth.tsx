import { AdminLayout, Layout } from '@seventech/layouts';
import { axiosAPI } from '@seventech/utils';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  pageProps: any;
}

export const withAuth = (Component: React.ComponentType<Props>) => {

  const AuthComponent: React.FC<Props> = ({ pageProps }) => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmins, setIsAdmins] = useState<boolean>(false);

    useEffect(() => {
      if (!isAdmins) {
        axiosAPI
          .get('/auth/get-me')
          .then((res: any) => {
            let topG = !!res.data.isAdmin
            setIsLoggedIn(!!res.data.email);
            setIsAdmins(!!res.data.isAdmin);
            setTimeout(() => {
              if (!topG) {
                Router.push('/login')
              }
            }, 200)
          })
          .catch((error: any) => {
            console.log(error);
            Router.push('/login');
          });
      }
    }, [isAdmins, router]);

    return isAdmins ? <Component {...pageProps} /> : <Loading2 />;
  };

  return AuthComponent;
};

const Loading = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  return (
    <Layout setSearchTerm={setSearchTerm}>
      <div className='h-screen w-full bg-white' />
    </Layout>
  )
}
const Loading2 = () => {
  return (
    <AdminLayout>
      <div className='h-full w-full bg-white' />
    </AdminLayout>
  )
}

export const withMeAuth = (Component: React.ComponentType<Props>) => {

  const AuthMeComponent: React.FC<Props> = ({ pageProps }) => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      if (!isLoggedIn) {
        axiosAPI
          .get('/auth/get-me')
          .then((res: any) => {
            let topG = !!res.data.email
            setIsLoggedIn(!!res.data.email);
            setTimeout(() => {
              if (!topG) {
                Router.push('/login')
              }
            }, 200)
          })
          .catch((error: any) => {
            console.log(error);
            Router.push('/login');
          });
      }
    }, [isLoggedIn, router]);

    return isLoggedIn ? <Component {...pageProps} /> : <Loading />;
  };

  return AuthMeComponent;
}
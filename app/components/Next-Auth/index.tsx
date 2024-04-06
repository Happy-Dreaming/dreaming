'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //하루를 주기로 세션을 다시 발급받는다.
  const REFRESH_AGE = 3600 * 24;
  return (
    <SessionProvider refetchInterval={REFRESH_AGE}> {children}</SessionProvider>
  );
};

export default AuthProvider;

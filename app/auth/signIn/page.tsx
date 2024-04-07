'use client';
import { useEffect } from 'react';
import { KakaoLoginButton } from '../../components/Kakao/Login';
import { KakaoLogout } from '../../components/Kakao/Logout';

const SignIn = () => {
  return (
    <div>
      <KakaoLoginButton /> <KakaoLogout />
    </div>
  );
};

export default SignIn;

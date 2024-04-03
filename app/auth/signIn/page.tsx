'use client';
import { useEffect } from 'react';
import { KakaoLoginButton } from '../../components/Kakao/Login';
import { KakaoLogout } from '../../components/Kakao/Logout';

const SignIn = () => {
  useEffect(() => {
    const createNewPost = async () => {
      await fetch(`/api/diary`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(createNewPost);
    };

    createNewPost();
  }, []);
  return (
    <div>
      <KakaoLoginButton /> <KakaoLogout />
    </div>
  );
};

export default SignIn;

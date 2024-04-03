'use client';

import { useEffect } from 'react';
import { KakaoLoginButton } from '../../components/Kakao/Login';
import { KakaoLogout } from '../../components/Kakao/Logout';

const SignIn = () => {
  useEffect(() => {
    const createNewPost = async () => {
      await fetch(`/api/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: '안녕하세요',
          diaryId: 'cluhv6y4r00011387hiqqex76',
        }),
      });
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

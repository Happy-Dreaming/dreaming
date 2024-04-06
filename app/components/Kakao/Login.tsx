'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

//NOTE - 마크업 추가적으로 필요함.

const KakaoLoginButton = () => {
  const router = useRouter();
  const handleKakaoLogin = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <>
      <button className="border-2 p-2" onClick={handleKakaoLogin}>
        카카오 로그인
      </button>
    </>
  );
};

export { KakaoLoginButton };

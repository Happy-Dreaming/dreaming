'use client';
import { useEffect } from 'react';
import { KakaoLoginButton } from '../../components/Kakao/Login';
import { KakaoLogout } from '../../components/Kakao/Logout';

const SignIn = () => {
  useEffect(() => {
    const createNewPost = async () => {
      await fetch(`/api/diary`, {
        method: 'POST',
        body: JSON.stringify({
          title: '새 포스트',
          content: '새 포스트 내용',
          isShare: false,
        }),
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

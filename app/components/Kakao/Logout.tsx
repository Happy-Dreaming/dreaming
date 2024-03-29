'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const KakaoLogout = () => {
  const router = useRouter();
  const handleKakaoLogout = async () => {
    await signOut().then(() => {
      router.push(
        `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=http://localhost:3000`
      );
    });
  };

  <button className="border-2 p-2" onClick={handleKakaoLogout}>
    카카오 로그아웃
  </button>;
};

export { KakaoLogout };

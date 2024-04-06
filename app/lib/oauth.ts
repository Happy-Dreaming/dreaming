//카카오의 refresh토큰으로 새 accessToken을 받아온다.

const refreshKakaoAccessToken = async (token: any) => {
  try {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
        refresh_token: token.refreshToken,
        client_secret: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}`,
      }),
    });

    const refreshedAccessToken = await response.json();
    if (response.ok) {
      return {
        ...token,
        accessToken: refreshedAccessToken.access_token,
        refreshToken: refreshedAccessToken.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + refreshedAccessToken.expires_in * 1000,
      };
    }
  } catch (e) {
    console.error('accessToken을 다시 발급받는 도중 에러', e);
  }
};

export { refreshKakaoAccessToken };

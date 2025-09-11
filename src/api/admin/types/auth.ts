// 인증 관련 타입 정의

/**
 * 로그인 요청 데이터 타입
 * @interface LoginRequest
 * @property {string} username - 사용자 아이디
 * @property {string} password - 비밀번호
 */
export type LoginRequest = {
  username: string;
  password: string;
};

/**
 * 로그인 응답 데이터 타입
 * @interface LoginResponse
 * @property {string} accessToken - 액세스 토큰
 * @property {string} [refreshToken] - 리프레시 토큰 (선택적)
 * @property {object} [user] - 사용자 정보 (선택적)
 * @property {string} user.id - 사용자 ID
 * @property {string} user.username - 사용자 아이디
 * @property {string} user.name - 사용자 이름
 * @property {string} user.realName - 실제 이름
 * @property {'TEACHER' | 'USER'} user.role - 사용자 역할
 */
export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    username: string;
    name: string;
    realName: string;
    role: 'TEACHER' | 'USER';
  };
};

// 주석 처리된 타입들 (AuthContext에서 사용되지만 현재는 사용되지 않음)

/**
 * 사용자 프로필 정보 타입 (주석 처리됨 - AuthContext에서 사용)
 * @interface UserProfile
 * @property {string} id - 사용자 ID
 * @property {string} username - 사용자 아이디
 * @property {string} name - 사용자 이름
 * @property {string} realName - 실제 이름
 * @property {'TEACHER' | 'USER'} role - 사용자 역할
 * @property {string} createdAt - 계정 생성일
 * @property {string} [lastLoginAt] - 마지막 로그인 시간 (선택적)
 */
// export type UserProfile = {
//   id: string;
//   username: string;
//   name: string;
//   realName: string;
//   role: 'TEACHER' | 'USER';
//   createdAt: string;
//   lastLoginAt?: string;
// };

/**
 * 리프레시 토큰 요청 타입 (주석 처리됨 - AuthContext에서 사용)
 * @interface RefreshTokenRequest
 * @property {string} refreshToken - 리프레시 토큰
 */
// export type RefreshTokenRequest = {
//   refreshToken: string;
// };

/**
 * 리프레시 토큰 응답 타입 (주석 처리됨 - AuthContext에서 사용)
 * @interface RefreshTokenResponse
 * @property {string} token - 새로운 액세스 토큰
 * @property {string} refreshToken - 새로운 리프레시 토큰
 */
// export type RefreshTokenResponse = {
//   token: string;
//   refreshToken: string;
// };

import axiosInstance from '../../lib/axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('/Auth/login', payload);
  return res.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('/Auth/register', payload);
  return res.data;
};

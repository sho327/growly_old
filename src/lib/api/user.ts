import { useGrassStore } from '@/store/grassStore'

export const fetchCurrentUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/get_current_user', {
    //   credentials: 'include', // Cookieを含める場合（必要なら）
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await res.json();

    useGrassStore.getState().setUser(data);

    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

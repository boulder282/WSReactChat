const API_BASE = "/api/api";

interface Person {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  age: number;
  city: string;
  bio: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const peopleApi = () => ({
  getFriends: async (): Promise<Person[]> => {
    const response = await fetch(`${API_BASE}/people`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ApiResponse<Person[]> = await response.json();
    return result.data;
  },

  getById: async (id: number): Promise<Person> => {
    const response = await fetch(`${API_BASE}/friends/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ApiResponse<Person> = await response.json();
    return result.data;
  },

  deleteById: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/friends/:${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  },

  currentUser: async (): Promise<Person> => {
    const response = await fetch(`${API_BASE}/user`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ApiResponse<Person> = await response.json();
    return result.data;
  },
});

export const currentUser = async () => {
  const response = await fetch(`${API_BASE}/user`);
  const result = await response.json();
  return result.data;
};

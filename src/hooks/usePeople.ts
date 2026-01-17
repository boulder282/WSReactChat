import { useEffect, useState } from "react";
import { peopleApi } from "../api/fetchPeople";

export interface Person {
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

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    peopleApi()
      .getFriends()
      .then(setPeople)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { people, isLoading, error };
};

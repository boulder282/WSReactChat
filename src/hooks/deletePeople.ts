// hooks/useDeletePerson.ts
import { useState } from "react";
import { peopleApi } from "../api/fetchPeople";

export const useDeletePerson = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePerson = async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);

    try {
      await peopleApi().deleteById(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deletePerson,
    isDeleting,
    error,
  };
};

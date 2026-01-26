import { useDeletePerson } from "../../hooks/deletePeople";
import { usePeople } from "../../hooks/usePeople";

const FriendList = () => {
  const { people, isLoading, error } = usePeople();
  const { deletePerson } = useDeletePerson();

  const handleDelete = async (personId: number, personName: string) => {
    if (!window.confirm(`Delete ${personName}?`)) return;

    try {
      await deletePerson(personId);
      console.log(`Deleting person with id: ${personId}`);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-xl">👥</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Friends</h1>
            <p className="text-gray-400 text-sm">People you can chat with</p>
          </div>
        </div>

        <span className="text-sm text-gray-400">Total: {people.length}</span>
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-5 transition-all hover:scale-[1.02] hover:border-indigo-500/50"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <img
                src={person.avatar}
                alt={person.username}
                className="w-14 h-14 rounded-full border border-gray-600 object-cover"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="text-sm text-gray-400">
                  @{person.username} • {person.city}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4 p-3 bg-gray-900/60 rounded-xl text-sm text-gray-300">
              {person.bio || (
                <span className="italic text-gray-500">No bio provided</span>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <span>📧 {person.email}</span>
              </div>
              <div className="text-gray-500">Age: {person.age}</div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all text-sm">
                Message
              </button>

              <button
                onClick={() => handleDelete(person.id, person.username)}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {people.length === 0 && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              👥
            </div>
            <h3 className="text-xl font-bold mb-2">No friends yet</h3>
            <p className="text-gray-400">Start a conversation to add friends</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendList;

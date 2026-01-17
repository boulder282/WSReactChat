import { useEffect, useState } from "react";
import useUserInfoStore from "../../store/userInfoStore";
import AvatarUpload from "./avatarUpload";
import { useNavigate } from "react-router";
import { currentUser } from "../../api/fetchPeople";
import { useQuery } from "@tanstack/react-query";

const UserInfo = () => {
  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => currentUser(),
  });
  const { info, setInfo, clearInfo } = useUserInfoStore();
  const [formData, setFormData] = useState({
    name: info.name || "",
    bio: info.bio || "",
    age: info.age?.toString() || "",
  });
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/");
  };

  const handleActive = () => {
    setIsActive(!isActive); // Переключаем состояние
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmitName = () => {
    if (formData.name.trim()) {
      setInfo({ name: formData.name });
      if (isActive) setIsActive(false); // Закрываем форму после сохранения
    }
  };

  const handleSubmitBio = () => {
    setInfo({ bio: formData.bio });
    if (isActive) setIsActive(false);
  };

  const handleSubmitAge = () => {
    const ageValue = parseInt(formData.age);
    if (!isNaN(ageValue) && ageValue > 0 && ageValue < 150) {
      setInfo({ age: ageValue });
      if (isActive) setIsActive(false);
    } else {
      alert("Please enter a valid age (1-150)");
    }
  };

  const handleSubmitAll = () => {
    const ageValue = parseInt(formData.age);
    if (
      formData.name.trim() &&
      !isNaN(ageValue) &&
      ageValue > 0 &&
      ageValue < 150
    ) {
      setInfo({
        name: formData.name,
        bio: formData.bio,
        age: ageValue,
      });
      if (isActive) setIsActive(false);
    } else {
      alert("Please fill all fields correctly");
    }
  };

  const handleClearAll = () => {
    clearInfo();
    setFormData({ name: "", bio: "", age: "" });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-xl font-bold">U</span>
          </div>
          <div>
            <p className="text-gray-400">Update your personal information</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Current User</p>
            <p className="font-semibold">{info.name || "Not set"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        {/* Left Panel - Profile Preview */}
        <div className="lg:col-span-4 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="p-2 bg-blue-900/30 rounded-lg">👤</span>
              Profile Preview
            </h2>

            {/* Кнопка Edit Profile */}
            <button
              onClick={handleActive}
              className="w-full mb-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="p-2 bg-green-900/30 rounded-lg">✏️</span>
              {isActive ? "Close Edit Mode" : "Edit Profile"}
            </button>

            <button
              onClick={handleRedirection}
              className="w-full mb-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
            >
              To messages
            </button>

            <div className="bg-gray-900/80 rounded-xl p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <AvatarUpload />
                <h3 className="text-2xl font-bold mb-1 mt-4">
                  {info.name || "Your Name"}
                </h3>
                <p className="text-gray-400">
                  {info.age ? `${info.age} years old` : "Age not set"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Bio</p>
                  <p className={info.bio ? "" : "text-gray-500 italic"}>
                    {info.bio || "No bio added yet..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-800/30">
              <p className="text-sm text-gray-300 mb-2">💡 Quick Tip</p>
              <p className="text-xs text-gray-400">
                Your profile information will be visible to other users in the
                messenger.
              </p>
            </div>
          </div>
        </div>

        {/* Правая панель */}
        <div className="lg:col-span-5">
          {isActive ? (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 h-full">
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="p-2 bg-green-900/30 rounded-lg">✏️</span>
                  Edit Profile Information
                </h2>

                {/* Name Field */}
                <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-300">
                      Display Name
                    </label>
                    <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded">
                      Required
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange("name")}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Enter your name"
                    />
                    <button
                      onClick={handleSubmitName}
                      className="sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Bio Field */}
                <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-300">Bio</label>
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                      Optional
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={formData.bio}
                      onChange={handleInputChange("bio")}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Tell something about yourself..."
                    />
                    <button
                      onClick={handleSubmitBio}
                      className="sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Age Field */}
                <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-300">Age</label>
                    <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded">
                      1-150
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange("age")}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Enter your age"
                      min="1"
                      max="150"
                    />
                    <button
                      onClick={handleSubmitAge}
                      className="sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleSubmitAll}
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>💾</span>
                    Save All Changes
                  </button>

                  <button
                    onClick={handleClearAll}
                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>🗑️</span>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Сообщение когда форма скрыта
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 h-full flex items-center justify-center min-h-[500px]">
              <div className="text-center p-8 max-w-md">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-900/70 flex items-center justify-center">
                  <span className="text-3xl">✏️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Edit Mode is Disabled
                </h3>
                <p className="text-gray-400 mb-6">
                  Click "Edit Profile" to modify your information
                </p>
                <button
                  onClick={handleActive}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
                >
                  Enable Edit Mode
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

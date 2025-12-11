import { Avatar, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [hasLocalStorage, setHasLocalStorage] = useState(false);

  // Загружаем аватар из localStorage при монтировании компонента
  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
      setHasLocalStorage(true);
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверяем размер файла (макс 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    // Проверяем тип файла
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;

      // Сохраняем в состоянии
      setAvatar(base64String);
      setHasLocalStorage(true);

      // Сохраняем в localStorage
      localStorage.setItem("userAvatar", base64String);
    };

    reader.onerror = () => {
      alert("Failed to read file");
    };

    // Читаем файл как Data URL (base64)
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setHasLocalStorage(false);
    localStorage.removeItem("userAvatar");
  };

  return (
    <div className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 max-w-md mx-auto">
      <Stack spacing={3} alignItems="center">
        <div className="relative">
          <Avatar
            src={avatar || undefined}
            sx={{
              width: 160,
              height: 160,
              border: "3px solid #4f46e5",
              boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)",
            }}
          />
          {avatar && (
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="contained"
            component="label"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
              fontWeight: "bold",
              borderRadius: "12px",
              padding: "10px 24px",
            }}
          >
            📁 Upload Avatar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleUpload}
            />
          </Button>

          {avatar && (
            <Button
              variant="outlined"
              onClick={handleRemoveAvatar}
              sx={{
                borderColor: "#ef4444",
                color: "#ef4444",
                "&:hover": {
                  borderColor: "#dc2626",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                },
                borderRadius: "12px",
                padding: "10px 24px",
              }}
            >
              🗑️ Remove
            </Button>
          )}
        </div>

        {hasLocalStorage && !avatar && (
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <p className="text-yellow-300 text-sm">
              ⚠️ Avatar found in localStorage but failed to load
            </p>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default AvatarUpload;

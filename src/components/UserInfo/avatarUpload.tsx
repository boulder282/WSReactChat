import { Avatar, Button, Stack } from "@mui/material";
import { useState } from "react";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview URL
    const imageUrl = URL.createObjectURL(file);

    // Set avatar preview
    setAvatar(imageUrl);
    localStorage.setItem("userAvatar", imageUrl);
  };

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Avatar
          src={avatar ?? undefined}
          sx={{ width: 140, height: 140, border: "2px solid #ccc" }}
        />
        <Button variant="contained" component="label">
          Upload Avatar
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>
      </Stack>
    </>
  );
};

export default AvatarUpload;

import { useState } from "react";

import "./UserInfoModal.styles.css";
import { EditModeContent } from "../Modes/editmode/editUserInfo";
import { ViewModeContent } from "../Modes/viewmode/viewMode";
import useUserInfoStore from "../../../store/userInfoStore";
import { BaseModal } from "../../../shared/components/Modal/BaseModal";
import { Button } from "../../../shared/components/ui/button/Button";
import {
  getAvatar,
  removeAvatar,
  uploadAvatar,
} from "../../../shared/components/AvatarUpload/avatarUpload";

interface UserInfoModalProps {
  open: boolean;
  onClose: () => void;
  isConnected?: boolean;
  // onSave is optional now – we can handle saving inside via store
}

export default function UserInfoModal({
  open,
  onClose,
  isConnected = false,
}: UserInfoModalProps) {
  const { info, setInfo } = useUserInfoStore();

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [avatar, setAvatar] = useState<string | undefined>(
    getAvatar() ?? undefined,
  );
  const [editedName, setEditedName] = useState(info.name ?? ""); // ← initialize from store

  const isView = mode === "view";

  const handleClose = () => {
    setMode("view");
    setEditedName(info.name ?? ""); // reset to store value
    onClose();
  };

  const handleUpload = () => {
    uploadAvatar((base64) => setAvatar(base64));
  };

  const handleRemove = () => {
    removeAvatar(() => setAvatar(undefined));
  };

  const handleSave = () => {
    const trimmed = editedName.trim();

    // Only update if there's a meaningful change
    if (trimmed && trimmed !== info.name) {
      setInfo({ name: trimmed });
      // You can also call some API here if needed
    }

    setMode("view");
    // onClose();  ← optional: close modal after save
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title={isView ? undefined : "Edit Profile"}
      footer={
        !isView && (
          <div className="user-info-modal__footer">
            <Button variant="blue" fullWidth size="large" onClick={handleSave}>
              Save
            </Button>
          </div>
        )
      }
    >
      <div className="user-info-modal__content">
        {isView ? (
          <ViewModeContent
            avatar={avatar}
            username={info.name ?? ""}
            isConnected={isConnected}
            onUpload={handleUpload}
            onEditClick={() => setMode("edit")}
          />
        ) : (
          <EditModeContent
            avatar={avatar}
            username={editedName}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onUsernameChange={setEditedName}
          />
        )}
      </div>
    </BaseModal>
  );
}

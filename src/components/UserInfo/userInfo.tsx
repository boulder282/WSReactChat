import AvatarUpload from "./avatarUpload";

const userInfo = () => {
  return (
    <div className="w-screen h-screen bg-blue-500 p-10 flex justify-center">
      <div className="w-3/4 h-1/4 bg-blue-200 flex justify-items-center-safe items-center">
        <AvatarUpload />
        Name
      </div>
    </div>
  );
};

export default userInfo;

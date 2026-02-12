import { useState } from "react";

export const DevelopPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <main className="p-5 flex flex-col gap-5 h-screen items-center justify-center">
      <h1>Hola</h1>

      <div className="flex flex-col gap-1 justify-center items-center">
        <label htmlFor="profilePicture" className="text-sm">
          Foto de perfil
        </label>
        <div className="h-30 w-30 bg-gray-200 aspect-square rounded-full relative mx-auto">
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {profilePicture && (
        <img
          src={URL.createObjectURL(profilePicture)}
          alt="Preview"
          className="w-full h-full object-cover rounded-full max-w-30 max-h-30"
        />
      )}

      
    </main>
  );
};

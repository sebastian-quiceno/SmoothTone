import { Trash2 } from "lucide-react";

type DeleteUserSongButtonProps = {
  onClick: () => string;
};

export const DeleteUserSongButton = ({ onClick }: DeleteUserSongButtonProps) => {
  return (
    <div className="flex flex-row justify-center text-black">
      <span>Eliminar cancion guardada</span>
      <Trash2 onClick={onClick} className="w-10" />
    </div>
  );
};

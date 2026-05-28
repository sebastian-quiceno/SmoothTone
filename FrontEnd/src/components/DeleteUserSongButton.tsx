import { Trash2 } from "lucide-react";

type DeleteUserSongButtonProps = {
  onClick: () => void | Promise<void>;
};

export const DeleteUserSongButton = ({ onClick }: DeleteUserSongButtonProps) => {
  return (
    <div className='flex flex-row justify-center text-black cursor-pointer hover:scale-105 transition-transform duration-200' onClick={onClick} >
      <span>Eliminar cancion guardada</span>
      <Trash2 className="w-10" />
    </div>
  );
};

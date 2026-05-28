import {Save} from 'lucide-react'

type SaveSongButtonProps = {
  onClick: () => void | Promise<void>;
};

export const SaveSongButton = ({onClick}:SaveSongButtonProps) => {
  return (
    <div className='flex flex-row justify-center text-black cursor-pointer hover:scale-105 transition-transform duration-200' onClick={onClick} >
			<span>Guardar cancion</span>
      <Save className='w-10'/>
    </div>
  );
};

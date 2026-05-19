import {Save} from 'lucide-react'
import {type UserSong} from '../types/userSong'

type SaveSongButtonProps = {
	onClick: ()=>UserSong
}

export const SaveSongButton = ({onClick}:SaveSongButtonProps) => {
  return (
    <div className='flex flex-row justify-center text-black'>
			<span>Guardar cancion</span>
      <Save onClick={onClick} className='w-10'/>
    </div>
  );
};

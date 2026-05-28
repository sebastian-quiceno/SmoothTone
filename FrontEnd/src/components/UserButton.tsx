import defaultUser from "/defaultUser.png";
import ButtonLogin from "../components/ButtonLogin";

type UserButtonProps = {
  image: string;
  username: string;
};

const UserButton = ({ image, username }: UserButtonProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 mx-4 mb-4">
      <div className="flex gap-2">
        <ButtonLogin direccion="/createartist" text="Crear Artista"  />
        <ButtonLogin direccion="/creategenre" text="Crear Genero" />
      </div>
      <div className="flex flex-row items-center" >
        <img
          src={image === "" ? defaultUser : image}
          alt="Vista previa del reproductor de música"
          className="w-[50px]"
        />

        <span className="text-white/50 text-xl">{username}</span>
      </div>
    </div>
  );
};

export default UserButton;

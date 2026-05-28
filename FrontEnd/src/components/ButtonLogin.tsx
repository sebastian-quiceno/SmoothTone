import { useNavigate } from "react-router-dom";

type ButtonProps = {
  text: string;
  direccion: string;
};

export default function Button({ text, direccion }: ButtonProps) {
  const navigate = useNavigate();
	
	return (
    <button className="px-6 py-2 bg-[#583cab] hover:bg-[#312757] rounded-lg transition-all duration-200 active:scale-95" onClick={()=>{navigate(direccion)}}>
      {text}
    </button>
  );
}

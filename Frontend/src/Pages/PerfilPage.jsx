import Perfil from '../components/Perfil'


function PerfilPage() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const esCampesino = query.get('campesino') === 'true';
  return (
    <div><Perfil esCampesino={esCampesino}></Perfil></div>
  )
}

export default PerfilPage
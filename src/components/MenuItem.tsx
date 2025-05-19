import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router"
import { type menuObj } from "./Menu";


const MenuItem = () => {
    const navigate = useNavigate();
    const params = useParams<{menuId: string}>();
    const [menus, setMenus] = useState<menuObj | null>(null);
    useEffect(()=>{
        fetch('/data/menu.json')
        .then(res => res.json())
        .then((data:menuObj[]) => {
            const foundItem = data.find(item => item.name === params.menuId);
            setMenus(foundItem || null);
        });
    },[params.menuId]);


    return(
        <>
        <div className="big-image">
        {menus?.img ? <img src={menus.img} alt={menus.name} /> : <img src="/img/placeholder.png" alt="image placeholder" />}
        </div>
        
        <strong style={{fontSize: '1.3rem'}}>{params.menuId}</strong>
        <p>{menus?.description}</p>

        <button onClick={()=>navigate(-1)} className="back">Go back</button>
        </>
    )
}

export default MenuItem
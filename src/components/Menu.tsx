import {
  useState,
  useEffect,
  Suspense,
} from 'react'
import ButtonGroup from './ButtonGroup.tsx'
import Loading from './Loading.tsx'
import { useNavigate } from 'react-router';

type menuObj = {
  name: string;
  price: number;
  pack: string;
  category: string;
  img: string | null | undefined;
  description: string;
}

type menuDataType = {
  data: menuObj[];
  action?: (value: string) => void;
}

const MenuCard: React.FC < menuDataType > = ({data}) => {
  const navigate = useNavigate();

  return(
    <>
      <div className="card-container">
        {data.map((element, index) => (
          <div key={index} className="card" onClick={() => navigate(element.name)}>
            <div className="card-img">
              <Suspense fallback={<Loading />} >
                <img src={element.img ?? "/img/placeholder.png"} loading="lazy"/>
              </Suspense>
            </div>
          <div className="card-head">
            {element.name}
          </div>
          <div className="card-body">
            ₹ {element.price} / {element.pack}
          </div>
        </div>
        ))}
      </div>
    </>
)}
const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('All');
  const [filteredMenus, setFilteredMenus] = useState([]);

  useEffect(() => {
    fetch("/data/menu.json")
      .then(response => response.json())
      .then(data => {
        setMenus(data);
        const categoryList:string[] = Array.from(new Set(data.map((item: menuObj) => item.category)));
        setCategories(["All", ...categoryList]); // Add "All" at the beginning
        setFilteredMenus(data); // Default show all
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelected(category);

    if (category === "All") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((item: menuObj) => item.category === category);
      setFilteredMenus(filtered);
    }
  };


  return (
    <>
      <h1>Menu</h1>

      {/* ButtonGroup */}
      <ButtonGroup buttons={categories} onClick={handleCategoryClick} selected={selected} />

      {/* Menu Cards */}
      <MenuCard data={filteredMenus}/>
    </>
  );
};


export default Menu;
export type {menuObj};
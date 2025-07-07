import { useEffect, useState, Suspense, ChangeEvent } from "react";
import Loading from "./Loading";
import type { menuObj } from "./Menu";

type Count = {
  count: number;
}

type NamePrice = {
  name: string;
  price: number;
}

type CountData = NamePrice & Count;
type CountDataList = CountData[]
type NamePriceList = NamePrice[];

const SelectedListItems = ({data, action}:{data: CountDataList; action?: (updated: CountDataList) => void;}) => {

  const handleCountChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      count: value,
    };
    action?.(updatedData);
  }
  return(
    <ol>
    {data.map((item, index) => (
      <li key={index}>{item.name}: ₹{item.price} × <input type="number" value={item.count} onChange={(e) => handleCountChange(index, e)}/> = ₹ {item.price * item.count}</li>
    ))}
    </ol>
  )
}

const PriceCalculator = () => {
  const [menuData, setMenuData] = useState<NamePriceList>([]); //USED TO STORE LOADED MENU DATA
  const [enteredText, setEnteredText] = useState<string>(""); //USE TO STORE QUERY IN INPUT FIELD
  const [filteredMenu, setFilteredMenu] = useState<NamePriceList>([]); //USE TO STORE RELATED QUERY
  const [selected, setSelected] = useState<CountDataList>([]); //USE TO STORE SELECTED LIST FOR CALCULATION

  //LOADING THE MENU DATA
  useEffect(()=>{
    fetch("/data/menu.json")
    .then(res => res.json())
    .then(data => {
      const filteredData = data.map((item:menuObj) => ({
        name: item.name,
        price: item.price
      }))
      setMenuData(filteredData)
    })
  },[]);

  //DISPLAY THE RELATED QUERY ENTERED IN INPUT FIELD
  useEffect(() => {
    const filtered = menuData.filter(item =>
      item.name.toLowerCase().includes(enteredText.toLowerCase())
    );
    setFilteredMenu(filtered);
  }, [enteredText, menuData]);
  
  //HANDLE CHANGE IN INPUT FIELD
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value:string = e.target.value || "";
    setEnteredText(value);
  }

  //HANDLE CLICK OF THE BUTTONS
  const handleClick = (data:NamePrice) => {
    setSelected((prev) => {
      const exists = prev.find((item) => item.name === data.name);
      if (exists) return prev; // prevent duplicates
      return [
        ...prev,
        {
          name: data.name,
          price: data.price,
          count: 1,
        },
      ];
    });
  }

  const handleSelectedListChange = (updatedList: CountDataList) => {
    setSelected(updatedList);
  };

  const totalPrice = selected.reduce((sum, item) => sum + item.price * item.count, 0);
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <input type="text" className="searchbar" onChange={handleChange} placeholder="Search..."/>
        <div className="flex-box">
        {enteredText.length > 0 ? filteredMenu.map((item:NamePrice, index:number) => (
          <button key={index} onClick={()=>handleClick(item)}>{item.name}</button>
        )): menuData.map((item:NamePrice, index:number)=>(
          <button key={index} onClick={()=>handleClick(item)}>{item.name}</button>
        ))}
        </div>
        <div className="selected-list">
          {selected.length > 0 ? (
            <>
            <SelectedListItems data={selected} action={handleSelectedListChange}/>
            <button onClick={() => {
                setSelected([]);
                setEnteredText("");
              }}>
                Clear Selection
            </button>
            </>
            ) : "No Item Selected"}
        </div>
        <div>
          {selected.length > 0 && (
          <>
          <strong>Total Price:</strong> ₹{totalPrice} <br/>
          <em>Note: Container a pack duh tan ₹10/container charge a awm.</em>
          </>)}
          
        </div>
      </Suspense>
    </>
  )
}

export default PriceCalculator;
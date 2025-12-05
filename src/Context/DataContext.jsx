import axios from "axios";
import { createContext, useState,useContext } from "react";


export const DataContext = createContext(null);

export const DataProvider = ({children})=>{
    const [data, setData] = useState()
    
    // fetching all products from api
    const fetchAllProducts = async()=>{
        try{

            const res = await axios.get("https://dummyjson.com/products?limit=150");
            
            const productsData = res.data.products
            setData(productsData)
            
        } catch (error){
            console.log(error);
         }



    }

      const getUniiqueCategory = (data, property) => {

        if (!data) return [];   // <-- ONLY FIX

        let newVal = data.map((curElem) => {
            return curElem[property];
        });

        newVal = ["All",...new Set(newVal)].slice(0, 6); // Limiting to first 8 unique categories
        return newVal;
    };

    const categoryOnlyData = getUniiqueCategory(data, "category");
    const brandOnlyData = getUniiqueCategory(data, "brand");
  
    return <DataContext.Provider value={{data, setData,fetchAllProducts,categoryOnlyData,brandOnlyData}}>
{children}
    </DataContext.Provider>
}


export const getData = ()=> useContext(DataContext)

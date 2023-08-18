import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import List from "../component/List";

const api = 'https://api.unsplash.com/search/photos';
const accessId = process.env.REACT_APP_UNSPLASH_ACCESS;

export default function AlbumSearch(){
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     // console.log(searchParams.get('query')); // 取出
    //     // setSearchParams({ query: 'hello'}) // 寫入
    // },[])

    useEffect(()=> {
        if(search !== ''){
            (async()=> {
                const response = await axios.get(`${api}?client_id=${accessId}&query=${search}`,);
                const { results } = response.data;
                setList(results);
    
                // console.log(results);
                
            })()
        }
    },[search])

    useEffect(() => {
        setSearch(searchParams.get('query'));
    },[searchParams])

    return (
        <>
            這是搜尋頁面
            <input type="text" className="form-control" 
                defaultValue={search}
                onKeyUp={(e)=>{
                    if(e.code === 'Enter'){
                        // setSearch(e.target.value);
                        setSearchParams({ query: e.target.value})
                    }
                }}
            />
            <List list={list}></List>
        </>
    )
}
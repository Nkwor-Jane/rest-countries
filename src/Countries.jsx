import React, {useState, useEffect} from 'react';
import {Card, Input, Image, Dropdown} from 'semantic-ui-react';
import axios from 'axios';
import {Routes, Route, Link, Outlet, useParams} from 'react-router-dom';
import EachCountry from './EachCountry';

export default function Countries() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectParam, setSelectParam] = useState(["All"]);
    // const [searchParam] = useState(["capital", "name", "numericCode"]);


    useEffect(() =>{
        axios.get('https://restcountries.com/v3.1/all')
        .then((response) => {
            setApiData(response.data);
        })
        .catch((error) =>{
            setError(error);
        })
        .finally(() =>{
            setLoading(false);
        })
    }, [])

    // const data = Object.values(apiData);

    const searchItems =(searchValue) =>{
        setSearchInput(searchValue)
        if(searchInput !== ''){
            const filteredData =  apiData.filter((item) =>{
                return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{ 
            setFilteredResults(apiData)
        }
        
    }
    // const searchItems =(apiData) =>{
    //    return apiData.filter((item) => {
    //     if(item.region == selectParam){
    //         return searchParam.some((newCountry) =>{
    //             return(
    //                 item[newCountry]
    //                 .toString()
    //                 .toLowerCase()
    //                 .indexOf(apiData.toLowerCase()) > -1
    //             );
    //         });
    //     }
    //     else if(selectParam == "All"){
    //         return searchParam.some((newCountry) =>{
    //             return(
    //                 item[newCountry]
    //                 .toString()
    //                 .toLowerCase()
    //                 .indexOf(apiData.toLowerCase()) > -1
    //             )
    //         })
    //     }
    //    })
        
    // }
  
    if (error) {
        return (
            <h1>
                ERROR!!!
            </h1>
        );
    } else if (loading) {
        return <h1>loading...</h1>;
    } else {  return (
    <div>
        <div style={{padding: 20}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Input icon='search' 
                    placeholder='Search...'
                    onChange={(e) => searchItems(e.target.value)}
                
                />
                <div className="dropdown">
                        <select
                            onChange={(e) => {
                                setSelectParam(e.target.value);
                            }}
                            aria-label="Filter Countries By Region"
                        >
                            <option value="All">Filter By Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                </div>
            </div>

            
            <Card.Group itemsPerRow={4} style={{marginTop:20}}>
               {searchInput.length > 1 ? (
                filteredResults.map((item,id) =>{
                    return (
                            <Card key ={id}>
                                <Image src={item.flags.png} wrapped/>
                                <Card.Content>
                                    <Card.Header>{item.name.official}</Card.Header>
                                    <Card.Description>
                                        Population: {" "}
                                        <span>{item.population}</span>
                                    </Card.Description>
                                    <Card.Description>
                                        Region: {" "}
                                        <span>{item.region}</span>    
                                    </Card.Description>            
                                    <Card.Description>
                                        Capital: {" "}
                                        <span>{item.capital}</span>
                                    </Card.Description>  
                                </Card.Content>
                            </Card>
                    )
                })
               ):(
                apiData.map((item, id) => {
                    return(
                        <Link  key ={id}  to ={id}>
                            <Card key ={id}>
                                <Card.Content>
                                    <Image src={item.flags.png} wrapped />
                                    <Card.Header>{item.name.official}</Card.Header>
                                    <Card.Description>
                                        Population: {" "}
                                        <span>{item.population}</span> 
                                    </Card.Description>
                                    <Card.Description>
                                        Region:{" "}
                                        <span>{item.region}</span>    
                                    </Card.Description>            
                                    <Card.Description>
                                        Capital: {" "}
                                        <span>{item.capital}</span>
                                    </Card.Description>  
                                </Card.Content>
                            </Card>
                            </Link>
                )
            })
        )}
            </Card.Group> 
        </div>
    </div>
  )
}
}
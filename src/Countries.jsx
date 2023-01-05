import React, {useState, useEffect} from 'react';
import {Card, Input, Image, Dropdown,Button} from 'semantic-ui-react';
import {Link, Outlet} from 'react-router-dom';
import {motion} from "framer-motion";
import {useCountryContext} from './context/COUNTRYCONTEXT'
import LoadCountries from './LoadCountries';

export default function Countries() {
    const {apiData,error, loading} = useCountryContext();

    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectParam, setSelectParam] = useState(["All"]);
    const [scrollBtn, setScrollBtn] = useState(false)
    // const [searchParam] = useState(["capital", "name", "numericCode"]);

    // const data = Object.values(apiData);

    useEffect(()=>{
        //button will be displayed after scrolling for 300 pixels
        const handleScrollVisibility = () =>{
            window.pageYOffset > 300 ? setScrollBtn(true) : setScrollBtn(false)
        };
        window.addEventListener('scroll', handleScrollVisibility);
        return() =>{
            window.removeEventListener('scroll', handleScrollVisibility)
        };
    }, [])

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

    const handleScrollToTop =() =>{
         window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
        return <LoadCountries/>;
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

            
            <Card.Group itemsPerRow={4} style={{marginTop:"25px", }}>
               {searchInput.length > 1 ? (
                filteredResults.map((item,id) =>{
                    const {flags, population, region, capital, name} = item;
                    return (
                        <Link  key ={id}  to ={`/${name}`}>
                         <Card style={{margin: "20px", height: "90%"}}>
                                <Image src={flags.png} 
                                // style={{objectFit: "fill", width: "300px", height: "200px"}} 
                                wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{name.official}</Card.Header>
                                <Card.Description>
                                    Population: {" "}
                                    <span>{population.toLocaleString()}</span> 
                                </Card.Description>
                                <Card.Description>
                                    Region:{" "}
                                    <span>{region}</span>    
                                </Card.Description>            
                                <Card.Description>
                                    Capital: {" "}
                                    <span>{capital}</span>
                                </Card.Description>  
                            </Card.Content>
                        </Card>
                        </Link>
                    )
                })
               ):(
                apiData.map((item, id) => {
                    const {flags, population, region, capital, name, index} = item;
                    return(
                        
                                <Link  key={name}  to ={`/${name}`}> 
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        translateX: -500,
                                        rotate: 10,
                                    }}
                                    animate={{
                                        opacity:1,
                                        translateX:0,
                                        rotate:0,
                                    }}
                                    transition={{
                                        delay: index * 0.02,
                                    }}
                                    whileHover={{
                                        translateY: -10,
                                    }}
                                >

                                <Card style={{margin: "20px", height: "90%"}}>
                                <Image src={flags.png} 
                                // style={{objectFit: "contain", width: "300px", height: "200px"}} 
                                wrapped ui={false} />
                                <Card.Content>
                                    <h2>{name.common}</h2>
                                    <Card.Header>{name.official}</Card.Header>
                                    <Card.Description>
                                        Population: {" "}
                                        <span>{population.toLocaleString()}</span> 
                                    </Card.Description>
                                    <Card.Description>
                                        Region:{" "}
                                        <span>{region}</span>    
                                    </Card.Description>            
                                    <Card.Description>
                                        Capital: {" "}
                                        <span>{capital}</span>
                                    </Card.Description>  
                                </Card.Content>
                            </Card>
                            </motion.div>
                            </Link>
                )
            })
        )}
            </Card.Group> 
        </div>

        {/* 👇️ scroll to top on button click */}
        {scrollBtn && (
          <Button circular icon='angle double up' onClick={handleScrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            padding: '20px',
          }}/>
        )}
    </div>
  )
}
}
import React, {useState, useEffect} from 'react';
import {Card, Input, Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {motion} from "framer-motion";
import {useCountryContext} from './context/COUNTRYCONTEXT'
import LoadCountries from './LoadCountries';
import './App.css';

export default function Countries(props) {
    const {apiData,error, loading} = useCountryContext();
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [scrollBtn, setScrollBtn] = useState(false);
    const [filterRegion, setFilterRegion] = useState("");

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

    const data = Object.values(apiData);
    console.log(apiData)
    const filter_items = [...new Set(data.map((item) => item.region))];
    const search_params = Object.keys(Object.assign({}, ...data));

    const searchItems = (items) =>{
        return items.filter((item) =>
           item.region.includes(filterRegion) && 
           search_params.some((param) =>
                item[param].toString().toLowerCase().includes(searchInput)
            )
        );
        // setSearchInput(searchValue)
        // if(searchInput !== ''){
        //     const filteredData =  apiData.filter((item) =>{
        //         return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        //     })
        //     setFilteredResults(filteredData); 
        // }
        // else{ 
        //     data.region.includes(filterRegion) && setFilteredResults(apiData)
        // }
        
        // const filterItems = (items) => {
        //     return items.filter(
        //         (item) => Object.values(item).region.includes(filterRegion)
        //     )
        // }
    }
   
    const handleScrollToTop =() =>{
         window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  
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
        <div className='second-grid'>
            <Input icon='search'
            type='search' 
            placeholder='Search for a country...'
            // onChange={(e) => searchItems(e.target.value)}
            onChange={(e) => setSearchInput(e.target.value)}
            className='search'
            />
             <select
                onChange={(e) => setFilterRegion(e.target.value)}
                className="select-dropdown"
                aria-label="Filter Countries By Region"
            >
                <option value="">Filter By Region</option>
                {filter_items.map((item) => (
                    <option value={item}>Filter By {item}</option>
                ))}
            </select>
        </div>

            <Card.Group itemsPerRow={4} style={{marginTop:"2rem", }}>
                    {searchItems(data).map((item,id) => (
                        // const {flags, population, region, capital, name, index} = item;
                         <Link  key={item.name}  to ={`/${item.name}`}> 
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
                                 delay: id * 0.02,
                             }}
                             whileHover={{
                                 translateY: -10,
                             }}
                         >

                         <Card style={{margin: "20px", height: "90%"}} key={item.id}>
                         <Image src={item.flags.png}                         
                            wrapped ui={false} />
                         <Card.Content>
                             <Card.Header>{item.name}</Card.Header>
                             <Card.Description>
                                 Population: {" "}
                                 <span>{item.population.toLocaleString()}</span> 
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
                     </motion.div>
                     </Link>
                    ))}
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
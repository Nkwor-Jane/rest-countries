import React, {useState, useEffect} from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { useCountryContext } from './context/COUNTRYCONTEXT';

export default function EachCountry() {
    const {apiData} = useCountryContext();
    const [currentData, setCurrentData] = useState([]);
    const {name} = useParams();
    useEffect(() =>{
        const res = apiData?.find((count) => {
            if(count?.name === name){
                setCurrentData(count);
            }
        });
        return res;
    }, [apiData, name]);

    // useEffect(() =>{
    //     const getCountry = async (name) =>{
    //             const baseURL = `https://restcountries.com/v3.1/name/${name}`;
    //             const response = await fetch(baseURL);
    //             const data = await response.json;
    //             setCurrentData(data[0])
    //     };
       
    // },[name])
  return (
    <>
        <Button secondary>
            <Link to ={-1}>
            <Icon name="arrow left"/>
            Back
            </Link>
        </Button>

        <div style={{border: "2px solid red", padding:" 20px"}}></div>
             {currentData.map((item) =>{
                const {borders, flags, population, 
                    region, capital, name, tld, 
                    currencies, languages} = item;
                <div>
            <Image src={item.flags.svg} wrapped /> 
             <div>
                <h2>{item.name.official}</h2>
                <p>Native Name:{name.nativeName.jpn.official}</p>
                <p>Population: {population.toLocaleString()}</p>
                <p>Region: {region}</p>
                <p>Sub Region:{subregion}</p>
                <p>Capital:{capital}</p>
            </div>
            <div>
                <p>Top Level Domain: {tld}</p>
                <p>Currencies:{currencies[0].name}</p>
                <p>Languages:{languages[0].name}</p>
            </div> 
             <div>
                <h1>Border Countries:</h1>
                {borders.map((border) =>{
                    return (
                    <Button secondary>{border}</Button>
                    )
                })}
            </div>
         </div>
            })
            } 

            {currentData ? (
                    <>
                        <Image src={currentData.flags.png} wrapped />
                        <h2>{currentData.name.official}</h2>
                    </>                
            ):("......")}
    </>
  )
}

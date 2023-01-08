import React, {useState, useEffect} from 'react';
import { Button, Icon,Image } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import LoadCountries from './LoadCountries';

export default function EachCountry() {
    const [currentData, setCurrentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [borderCountry, setBorderCountry] = useState([]);
    let {name} = useParams();

    useEffect(() =>{
        const getCountry = async (name) =>{
                const baseURL = `https://restcountries.com/v2/name/${name}`;
                const response = await fetch(baseURL);
                const data = await response.json();
                setCurrentData(data[0]);
                setIsLoading(false);
        };
        getCountry(name);
        const findBorder = async (border) =>{
            const baseURL = `https://restcountries.com/v2/alpha/${border}`;
                const response = await fetch(baseURL);
                const data = await response.json();
                setBorderCountry((curr) => [...curr, data.name]);
        }
    },[name])
    
  return (
    <>
        <Button secondary>
            <Link to ={-1}>
            <Icon name="arrow left"/>
            Back
            </Link>
        </Button>

{isLoading ? (
                <LoadCountries/>
            ):(
            <div>
            <Image src={currentData.flag} wrapped /> 
             <div>
                <h2>{currentData.name}</h2>
                <p>Native Name:{currentData.nativeName}</p>
                <p>Population: {currentData.population.toLocaleString()}</p>
                <p>Region: {currentData.region}</p>
                <p>Sub Region:{currentData.subregion}</p>
                <p>Capital:{currentData.capital}</p>
            </div>
            <div>
                <p>Top Level Domain: {currentData.topLevelDomain}</p>
                <p>Currencies:{currentData.currencies[0].name}</p>
                <p>Languages:{currentData.languages[0].name}</p>
            </div> 
             <div>
                <h1>Border Countries:</h1>
                {borderCountry?.length ? (
                    borderCountry.map((border, index) =>(
                        <Link
                            key ={index}
                            to={`/${border}`}
                        >
                        <Button secondary>{border}</Button>
                        </Link>
                    ))
                ):(
                    <p>No Borders.....</p>
                )}
            </div>
         </div>
          )}
    </>
  )
}

import React, {useState, useEffect} from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

export default function EachCountry() {
    const {id} = useParams();
  return (
    <>
        <Button secondary>
            <Icon name="arrow left"/>
            Back
        </Button>

        
        <div>
            {/* <Image/> */}
            <div>
                <h2>Country-name</h2>
                <p>Native Name:</p>
                <p>Population:</p>
                <p>Region:</p>
                <p>Sub Region:</p>
                <p>Capital:</p>
            </div>
            <div>
                <p>Top Level Domain:</p>
                <p>Currencies:</p>
                <p>Languages:</p>
            </div>
            


            <div>
                <h1>Border Countries:</h1>
                <Button secondary>France</Button>
                <Button secondary>Germany</Button>
                <Button secondary>Netherlands</Button>
            </div>
        </div>
    </>
  )
}

import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const HeaderExampleFloating = (props) => (
  <Segment clearing>
    <Header as='h2' floated='left'>
      Where in the world?
    </Header>
    <Header as='h4' floated='right'>
        <input 
        type="checkbox"
        onClick ={() =>{
          props.toggleLight();
        }}/>
    </Header>
  </Segment>
)

export default HeaderExampleFloating
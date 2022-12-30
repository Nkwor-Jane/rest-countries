import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const HeaderExampleFloating = () => (
  <Segment clearing>
    <Header as='h2' floated='left'>
      Where in the world?
    </Header>
    <Header as='h4' floated='right'>
        Dark Mode
    </Header>
  </Segment>
)

export default HeaderExampleFloating
import React from 'react';
import data from '../../../dummyData.js';
import styled from 'styled-components';
import HomeCarousel from './HomeCarousel.jsx';
import axios from 'axios';
import Arrow from './Arrow.jsx';

const Title = styled.h2`
  font-size: 25px;
  color: ${props => props.theme.dimGrey};
  margin-left: 3%;
`;

const AppContainer = styled.div({
  maxWidth: '1100px',
  maxHeight: '450px',
  postion: 'fixed',
  marginLeft: '15px'
})

const ArrowDiv = styled.div({
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
});

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      homes: data.homes
    }
  }

  componentDidMount() {
    axios.get('/related-homes/getHomes')
      .then((response) => {
        this.setState({homes: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <AppContainer >
        <div className="header">
          <Title>
            More homes you may like
          </Title>
        </div>
        <div className="homeCarousel">
          <HomeCarousel homes={this.state.homes} />
        </div>
      </AppContainer >
    )
  };
}

export default App;
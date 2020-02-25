import React from 'react';
import PictureCarousel from './PictureCarousel.jsx';
import TitleInfo from './TitleInfo.jsx';
import styled from 'styled-components';

const HomesDisplay = styled.div({
  maxHeight: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'row',
  postion: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
})

const HomeCard = styled.div({
  height: '370px',
  width: '420px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column'
})

const Container = styled.div({
  width: '1160px',
  height: '400px',
  display: 'flex',
  postion: 'relative',
})

const LeftArrow = styled.div({
  height: '30px',
  width: '30px',
  position: 'relative',
  top: '25%',
  cursor: 'pointer'
})

const RightArrow = styled(LeftArrow)`
  padding-left: 0.5%
`;

const HomeContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
transform: translateX(-${props => props.translate}px);
transition: ease-out 0.75s;
`

const Image = styled.img`
  height: 25px;
  width: 25px;
`;

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      translate: 0
    }

    this.nextHome = this.nextHome.bind(this);
    this.previousHome = this.previousHome.bind(this);
  }

  nextHome() {
    let lastIndex = 3
    let currentIndex = this.state.currentIndex;
    let nextIndex = this.state.currentIndex + 1;
    let currentHome = this.state.translate;
    let next = this.state.translate + 370
    if (currentIndex !== lastIndex) {
      this.setState({
        currentIndex: nextIndex,
        translate: next
      })
    } else {
      this.setState({
        currentIndex: 0,
        translate: 0
      })
    }
  }

  previousHome() {
    let firstIndex = 0
    let lastIndex = 3
    let currentIndex = this.state.currentIndex;
    let prevIndex = this.state.currentIndex - 1;
    let currentHome = this.state.translate;
    let prev = this.state.translate - 370
    if (currentIndex !== firstIndex) {
      this.setState({
        currentIndex: prevIndex,
        translate: prev
      })
    } else {
      this.setState({
        currentIndex: lastIndex,
        translate: 370 * lastIndex
      })
    }
  }

  render() {
    return(
      <Container>
        <LeftArrow onClick={this.previousHome}><Image src="https://img.icons8.com/android/24/000000/back.png"/></LeftArrow>
        <HomesDisplay>
          <HomeContainer translate={this.state.translate}>
            {this.props.homes.map(home => {
              console.log(home);
              return (
                <HomeCard key={home.id}>
                  <PictureCarousel images={home.images} home={home}/>
                  <TitleInfo home={home}/>
                </HomeCard> )
            })}
          </HomeContainer>
        </HomesDisplay>
        <RightArrow onClick={this.nextHome}><Image src="https://img.icons8.com/android/24/000000/forward.png"/></RightArrow>
      </Container>
    )
  }
}

export default HomeCarousel;

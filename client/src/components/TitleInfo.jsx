import React from 'react';
import styled from 'styled-components';

const TitleCard = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Montserrat',
});

const Top = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
  height: '30px'
});

const Top2 = styled.div({
  display: 'flex'
})

const Middle = styled.div({
  display: 'flex',
  justifyContent: 'left',
  height: '25px',
  fontSize: '16px'
});

const Bottom = styled.div({
  display: 'flex',
  justifyContent: 'left'
});

const StyledP = styled.p`
  font-family: 'Montserrat:300';
  color: 'grey';
`;

class TitleInfo extends React.Component {
  render () {
    const current = this.props.home;
    return (
      <TitleCard>
        <Top>
          <p style={{color: 'grey'}}>{current.category} - {current.bedcount} beds</p>
          <Top2>
            <p><i className="glyphicon glyphicon-star" style={{color: 'red'}}></i>{current.rating}</p>
            <p style={{color: 'grey'}}>({current.reviewcount})</p>
          </Top2>
        </Top>
        <Middle>
          <p>{current.title}</p>
        </Middle>
        <Bottom>
          <p><strong style={{fontSize: '20px'}}>${current.price}</strong> / night</p>
        </Bottom>
      </TitleCard>
    )
  }
}

export default TitleInfo;

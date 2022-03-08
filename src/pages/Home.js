import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled/macro';

const Title = styled.h1`
  text-align: center;
  padding: 10px;
`;

const CandyImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

const Description = styled.h2`
  text-align: center;
  padding-top: 40px;
  margin-bottom: 20px;
`;

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-top: 25px;
`;

function Home() {
  return (
    <div>
	  <Header></Header>
      <Title>Welcome to the Penny Candy Store</Title>
      <CandyImage src="https://wallpapercave.com/uwp/uwp2063551.jpeg" alt="" width="50%"/>
      <Description>This is your one-stop shop to fulfilling all of your candy cravings.</Description>
	  <FooterContainer>
        <Footer></Footer>
      </FooterContainer>
	</div>
  );
}

export default Home;
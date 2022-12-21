import { createClient } from '../prismicio';
import Homepage from '../components/Homepage';
import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import Vimeo from '@u-wave/react-vimeo';

const Home = (props) => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isTrailerPaused, setIsTrailerPaused] = useState(false);

  return (
    <StyledTrailerPage isTrailerPlaying={isTrailerPlaying}>
      {isTrailerPlaying ? (
        <div className="video-container">
          <Vimeo
              video={'764818684'}
              autoplay
              responsive
              showTitle
              onPause={() => {
                console.log('Hello')
                setIsTrailerPaused(true)
              }}
            />
        </div>
      ) : (
      <div className="trailer-container">
        <div className="background"></div>
        <div className="pool-container">
          <div className="pool" onClick={(e) => {
            setIsTrailerPlaying(!isTrailerPlaying)
            setIsTrailerPaused(false)
          }}></div>
          <div className="indication"></div>
        </div>
        <div className="content">
          <div className="text">
            <h1>Agua Sucia</h1>
            <strong>Pecado y Liberación</strong>
          </div>
        </div>
      </div>
      )}
      {!isTrailerPaused && (
        <div className="to-gallery">
          <Link href="/gallery">Ir a la galería</Link>
        </div>
      )}
    </StyledTrailerPage>
  )
}

export async function getStaticProps() {
  const client = createClient()

  const page = await client.getSingle('homepage');
  const videoPosts = await client.getAllByType('video-post');
  return {
    props: {
      page: page,
      videoPosts: videoPosts
    }
  }
}

const poolWidth = '40vw'

const StyledTrailerPage = styled.main`
  padding: ${(props) => (props.isTrailerPlaying ? '0rem' : '2rem')};
  height: 100vh;
  background: ${(props) => (props.isTrailerPlaying ? 'black' : 'white')};
  display: flex;
  .video-container {
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
    margin: auto 0;
    iframe {
      max-height: 100vh;
    }
  }
  .trailer-container {
    width: 100%;
    height: 100%;
    position: relative;
    background: black;
    .background {
      background-image: url('./prision.png');
      width: 100%;
      height: 100%;
      background-position: center bottom;
      background-size: cover;
      position: relative;
      z-index: 1;
    }
    .pool-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      .pool {
        width: ${poolWidth};
        height: calc(${poolWidth} / 5);
        position: absolute;
        background-image: url('./Pileta.png');
        /* background-color: black; */
        bottom: calc(${poolWidth} - 25vw);
        left: calc(50vw - (${poolWidth} / 2) - 2rem);
        z-index: 10;
        background-size: 40vw;
        background-repeat: no-repeat;
        background-position: bottom center;
        transition: 0.2s ease-in-out filter;
        cursor: pointer;

        &:hover {
          filter: drop-shadow(0 0 30px white);
        }
      }
    }
    
    .content {
      position: absolute;
      display: flex;
      z-index: 2;
      flex-direction: column;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      z-index: 20;
      pointer-events: none;
      .text {
        margin-bottom: auto;
        margin-top: 20vh;
        text-align: center;
      }
      h1 {
        color: hsl(54deg 90% 49%);
        font-family: 'Bell';
        font-weight: normal;
        text-transform: uppercase;
        font-size: 8vw;
        text-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      strong {
        text-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-size: 2.4vw;
        font-family: 'Bell';
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.5vw;
      }
    }
  }
  .to-gallery {
      position: absolute;
      top: 4rem;
      right: 4rem;
      z-index: 20;
      background: black;
      padding: 1rem;
      background: hsl(54deg 90% 49%);
      a {
        color: black;
        font-family: 'Bookos';
        text-decoration: none;
      }
    }
`;

export default Home;
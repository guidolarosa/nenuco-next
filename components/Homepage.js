import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styled from 'styled-components';
import Vimeo from '@u-wave/react-vimeo';
import { useEffect, useState } from 'react';
import { RxInfoCircled } from 'react-icons/rx';

const Homepage = (props) => {
  const [videoID, setVideoID] = useState('764818684');
  const [infoHidden, setInfoHidden] = useState(true);

  useEffect(() => {
    if (props.selectedVideoPostData) {
      setVideoID(props.selectedVideoPostData.data.video_id[0].text);
    }
  }, [props.selectedVideoPostData]);


  return (
    <StyledHomepage>
      <Head>
        <title>{props.page.data.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/horse.png" />
      </Head>
      <header>
        <Link href="/">
          <div className="header-image">
            <Image src="/nenuco.png" alt="Nenuco" width="260" height="80"/>
            <Image src="/horse.png" alt="Nenuco" width="80" height="80"/>
          </div>
        </Link>
      </header>
      <main>
        <section className="vimeo-container">
          {props.showInfo && props.selectedVideoPostData && (
            <div className={`vimeo-info`}>
              <div 
                className="info-trigger" 
                onClick={(e) => {
                  setInfoHidden(!infoHidden)
                }}
              >
                <RxInfoCircled color="white"/>
              </div>
              <div 
                className={`info-content ${infoHidden ? 'hidden' : ''}`}
              >
                <h2>
                  {props.selectedVideoPostData.data.title1}
                </h2>
                <p className="subtitle">
                  {props.selectedVideoPostData.data.year[0].text}
                  {props.selectedVideoPostData.data.format[0].text && (
                    <>
                      <span> - </span>
                      {props.selectedVideoPostData.data.format[0].text}
                    </>
                  )}
                </p>
                <p className="description">
                  {props.selectedVideoPostData.data.details[0].text}
                </p>
                <p>
                  <strong>Producción:</strong> {props.selectedVideoPostData.data.production[0].text}
                </p>
                <p>
                  <strong>Cliente:</strong> {props.selectedVideoPostData.data.client[0].text}
                </p>
                <p>
                  <strong>Duración:</strong> {props.selectedVideoPostData.data.episodes[0].text}
                </p>
              </div>
            </div>
          )}
          <div className="vimeo-loading"></div>
          <Vimeo
            video={videoID}
            // autoplay
            responsive
            showTitle
            onReady={() => {
              document.querySelector('.vimeo-loading').classList.add('hidden');
            }}
          />
          {props.selectedVideoPostData && (
            <section className="vimeo-mobile-info">
              <h2>
                {props.selectedVideoPostData.data.title1}
              </h2>
              <p className="subtitle">
                {props.selectedVideoPostData.data.year[0].text}
                <span> - </span>
                {props.selectedVideoPostData.data.format[0].text}
              </p>
              <p className="description">
                {props.selectedVideoPostData.data.details[0].text}
              </p>
              <p>
                <strong>Producción</strong> {props.selectedVideoPostData.data.production[0].text}
              </p>
              <p>
                <strong>Cliente:</strong> {props.selectedVideoPostData.data.client[0].text}
              </p>
              <p>
                <strong>Duración:</strong> {props.selectedVideoPostData.data.episodes[0].text}
              </p>
            </section>
          )}
        </section>
        {props.showTrailerBanner && (
          <Link href="/">
            <section className="featured-banner">
              <h2>AGUA SUCIA</h2>
              <p>Mirá el trailer</p>
            </section>
          </Link>
        )}
        <section className="video-gallery">
          {/* <h2>Galería</h2> */}
          <ul>
            {props.videoPosts.map((e, i) => {
              return (
                <StyledVideoPostLink href={e.uid} key={i} colorDominant={e.data.color_dominant}>
                  <li 
                    style={{
                      backgroundImage: `url(${e.data.thumbnail.url})`
                    }}
                    className="video-thumbnail"
                  >
                  </li>
                </StyledVideoPostLink>
              )
            })}
          </ul>
        </section>
      </main>
      <footer>
          {/* <h2 className="team-title">¿QUÉ HACEMOS?</h2>
          <p className="footer-copy">
            Hacemos <strong>cine</strong> y <strong>TV</strong>,  tanto <strong>documentales</strong> como <strong>ficción</strong>, institucionales y contenidos web, desarrollando ideas y conceptos o brindando servicios para terceros.
          </p> */}
          {/* <h2 className="team-title">Team Nenuco</h2> */}
          <section className="team">
            <div className="team-member">
              <strong>Guillermo Ruiz</strong>
              <p>Producción Ejecutiva / Guión</p>
            </div>
            <div className="team-member">
              <strong>Diego Crespo</strong>
              <p>Dirección / Realización / Guión</p>
            </div>
          </section>
          <section className="contact">
            <a href="mailto:contacto@nenuco.com">contacto@nenuco.com</a>
          </section>
          <section className="copyright">
            Nenuco. Copyright { new Date().getFullYear() }
          </section>
      </footer>
    </StyledHomepage>
  )
};

Homepage.defaultProps = {
  showTrailerBanner: true
}

const StyledVideoPostLink = styled(Link)`
  li {
    list-style: none;
    display: flex;
    text-align: center;
    height: 340px;
    justify-content: center;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
    transition: 0.15s ease-in-out all;
    position: relative;
    &:hover {
      opacity: 1 !important;
      /* box-shadow: 0 0 20px 2px ${props => props.colorDominant}; */
      border: 3px solid ${props => props.colorDominant};
      transform: scale(1.05);
      z-index: 2;
    }
    &:active {
      transform: scale(1);
      transition-duration: 0;
    }
    @media screen and (max-width: 720px) {
      height: 70vh;
    }
  }
`

const StyledHomepage = styled.div`
  header,
  main,
  footer {
    max-width: 1020px;
    margin: 0 auto;
    @media screen and (max-width: 1040px) {
      max-width: calc(100% - 36px);
    }
  }
  header {
    margin: 2rem auto;
    .header-image {
      display: flex;
      justify-content: center;
    }
  }
  main {
    .vimeo-container {
      margin-bottom: 2rem;
      /* border-radius: 0.5rem; */
      position: relative;
      overflow: hidden;
      .vimeo-mobile-info {
        margin-top: 2rem;
        background: rgba(255,255,255,0.1);
        padding: 1rem;
        display: none;
        @media screen and (max-width: 720px) {
          display: block;
        }
        h2 {
          font-size: 2rem;
        }
        p {
          margin-bottom: 1.2rem;
          line-height: 1.8rem;
          font-size: 0.9rem;
        }
      }
      .vimeo-info {
        position: relative;
        z-index: 5;
        @media screen and (max-width: 720px) {
          display: none;
        }
        .info-trigger,
        .info-content {
          position: absolute;
        }
        .info-content {
          transition: 0.2s ease-in-out all;
          top: 1rem;
          left: 1rem;
          z-index: 5;
          width: 50%;
          min-width: 320px;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          height: auto;
          padding: 1rem;
          border-radius: 0.5rem;
          &.hidden {
            pointer-events: none;
            opacity: 0;
            top: 3rem;
          }
          h2 {
            font-size: 2rem;
            margin-bottom: 0.25rem;
          }
          p {
            margin-bottom: 0.5rem;
            line-height: 1.6rem;
            font-size: 1rem;
          }
          .subtitle {
            opacity: 0.5;
            margin-bottom: 1rem;
          }
          .description {
            margin-bottom: 2rem;
          }
        }
        .info-trigger {
          top: 2rem;
          right: 2rem;
          cursor: pointer;
          svg {
            width: 2rem;
            height: 2rem;
          }
        }
      }
      .vimeo-loading {
        position: absolute;
        z-index: 2;
        background: black;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &.hidden {
          pointer-events: none;
          opacity: 0;
        }
      }
    }
    .featured-banner {
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: center;
      font-family: 'Bookos';
      color: black;
      border-radius: 0.25rem;
      background-image: url('./prision.png');
      background-position: center;
      position: relative;
      &:hover {
        &:after {
          opacity: 1;
        }
      }
      &:after {
        position: absolute;
        content: '';
        top: -3px;
        left: -3px;
        width: calc(100%);
        height: calc(100%);
        pointer-events: none;
        border-radius: 0.5rem;
        border: 3px solid hsl(54deg 90% 49%);
        opacity: 0;
        transition: 0.2s ease-in-out all;
      }
      &:hover {
        opacity: 1 !important;
        /* box-shadow: 0 0 20px 2px ${props => props.colorDominant}; */
        /* border: 3px solid hsl(54deg 90% 49%); */
        /* transform: scale(1.05); */
        z-index: 2;
      }
      &:active {
        transform: scale(1);
        transition-duration: 0;
      }
      @media screen and (max-width: 720px) {
        height: 20rem;
      }
      h2 {
        color: hsl(54deg 90% 49%);
        margin-bottom: 0rem;
        font-size: 4rem;
        font-weight: 200;
        font-family: 'Bell';
        text-shadow: 3px 5px 10px rgba(0,0,0,0.3);
        @media screen and (max-width: 720px) {
          font-size: 3rem
        }
      }
      p {
        text-shadow: 0 0px 10px rgba(0,0,0,0.3);
        color: white;
        font-size: 1.4rem;
        letter-spacing: 0.3rem;
        text-transform: uppercase;
        @media screen and (max-width: 720px) {
          font-size: 1.2rem
        }
      }
    }
    .video-gallery {
      margin-bottom: 10rem;
      margin-top: 7rem;
      @media screen and (max-width: 720px) {
        margin-top: 3rem;
      }
      h2 {
        font-size: 5rem;
        margin-bottom: 2rem;
        font-weight: 800;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
        @media screen and (max-width: 720px) {
          font-size: 3rem;
        }
      }
      &:hover {
        li {
          opacity: 0.5;
        }
      }
      ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 1rem;
        grid-row-gap: 1.5rem;
        flex-wrap: wrap;
        @media screen and (max-width: 720px) {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  footer {
    padding-bottom: 5rem;
    .footer-copy {
      font-size: 2rem;
      margin: 0 0 10rem;
      line-height: 3rem;
      opacity: 0.7;
      @media screen and (max-width: 720px) {
        font-size: 1.8rem;
      }
    }
    .team-title {
      font-size: 5rem;
      /* opacity: 0.7; */
      margin-bottom: 2rem;
      font-weight: 800;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      @media screen and (max-width: 720px) {
        font-size: 3rem;
      }
    }
    .team {
      display: flex;
      margin: 2rem 0 8rem;
      justify-content: space-between;
      @media screen and (max-width: 720px) {
        flex-direction: column;
        margin: 0 0 2rem;
      }
      .team-member {
        padding: 2rem;
        border: 3px solid hsl(54deg 90% 49%);
        width: calc(50% - 1rem);
        border-radius: 0.5rem;
        background: hsla(54deg 90% 49% / 20%);
        @media screen and (max-width: 720px) {
          width: 100%;
          margin-bottom: 2rem;
        }
        strong {
          font-size: 2rem;
        }
        p {
          opacity: 0.7;
        }
      }
    }
    .contact a {
      color: hsl(54deg 90% 49%);
    }
    .contact,
    .copyright {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }
  }
`;

export default Homepage;
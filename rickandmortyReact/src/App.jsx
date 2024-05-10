import { useState, useEffect, useRef } from 'react';
import './App.css';
const baseurl= `https://rickandmortyapi.com/api/character?page=`


function App() {
  const [personajes, setPersonajes] = useState([]);
  const [index, setIndex]= useState(1);
  const [location, setlocation] = useState([]);
  const [episodes, setepisodes] = useState([]);
  const refpage= useRef(1);
  const[info, setinfo] = useState([]);
  const[showalert,setalert] = useState(false);
  const  ErrorPage=()=>{  
function returntofirst(){
setIndex(1) 
      
  
  
  
}
  return(
  <div>
  <img  src='https://i.blogs.es/669147/ram-s6-key--rt-1920x1080/1366_2000.jpeg' className='rickerrorimage'/>
  <div>
  <p>!Ocurrio un error inesperado¡ Vuelve al inicio   </p>
  <button onClick={returntofirst}>Volver a la ultima pagina</button>
  
  
  </div>
  
  
  
  </div>
  )
  }
  const Indexbutton = ({ name, action }) => {
    return (
      parseInt(name) > 42 || parseInt(name) < 1 ? (
        ''
      ) : (
        <div
          onClick={action}
          style={{
            backgroundColor: name === refpage.current.toString() ? 'blue' : 'white',
            color: name === refpage.current.toString() ? 'white' : 'black'
          }}
          className='bottompage'
        >
          {name}
        </div>
      )
    );
  };
  
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=` + refpage.current)
      .then((data) => data.json())
      .then((info) => setPersonajes(info.results));
  }, []); 
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((data) => data.json())
      .then((information) => setinfo(information.info));
  }, []);
  const handlePageChange = (page) => {
    if(page>42){
     return(
      setindex(4)


     )
    }
    else{
    refpage.current = page;
    // Volver a ejecutar la lógica dependiente de refpage
    fetch(`${baseurl}${page}`)   
      .then((data) => data.json())
      .then((info) => setPersonajes(info.results));
    }
  };
  const handleAlertSearch = (event) => {
    event.preventDefault();
    const value = event.target[0].value;
    if (!isNaN(value) && parseInt(value) > 0 && parseInt(value) <= 42) {
      fetch(baseurl + value)
        .then((data) => data.json())
        .then((info) => setPersonajes(info.results));
        refpage.current= value
        setalert(false);
        event.target[0].value = "";
    } else {
      alert('Por favor, ingresa un número válido entre 1 y 42');
      event.target[0].value = "";
      
    }
    
  };

  const AlertDialog = () => {
    return (
      <div className='alert'>
        <h1>Buscar página</h1>
        <form onSubmit={handleAlertSearch}>
          <input type="text" pattern="\d*" placeholder="Solo números" />
          <button type="submit">Buscar</button>
        </form>
      </div>
    );
  };
  function fetchlocation(){
    setIndex(2)
    fetch("https://rickandmortyapi.com/api/location/").then(data=> data.json()).then(locations=> setlocation(locations.results))


  }
  function fetchepisodes(){
    setIndex(3)
    fetch("https://rickandmortyapi.com/api/episode").then(data=> data.json()).then(episode=> setepisodes(episode.results))


  }
  
  const Locationpage=()=>{
    function alertlocation(){
      setalert(true)


    }
    function searchLocation(event) { 
      event.preventDefault();
      const characterName = event.target[0].value;
      if(characterName.length>1){
      fetch("https://rickandmortyapi.com/api/location/?name=" + characterName)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al buscar personaje");
          }
          return response.json();
        })
        .then((data) => {
          if (data.results.length === 0) {
            setIndex(4)
          } else {
            setlocation (data.results);
            console.log(data.results.length)
          }
        })
        .catch((error) => {
          console.error("Error al buscar personaje:", error);
          setIndex(4);
        });
    }
    else{
      


    }
  }
   
  
    return(
      <>
      <div  style={{justifyContent:"initial", display:"flex"}}>



      </div>
        <div style={{ justifyContent: 'end', display: 'flex' }}>
        <form onSubmit={searchLocation}>
          <input type="text" placeholder='Busca la localización' />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <p  style={{justifyContent:"end", display:"flex", fontWeight:"bold", }}>Página: {refpage.current} de { info.pages}</p>
    <ul className='rickandlist'>
        {location.map((localization) => (
          <li className='rickandelement' key={localization.id}>
            <div  className='cardelement'>
            <h2>{localization.name}</h2>
            <div style={{backgroundColor:'white',borderRadius:'20px'}}>
           <h3  style={{color:'black'}}> {localization.dimension}</h3>
           <div style={{ display: 'flex', alignItems: 'center' ,padding: ' 0', margin:'0'}}>    
  <p style={{ color: 'grey', paddingInline:'4px ' }}>Type:</p>
  <p style={{ color: 'black', fontWeight: 'bold', paddingInline:'10px  '   }}>{localization.dimension}</p>
          </div>

           
            </div>

            </div>
          </li>
        ))}
      </ul>
     
      </>
      )
  }
  const Listpage=()=>{
    function searchpage(){
      setalert(true)


    }
    function searchCharacter(event) {
      event.preventDefault();
      const characterName = event.target[0].value;
      if(characterName.length>1){
      fetch("https://rickandmortyapi.com/api/character/?name=" + characterName)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al buscar personaje");
          }
          return response.json();
        })
        .then((data) => {
          if (data.results.length === 0) {
            setIndex(4)
          } else {
            setPersonajes(data.results);
            console.log(data.results.length)
          }
        })
        .catch((error) => {
          console.error("Error al buscar personaje:", error);
          setIndex(4);
        });
    }
    else{
      


    }
  }
   
  
    return(
      <>
      <div  style={{justifyContent:"initial", display:"flex"}}>



      </div>
        <div style={{ justifyContent: 'end', display: 'flex' }}>
        <form onSubmit={searchCharacter}>
          <input type="text" placeholder='Busca tu personaje' />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <p  style={{justifyContent:"end", display:"flex", fontWeight:"bold", }}>Página: {refpage.current} de { info.pages}</p>
    <ul className='rickandlist'>
        {personajes.map((personaje) => (
          <li className='rickandelement' key={personaje.id}>
            <div  className='cardelement'>
            <img  className="imgcharacter"src={personaje.image} alt={personaje.name} />
            <div style={{backgroundColor:'white',borderRadius:'20px'}}>
           <h3  style={{color:'black'}}> {personaje.name}</h3>
           <div style={{ display: 'flex', alignItems: 'center' ,padding: ' 0', margin:'0'}}>    
  <p style={{ color: 'grey', paddingInline:'4px ' }}>Status:</p>
  <p style={{ color: 'black', fontWeight: 'bold', paddingInline:'10px  '   }}>{personaje.status}</p>
  <div className='circle' style={{backgroundColor: personaje.status==='Alive' ? 'green' : personaje.status==='Dead' ? 'red' : 'gray' , width:'10px',height:'10px', borderRadius:'50%'}} ></div>
</div>
<div style={{ display: 'flex', alignItems: 'center' ,padding: ' 0',margin:'0'} }>    
  <p style={{ color: 'grey', paddingInline:'4px ',margin:'4px' }}>Especie:</p>
  <p style={{ color: 'black', fontWeight: 'bold', paddingInline:'10px  ',    }}>{personaje.species}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' ,padding: ' 0',margin:'0'}}>    
  <p style={{ color: 'grey', paddingInline:'4px ',margin:'4px' }}>Origin:</p>
  <p style={{ color: 'black', fontWeight: 'bold', paddingInline:'10px  '    }}>{personaje.origin.name}</p>
        </div>

           
            </div>

            </div>
          </li>
        ))}
      </ul>
      <footer>
      <div style={{display:'flex',justifyContent:'center'}}>
          <h2> Pagina {refpage.current} de {info.pages}</h2>
          </div>
       <div style={{display:'flex',justifyContent:'center'}}>  
      {info.prev===null ? '': <button   className='backbutton'> {info.prev}  </button>}
          {refpage.current>=1  ? <Indexbutton name={(refpage.current -1 )} action={()=> handlePageChange(refpage.current-1)}/> : ''}       
          <Indexbutton name={(refpage.current)} action={() => handlePageChange(refpage.current)} />
          <Indexbutton name={(refpage.current + 1)} action={() => handlePageChange(refpage.current + 1)} />
          <Indexbutton name={(refpage.current + 2)} action={() => handlePageChange(refpage.current + 2)} />
          <Indexbutton name={(refpage.current + 3)} action={() => handlePageChange(refpage.current + 3)} />
          {refpage.current === 42|| refpage.current === 41 || refpage.current === 40|| refpage.current === 39 ? '' : <Indexbutton name={info.pages} action={() => handlePageChange(info.pages)} />}

        </div> 
        <button onClick={searchpage}>Buscar Página</button>
      </footer>
      </>
      )
  }
  const EpisodePage=()=>{
    return(
      <>
      <ul className='rickandlist'>
      {episodes.map((episode)=>(
        <li key={episode.id} >
               <div style={{backgroundColor:'white',borderRadius:'20px'}} className=''>
            <h2 style={{color:"black"}}>{episode.episode}</h2>
            <h3 style={{color:"black"}}>{episode.name}</h3>
            <p style={{color:"black"}}>{episode.air_date}</p>
            
            </div>






        </li>
      ))
      }


      </ul>
      </>

    )

  }

  return (
    <>
     <div className="topnav">
  <ul>
    <li>
      <img
        src="https://app.quizhouse.com/_next/image?url=http%3A%2F%2Fstatic.quizhouse.co%2Fimages%2FBys1kivvb.png&w=128&q=100"
        alt="Logo"
      />
    </li>
    <li>
      <button onClick={fetchepisodes}>Episodios</button>
    </li>
    <li>
      <button onClick={()=>setIndex(1)}>Personajes  </button>
    </li>
    <li>
      <button onClick={fetchlocation}>Lugares</button>
    </li>
  </ul>
</div>

      {index===4 ? <h1>¡Wubba lubba dub dub! Algo Salio mal! </h1>: <h1 style={{paddingTop :"30px"}}>Rick And Morty API</h1>}
      {showalert && <AlertDialog/>}
      {index===1 ? <Listpage/> : index===2 ? <Locationpage/> :  index===3 ? <EpisodePage/> : index===4 ? <ErrorPage/> : <Listpage/>}
    
    </>
  );
  
}

export default App;

import './App.css';
import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Axios from "axios";
import {Button, TextField, Paper, Chip} from "@mui/material"
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Container } from '@mui/system';
import TestTimeline from './components/TimeLine';



function App() {
  const [values, setValues] = useState ([])
  const [listaValores, setlistaValores] = useState ([])

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }))
  }
  const date = new Date()
  const ano = String(date.getFullYear())
  const mes = String(date.getMonth())
  const dia = String(date.getDate())
  
  const dataConv = `${ano}-${mes}-${dia}`

  const handleClickButton = () => {
    Axios.post("http://127.0.0.1:8000/pesquisa",{
      texto: values.texto,
      data: dataConv,
      classificacao_nps: 0,
      valor_nps: 0,
    }).then((response)=>{
      handleAnalise()
      console.log(response) 
    });
  }

  const handleAnalise = () => {
    Axios.post("http://127.0.0.1:8000/analisar",{
    }).then((response)=>{
      console.log(response)
      LoadData()
    })
  }


const LoadData = async() =>{
    try{
      await Axios.get("http://127.0.0.1:8000/pesquisa").then((response) => {
      console.log(response.data)
      setlistaValores(response.data)
    })} catch(err){
      console.error(err);
    } 
    }

    useEffect(() => {
      LoadData();
     }, [] )
  return (
    <>
    <box>
      <Paper>

      </Paper>
    </box>

    <Container Width='500'>
    <Box sx={{ display: 'flex', flexDirection: 'column' , textAlign: 'center'}}>
      <h1>FBAN - Feedback Anônimo</h1>
      <Box sx={{ alignItems: 'center', justifyContent: 'center'}}>
        <TextField
        fullWidth     
        id="outlined-name"       
        name="texto" 
        placeholder="digite seu texto" 
        onChange={handleChangeValues}  
        />
      
        <Button 
         sx={{
          marginTop: '10px',
          width: '300px' 
        
        }}
         variant="contained" 
         onClick={()=> handleClickButton()}
         >
           Enviar
        </Button> 
      </Box>    
      
      <Paper
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 2,
          }}
          component="ul"
          >
            
              {listaValores.map( (lista) => {
                let icon;
                let color;
                
                if (lista.sentimento === 'positivo'){
                    icon = <SentimentSatisfiedAltIcon />
                    color = 'primary'
                }
                if (lista.sentimento === 'neutro'){
                    icon = <SentimentSatisfiedIcon />
                    
                }
                if (lista.sentimento === 'negativo'){
                    icon = <SentimentVeryDissatisfiedIcon />
                    color = 'secondary'
                } 
                
                return(
                  
                  <ListItem key={lista.texto}>
                    <Paper sx={{
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        width: '300px',
                        p: 1,
                        m: 2,
                      }}>
                      <Chip 
                      color={color}
                        icon={icon}
                        label={lista.texto}
                      />                

                    <TestTimeline color={color} color2={color} sentimento={lista.sentimento} data={lista.data}  />
                    </Paper> 
                  </ListItem>
                )
              })}
              
      </Paper>       
      </Box>
      </Container>
    </>  
  );
}

export default App;


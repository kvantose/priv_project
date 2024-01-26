import './App.css'
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[400],
  },
}));


function App() {
  return (
    <>
      <div className='container'>
        <div className='outline-rec'>
          <div className='main-rec'>
            <div className='content'>
              <TextField sx={{ input: { color: "white", fontSize: "26px" }}} 
                         variant='standard' label="ФИО:" 
                         color="warning" className='main-placeholder' focused />
              
              <div className='btn-container'>
                <ColorButton variant="contained" className='btn'>
                  Генерировать код
                </ColorButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

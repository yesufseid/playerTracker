"use client"
import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Tabs, Tab, TextField,Button , CircularProgress } from "@mui/material";
import Loading from "../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";

type PlayerProps={
  id:string
  name:string
  start_time:string
  duration:number
  shoe_number:number
}


export default function StatusPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {AllPlayers,error,loading,Terror,hasMore,newCursor,Tloading,dailyData,weeklyData} = useSelector((state: RootState) => state.Allplayer);
  const [tab, setTab] = useState(0);
  const [price, setPrice] = useState(200);
  const [tryAgain,setTray]=useState(false)
  useEffect(() => {
    dispatch({ type: "players/fetchandSetStatus",payload:{limit:3,cursor:newCursor}});
  }, [dispatch]);
   const HandlerMoreData=async()=>{
    dispatch({ type: "players/fetchandAddStatus",payload:{limit:3,cursor:newCursor}});
   }

  const handlePriceChange = (event:any) => {
    setPrice(event.target.value);
  };

  const calculateRevenue = (data:any[]) => {
    const totalDuration = data.reduce((sum, d:PlayerProps) => sum + d.duration, 0);
    return totalDuration * price
  };
  const formatDate = (isoDate:string) => {
    const date = new Date(isoDate);
  
    return date.toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi', // GMT+3
      hour12: true, // 12-hour format
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  return (
    <div className="flex flex-col items-center  bg-gray-100 min-h-screen">
    <Container className="lg:max-w-4xl p-0 m-0">
      <div className="md:px-5">
      <Typography variant="h4" gutterBottom  sx={{ marginTop: 2 ,color: 'black'} }>
        Player Status
      </Typography>

      <TextField
        label="Price per Player"
        variant="outlined"
        fullWidth
        type="number"
        value={price}
        onChange={handlePriceChange}
        sx={{ marginBottom: 2 }}
      />
</div>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
        <Tab label="Daily Status" />
        <Tab label="Weekly Status" />
        <Tab label="All Players" />
      </Tabs>

      {tab === 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{color: 'black' }}>
            Daily Revenue: ${calculateRevenue(dailyData)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Total Players:{dailyData.length}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Shoe Number</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyData.map((player:PlayerProps) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.shoe_number}</TableCell>
                    <TableCell>{formatDate(player.start_time)}</TableCell>
                    <TableCell>{player.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tab === 1 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ color: 'black'}}>
            Weekly Revenue: ${calculateRevenue(weeklyData)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Total Players:{weeklyData.length}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Shoe Number</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklyData.map((player:PlayerProps) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.shoe_number}</TableCell>
                    <TableCell>{formatDate(player.start_time)}</TableCell>
                    <TableCell>{player.duration}</TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
            {tab === 2 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Total Players:{AllPlayers.length}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Shoe Number</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AllPlayers.map((player:PlayerProps) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.shoe_number}</TableCell>
                    <TableCell>{formatDate(player.start_time)}</TableCell>
                    <TableCell>{player.duration}</TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {loading && <Loading />}
      {error && <div className='md:w-[500px] mx-auto w-full h-full text-black flex flex-col justify-center items-center '>
      <h2 className='font-bold font-serif my-20 '>Something went wrong!</h2>
      <button className='mt-5  py-2 px-3 border-2 border-green-600 hover:bg-green-600 rounded-xl'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => setTray((prev)=>!prev)
        }
      >
        Try again
      </button>
    </div>}
    {hasMore && tab===2 &&
    <Button
      onClick={()=>HandlerMoreData()}
      variant="contained"
      color="primary"
      sx={{
        mt: 2,
        width: "200px",
        display: "flex",
        justifyContent: "center",
        gap: 1,
        fontWeight: "bold",
        borderRadius: "8px",
        textTransform: "none", // Keeps normal text casing
      }}
      disabled={loading}
    >
      {Tloading ? <CircularProgress size={24} color="inherit" /> : "Load More"}
    </Button> }
    </Container>
    </div>
  );
}

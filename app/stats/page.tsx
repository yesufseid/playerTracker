"use client"
import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, TextField } from "@mui/material";
import dayjs from "dayjs";
import { GetStatus } from "../lib";
import Loading from "../component/Loading";

type PlayerProps={
  id:string
  name:string
  start_time:string
  duration:number
  shoe_number:number
  created_at:string
}


export default function StatusPage() {
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [tab, setTab] = useState(0);
  const [price, setPrice] = useState(200);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [tryAgain,setTray]=useState(false)

  useEffect(()=>{
    const handler=async()=>{
      setError(false)
        setLoading(true)
        const data:any=await GetStatus()
        if(data.length >= 0){
          setError(false)
          setLoading(false) 
          filterData(data); 
        }else{
          setLoading(false) 
           setError(true)
        }
    }
    handler()
  },[tryAgain])
  const filterData = (data: PlayerProps[]) => {
    const today = new Date();
  
    // Convert local 6:00 AM to UTC (3:00 AM UTC)
const startOfToday = new Date(today);
startOfToday.setUTCHours(3, 0, 0, 0); // 6:00 AM EAT = 3:00 AM UTC
const startOfDayISO = startOfToday.toISOString();
  
  // End of the "custom day" (5:59 AM the next day in EAT = 2:59 AM UTC)
  const endOfDay = new Date(startOfToday);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);  // Move to next day
  endOfDay.setUTCHours(2, 59, 59, 999);  // 5:59 AM EAT = 2:59 AM UTC
  const endOfDayISO = endOfDay.toISOString();
  
    // Start of the week on Sunday at 6:00 AM (EAT) (converted to 3:00 AM UTC)
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay()); // Set to Sunday
    const startOfWeekISO = startOfWeek.toISOString()
  
    // Filter daily data (created after 6:00 AM today and before 6:00 AM tomorrow EAT)
    const dailyData:any = data.filter((player: PlayerProps) => {
      const createdAt = new Date(player.created_at);
      return createdAt >= new Date(startOfDayISO) && createdAt < new Date(endOfDayISO);
    });
  
    // Filter weekly data (created after 6:00 AM Sunday EAT)
    const weeklyData:any = data.filter((player: PlayerProps) => {
      const createdAt = new Date(player.created_at);
      return createdAt >= new Date(startOfWeekISO);
    });
  
    setDaily(dailyData);
    setWeekly(weeklyData);
  };
  
  

  const handlePriceChange = (event:any) => {
    setPrice(event.target.value);
  };

  const calculateRevenue = (data:any[]) => {
    const totalDuration = data.reduce((sum, d:PlayerProps) => sum + d.duration, 0);
    return totalDuration * price
  };

  return (
    <div className="flex flex-col items-center  bg-gray-100 min-h-screen">
    <Container className="md:max-w-4xl p-0 m-0">
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
      </Tabs>

      {tab === 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{color: 'black' }}>
            Daily Revenue: ${calculateRevenue(daily)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Total Players:{daily.length}
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
                {daily.map((player:PlayerProps) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.shoe_number}</TableCell>
                    <TableCell>{dayjs(player.start_time).format("YYYY-MM-DD HH:mm")}</TableCell>
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
            Weekly Revenue: ${calculateRevenue(weekly)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Total Players:{weekly.length}
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
                {weekly.map((player:PlayerProps) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.shoe_number}</TableCell>
                    <TableCell>{dayjs(player.start_time).format("YYYY-MM-DD HH:mm")}</TableCell>
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
    </Container>
    </div>
  );
}

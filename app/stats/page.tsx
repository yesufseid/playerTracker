"use client"
import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, TextField } from "@mui/material";
import dayjs from "dayjs";
import { GetStatus } from "../lib";
import Loading from "../component/Loading";




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
        const data=await GetStatus()
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
  const filterData = (data:[]) => {
    const today = dayjs().startOf("day");
    const startOfWeek = dayjs().startOf("week");

    const dailyData = data.filter((player) => dayjs(player.start_time).isSame(today, "day"));
    const weeklyData = data.filter((player) => dayjs(player.start_time).isAfter(startOfWeek));

    setDaily(dailyData);
    setWeekly(weeklyData);
  };

  const handleTabChange = (event,newValue) => {
    setTab(newValue);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const calculateRevenue = (data:[]) => {
    const totalDuration = data.reduce((sum, d) => sum + d.duration, 0);
    return totalDuration * parseFloat(price);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <Container>
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

      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Daily Status" />
        <Tab label="Weekly Status" />
      </Tabs>

      {tab === 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{color: 'black' }}>
            Daily Revenue: ${calculateRevenue(daily)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Total Players: ${daily.length}
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
                {daily.map((player) => (
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
            Total Players: ${weekly.length}
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
                {weekly.map((player) => (
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

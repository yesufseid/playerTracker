import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <CircularProgress />
    </div>
  );
};

export default Loading;

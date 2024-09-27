import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeIntervaltoggle from './Components/TimeIntervaltoggle';
import ChartComponent from './Components/ChartComponent';
import CoinToggle from './Components/CoinToggle';
import 'animate.css';


function App() {
  const [coin, setCoin] = useState('ETHUSDT');
  const [interval, setInterval] = useState('1m');
  const [chartData, setChartData] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [wsInstance, setWsInstance] = useState(null);

  useEffect(() => {
    if (wsInstance) {
      wsInstance.close(); 
    }

    if (!isRunning || !coin) return;

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin.toLowerCase()}@kline_${interval}`);

    ws.onopen = () => console.log(`WebSocket connected to ${coin}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candlestick = {
        time: data.k.t,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
      };

      const existingData = JSON.parse(localStorage.getItem(coin)) || [];

      setChartData((prevData) => {
        const updatedData = [...existingData, candlestick];
        
        localStorage.setItem(coin, JSON.stringify(updatedData));
        
        return updatedData;
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    setWsInstance(ws);

    return () => {
      ws.close(); 
    };
  }, [coin, interval, isRunning]);

  const handleCoinChange = (selectedCoin) => {
    setIsRunning(true);
    setCoin(selectedCoin.toUpperCase());

    // Retrieve previous data from localStorage when switching coins
    const previousData = JSON.parse(localStorage.getItem(selectedCoin.toUpperCase())) || [];
    setChartData(previousData);
  };

  const handleTimeIntervalChange = (selectedInterval) => {
    setIsRunning(true);
    setInterval(selectedInterval);

    setChartData([]);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (wsInstance) wsInstance.close(); 
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Binance Market Data</h1>
        <div className="row">
          {/* Left Panel */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 animate__animated animate__fadeInLeft">
              <div className="card-body">
                <h5 className="card-title">Select Cryptocurrency</h5>
                <CoinToggle onChangeCoin={handleCoinChange} />
              </div>
            </div>
            <div className="card shadow-sm p-3 mb-4 animate__animated animate__fadeInLeft" style={{marginTop: "100px"}}>
              <div className="card-body">
                <h5 className="card-title">Select Time Interval</h5>
                <TimeIntervaltoggle onChangeInterval={handleTimeIntervalChange} />
              </div>
            </div>
            <button
              className="btn btn-danger btn-lg btn-block animate__animated animate__pulse animate__infinite"
              onClick={handleStop}
              disabled={!isRunning}
              style={{marginTop: "150px", marginLeft: "30px"}}
            >
              Stop Data Feed
            </button>
          </div>
          
          <div className="col-md-8">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded animate__animated animate__fadeInRight">
              <div className="card-body">
                <h5 className="card-title text-center">Live Chart for {coin}</h5>
                <ChartComponent chartData={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

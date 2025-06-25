import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Smartphone, File, CheckCircle, Laptop, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';

// Define available device types for cross-functional transfers
const DEVICE_TYPES = [
  { name: 'Smartphone', icon: Smartphone },
  { name: 'Tablet', icon: Tablet },
  { name: 'Laptop', icon: Laptop },
];

const MOCK_DATA_TYPES = [
  { name: 'Contacts', size: 5 },   // in MB
  { name: 'Calendar Events', size: 2 },
  { name: 'Photos', size: 65 },
  { name: 'Videos', size: 120 },
  { name: 'Documents', size: 8 },
];

const TOTAL_SIZE = MOCK_DATA_TYPES.reduce((acc, curr) => acc + curr.size, 0);

const TransferProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('Initializing...');
  const [transferredSize, setTransferredSize] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [eta, setEta] = useState('Calculating...');
  const [isComplete, setIsComplete] = useState(false);
  const [devices, setDevices] = useState<{ source: React.ElementType, destination: React.ElementType, sourceName: string, destinationName: string } | null>(null);

  // Randomly select source and destination devices on mount to simulate cross-device transfer
  useEffect(() => {
    const getRandomDevice = () => DEVICE_TYPES[Math.floor(Math.random() * DEVICE_TYPES.length)];
    const source = getRandomDevice();
    let destination = getRandomDevice();

    // Ensure they are different devices for a better "cross-functional" demo
    if (DEVICE_TYPES.length > 1) {
      while (destination.name === source.name) {
        destination = getRandomDevice();
      }
    }

    setDevices({
      source: source.icon,
      destination: destination.icon,
      sourceName: source.name,
      destinationName: destination.name,
    });
  }, []);

  useEffect(() => {
    console.log('TransferProgressTracker loaded');
    let currentDataIndex = 0;
    let sizeOfCurrentCategoryTransferred = 0;
    let totalTransferred = 0;

    const interval = setInterval(() => {
      if (currentDataIndex >= MOCK_DATA_TYPES.length) {
        clearInterval(interval);
        setIsComplete(true);
        setProgress(100);
        setCurrentCategory('All data transferred!');
        setSpeed(0);
        setEta('0s');
        return;
      }

      const currentItem = MOCK_DATA_TYPES[currentDataIndex];
      setCurrentCategory(`Transferring ${currentItem.name}...`);

      const randomChunk = Math.random() * 2 + 3; // Simulate transferring 3-5 MB per tick
      sizeOfCurrentCategoryTransferred += randomChunk;
      totalTransferred += randomChunk;

      if (sizeOfCurrentCategoryTransferred >= currentItem.size) {
        totalTransferred += currentItem.size - sizeOfCurrentCategoryTransferred; // Correct overflow
        sizeOfCurrentCategoryTransferred = 0;
        currentDataIndex++;
      }

      const newProgress = Math.min((totalTransferred / TOTAL_SIZE) * 100, 100);
      const currentSpeed = (Math.random() * 5 + 15).toFixed(1); // Simulate speed between 15-20 MB/s
      const remainingSize = TOTAL_SIZE - totalTransferred;
      const calculatedEta = remainingSize > 0 ? Math.round(remainingSize / parseFloat(currentSpeed)) : 0;
      
      setProgress(newProgress);
      setTransferredSize(Math.min(totalTransferred, TOTAL_SIZE));
      setSpeed(parseFloat(currentSpeed));
      setEta(`${calculatedEta}s`);

    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, []);

  const SourceIcon = devices?.source;
  const DestinationIcon = devices?.destination;

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {isComplete ? 'Transfer Complete' : 'Transfer in Progress'}
        </CardTitle>
        <CardDescription className="text-center">
          {isComplete
            ? `Your data has been moved to your new ${devices?.destinationName.toLowerCase() || 'device'}.`
            : devices
            ? `Moving data from your ${devices.sourceName.toLowerCase()} to your new ${devices.destinationName.toLowerCase()}.`
            : 'Your data is being securely moved to your new device.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {isComplete ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center h-48">
            <CheckCircle className="w-20 h-20 text-green-500" />
            <p className="text-lg font-medium">Successfully transferred all selected data!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center space-x-4">
              {SourceIcon ? <SourceIcon className="w-12 h-12 text-gray-500" /> : <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}
              <div className="flex-grow h-px bg-gray-200 relative overflow-hidden">
                <motion.div
                  className="absolute top-1/2 -mt-2"
                  animate={{ x: [0, 180, 0] }} // Adjust '180' based on component width if needed
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <File className="w-4 h-4 text-blue-500" />
                </motion.div>
              </div>
              {DestinationIcon ? <DestinationIcon className="w-12 h-12 text-gray-500" /> : <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}
            </div>

            <div className="space-y-2 text-center">
              <p className="font-semibold text-blue-600 dark:text-blue-400">{currentCategory}</p>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 pt-1">
                <span>{progress.toFixed(1)}%</span>
                <span>{transferredSize.toFixed(1)} / {TOTAL_SIZE} MB</span>
              </div>
            </div>

            <div className="flex justify-around text-center border-t pt-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
                <p className="font-bold text-lg">{speed.toFixed(1)} MB/s</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Est. Time Remaining</p>
                <p className="font-bold text-lg">{eta}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransferProgressTracker;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DevicePairingCard from '@/components/DevicePairingCard';
import DataTypeSelector from '@/components/DataTypeSelector';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const TransferSetupPage = () => {
  console.log('TransferSetupPage loaded');
  const navigate = useNavigate();
  const [step, setStep] = useState<'pairing' | 'confirming' | 'selection'>('pairing');
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [pairingInfo, setPairingInfo] = useState<{ url: string; pin: string } | null>(null);

  // Generate a unique pairing session URL and PIN on mount
  useEffect(() => {
    // Generate a unique session ID for the QR code
    const sessionId = crypto.randomUUID();
    // Generate a user-friendly PIN for manual entry
    const pin = `${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    setPairingInfo({
      url: `https://datamover.app/pair?session=${sessionId}`,
      pin: pin
    });
  }, []);

  // Simulate pairing confirmation after a delay to mimic a real connection process
  const handlePairingComplete = () => {
    setStep('confirming');
    setTimeout(() => {
      setStep('selection');
    }, 2000); // 2-second delay for simulation
  };

  // Automatically trigger the pairing completion after a delay to simulate a real scan and connection
  useEffect(() => {
    if (step === 'pairing' && pairingInfo) {
      const timer = setTimeout(() => {
        handlePairingComplete();
      }, 7000); // 7-second delay to simulate user scanning the code

      return () => clearTimeout(timer);
    }
  }, [step, pairingInfo]);


  const handleBeginTransfer = () => {
    // In a real app, you might pass the selectedDataTypes to the next page via state
    console.log('Starting transfer for:', selectedDataTypes);
    navigate('/transfer-status'); // Navigate to the path defined in App.tsx
  };

  const renderStepContent = () => {
    switch (step) {
      case 'pairing':
        return (
          <motion.div
            key="pairing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >
            {pairingInfo ? (
              <DevicePairingCard pairingUrl={pairingInfo.url} pairingPin={pairingInfo.pin} />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                 <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                 <p className="mt-4 text-lg font-medium">Generating secure session...</p>
              </div>
            )}
            <div className="mt-8 text-center text-muted-foreground">
              <p className="font-medium">Waiting for device to connect...</p>
              <p className="text-sm">(This will happen automatically)</p>
            </div>
          </motion.div>
        );
      case 'confirming':
        return (
          <motion.div
            key="confirming"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-8 flex flex-col items-center justify-center h-96"
          >
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium">Connecting devices...</p>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </motion.div>
        );
      case 'selection':
        return (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <DataTypeSelector onSelectionChange={setSelectedDataTypes} />
            <div className="mt-8 text-center">
              <Button size="lg" onClick={handleBeginTransfer} disabled={selectedDataTypes.length === 0}>
                {selectedDataTypes.length === 0 ? "Select Data to Continue" : `Begin Transfer of ${selectedDataTypes.length} Categories`}
              </Button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-background">
      <Header />
      <main className="flex-1 w-full container mx-auto flex items-center justify-center py-12 px-4">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default TransferSetupPage;
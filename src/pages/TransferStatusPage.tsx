import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Component
import TransferProgressTracker from '@/components/TransferProgressTracker';

// shadcn/ui Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// lucide-react Icons
import { CheckCircle, Rocket } from 'lucide-react';

const TransferStatusPage: React.FC = () => {
  console.log('TransferStatusPage loaded');

  const [isTransferComplete, setIsTransferComplete] = useState(false);

  // The TransferProgressTracker component simulates its own completion.
  // We'll use a timeout here to simulate waiting for that process to finish
  // before showing page-level "next step" options.
  // The internal simulation of the tracker takes about 10-12 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransferComplete(true);
    }, 12000); // Wait 12 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-lg space-y-8">
          {/* The main progress tracking component */}
          <TransferProgressTracker />

          {/* This section appears after the transfer is marked as complete */}
          {isTransferComplete && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Transfer Successful!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Your data has been securely migrated. You can view the details in your transfer history.
                </AlertDescription>
              </Alert>

              <Card className="p-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild className="w-full sm:w-auto">
                    <Link to="/history">View History</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link to="/transfer-setup">
                      <Rocket className="mr-2 h-4 w-4" />
                      Start Another Transfer
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TransferStatusPage;
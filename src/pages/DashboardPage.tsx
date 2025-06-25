import React from 'react';
import { useNavigate } from 'react-router-dom';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Icons
import { Rocket, Info } from 'lucide-react';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleStartTransfer = () => {
    // Navigate to the transfer setup page as defined in App.tsx
    navigate('/transfer-setup');
  };

  // For this example, we'll assume the user is new and has no active transfers.
  // A more complex implementation would fetch transfer status here.
  const hasActiveTransfer = false;
  const recentTransfers: any[] = [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl space-y-8">
          {hasActiveTransfer ? (
            // This block would show if a transfer is currently active.
            // For now, we are showing the new user view.
            <Card>
              <CardHeader>
                <CardTitle>Transfer in Progress</CardTitle>
                <CardDescription>An existing data transfer is underway.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Your data is currently being moved. You can view the status below.</p>
                <Button onClick={() => navigate('/transfer-status')} className="mt-4">
                  View Progress
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Main call-to-action card for new users or users without active transfers.
            <Card className="text-center shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome to DataMover</CardTitle>
                <CardDescription>Ready to move your data to a new device? Let's get started.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 p-6">
                <Rocket className="w-24 h-24 text-primary" />
                <p className="max-w-md text-muted-foreground">
                  Click the button below to begin the secure process of pairing your devices and selecting the data you wish to transfer.
                </p>
                <Button size="lg" onClick={handleStartTransfer}>
                  Start New Transfer
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Section for recent transfer history */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Transfer History</AlertTitle>
            <AlertDescription>
              {recentTransfers.length > 0 ? (
                "Your most recent transfers are listed here."
              ) : (
                "You have no transfer history yet. Completed transfers will appear here."
              )}
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
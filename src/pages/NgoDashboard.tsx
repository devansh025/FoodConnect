import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NgoDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("available");
  
  const handleReservation = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The reservation system is under development.",
    });
  };
  
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">NGO Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg">Welcome back, NGO Name</p>
        <Button 
          onClick={() => window.location.href = "/browse"}
          className="bg-connect-green-500 hover:bg-connect-green-600"
        >
          Browse Available Food
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="reserved">Reserved</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Donations</CardTitle>
              <CardDescription>Food donations available for reservation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-gray-500">
                No available donations at the moment. Check back soon or browse all listings.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reserved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reserved Donations</CardTitle>
              <CardDescription>Food donations you have reserved for pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-gray-500">
                No reserved donations yet.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>NGO Profile</CardTitle>
              <CardDescription>Manage your organization details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Organization Name</p>
                  <p className="text-gray-500">Your NGO Name</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-500">ngo@example.com</p>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-500">456 Help Street, City, Country</p>
                </div>
                <div className="pt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NgoDashboard;

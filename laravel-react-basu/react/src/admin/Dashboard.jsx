import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Grid, Paper, Button } from "@mui/material";
import {
  ArchiveBoxArrowDownIcon,
  BookmarkSquareIcon,
  InboxArrowDownIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import {
  getOnServiceShuttles,
  getOnStandShuttles,
  getRegisteredDrivers,
  getRegisteredShuttles,
  getRegisteredStudents,
} from "../axios";

export default function Dashboard() {
  const [registeredShuttles, setRegisteredShuttles] = useState("loading");
  const [registeredDrivers, setRegisteredDrivers] = useState("loading");
  const [registeredStudents, setRegisteredStudents] = useState("loading");
  const [onServiceShuttles, setOnServiceShuttles] = useState("loading");
  const [onStandShuttles, setOnStandShuttles] = useState("loading");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const onServiceCount = await getOnServiceShuttles();
      const onStandCount = await getOnStandShuttles();
      const shuttleCount = await getRegisteredShuttles();
      const driversCount = await getRegisteredDrivers();
      const studentsCount = await getRegisteredStudents();

      setRegisteredShuttles(shuttleCount);
      setRegisteredDrivers(driversCount);
      setRegisteredStudents(studentsCount);
      setOnServiceShuttles(onServiceCount);
      setOnStandShuttles(onStandCount);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const animatedDiv = (children, delay) => (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-400 to-indigo-300 p-4 py-10">
      <div className="mx-auto px-4 lg:px-0 lg:max-w-6xl">
        <div className="bg-white bg-opacity-90 rounded-lg p-8">
          {animatedDiv(
            <Paper elevation={10} className="rounded-lg p-4">
              <h2 className="font-mono text-yellow-700 text-2xl font-bold text-center mb-4">
                RESERVATION TABLES
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    INQUIRED RESERVATIONS
                  </h2>
                  <p>Content for the first column goes here...</p>
                </Paper>
                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    ANSWERED RESERVATIONS
                  </h2>
                  <p>Content for the second column goes here...</p>
                </Paper>
              </div>
            </Paper>,
            0
          )}

          {animatedDiv(
            <Paper elevation={10} className="rounded-lg p-4">
              <h2 className="font-mono text-orange-700 text-2xl font-bold text-center mb-4 under">
                SHUTTLE MANAGEMENT
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    REGISTERED SHUTTLES
                  </h2>
                  <p className="text-6xl text-center text-blue-500 font-mono font-extrabold">
                    {registeredShuttles}
                  </p>
                  <div className="flex justify-center mt-2">
                    <div className="text-center text-xs font-mono text-gray-400 ">
                      This are the amount of <br /><b>Registered</b> Shuttles
                    </div>
                  </div>
                </Paper>
                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    SHUTTLE ON-SERVICE
                  </h2>
                  <p className="text-6xl text-center text-blue-500 font-mono font-extrabold">
                    {onServiceShuttles}
                  </p>
                  <div className="flex justify-center mt-2">
                  <div className="text-center text-xs font-mono text-gray-400 ">
                      This are the amount of <br /><b>Available</b> Shuttles
                    </div>
                  </div>
                </Paper>
                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    SHUTTLE ON-STAND BY
                  </h2>
                  <p className="text-6xl text-center text-blue-500 font-mono font-extrabold">
                    {onStandShuttles}
                  </p>
                  <div className="flex justify-center mt-2">
                  <div className="text-center text-xs font-mono text-gray-400 ">
                      This are the amount of <br /><b>Unavailable</b> Shuttles
                    </div>
                  </div>
                </Paper>
              </div>
            </Paper>,
            0.2
          )}

          {animatedDiv(
            <div className="mx-5 my-5">
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Button
                    variant="contained"
                    color="success"
                    href="/reservation"
                    endIcon={<BookmarkSquareIcon className="h-6 w-6" />}
                    fullWidth
                    className="mb-4"
                  >
                    RESERVATION TABLE
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Button
                    variant="contained"
                    color="success"
                    href="/shuttle/storage"
                    endIcon={<InboxArrowDownIcon className="h-6 w-6" />}
                    fullWidth
                    className="mb-4"
                  >
                    SHUTTLE TABLE
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Button
                    variant="contained"
                    color="success"
                    href="/users"
                    endIcon={<KeyIcon className="h-6 w-6" />}
                    fullWidth
                    className="mb-4"
                  >
                    ACCOUNT TABLE
                  </Button>
                </Grid>
              </Grid>
              <p className="text-center text-sm text-slate-400 mt-2">
                Quick Links
              </p>
            </div>,
            0.4
          )}

          {animatedDiv(
            <Paper elevation={10} className="rounded-lg p-4">
              <h2 className="font-mono text-blue-700 text-2xl font-bold text-center mb-4 under">
                ACCOUNT DASHBOARD
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    TOTAL REGISTERED DRIVERS
                  </h2>
                  <p className="text-6xl text-center text-blue-500 font-mono font-extrabold">
                    {registeredDrivers}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-center mt-4 pt-4">
                    <TButton
                      className="text-center mb-2 lg:mr-2 lg:mb-0"
                      color="blue"
                    >
                      Driver List
                      <ArchiveBoxArrowDownIcon className="h-6 w-6 ml-4" />
                    </TButton>
                    <TButton className="text-center" color="indigo">
                      Print Details
                      <ArchiveBoxArrowDownIcon className="h-6 w-6 ml-4" />
                    </TButton>
                  </div>
                </Paper>

                <Paper elevation={3} className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 font-mono text-center">
                    TOTAL REGISTERED STUDENTS
                  </h2>
                  <p className="text-6xl text-center text-blue-500 font-mono font-extrabold">
                    {registeredStudents}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-center mt-4 pt-4">
                    <TButton
                      className="text-center mb-2 lg:mr-2 lg:mb-0"
                      color="indigo"
                    >
                      Student List
                      <ArchiveBoxArrowDownIcon className="h-6 w-6 ml-4" />
                    </TButton>
                    <TButton className="text-center" color="blue">
                      Print Details
                      <ArchiveBoxArrowDownIcon className="h-6 w-6 ml-4" />
                    </TButton>
                  </div>
                </Paper>
              </div>
            </Paper>,
            0.6
          )}

          {animatedDiv(
            <Paper elevation={10} className="rounded-lg p-4">
              <Button variant="contained" color="primary" className="w-full">
                Print Analytics
              </Button>
            </Paper>,
            0.8
          )}
        </div>
      </div>
    </div>
  );
}

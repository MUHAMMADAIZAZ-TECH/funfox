import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion } from "framer-motion";


export default function TaskDetails() {
    const { task } = useSelector((state) => state.task);
  
    const formattedCreatedAt = moment(task.createdAt).format("YYYY-MM-DD HH:mm:ss");
    const formattedUpdatedAt = moment(task.updatedAt).format("YYYY-MM-DD HH:mm:ss");
  
    const cardVariants = {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    };
  
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Title: {task.title}</Typography>
            <Typography>Group: {task.Group}</Typography>
            <Typography>Created At: {formattedCreatedAt}</Typography>
            <Typography>Description: {task.description}</Typography>
            <Typography>Status: {task.status ? "Completed" : "Incomplete"}</Typography>
            <Typography>Updated At: {formattedUpdatedAt}</Typography>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  

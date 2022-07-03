const express = require("express");
const app = express ();
const PORT = 3000; 
const path = require('path');
const controller = require("./controller")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//route to get doctors 
app.get('/doctors', controller.getDoctors, (req,res,next) => {
    res.status(200).json(res.locals.doctors);
})

//route to get appointments 

app.get('/appointments', controller.getAppointments, (req,res,next) => {
    res.status(200).json(res.locals.appointments);
})

// route to delete appointments s
app.delete('/appointments/delete/:appt_id', controller.deleteAppointment, controller.getAppointments, (req, res, next) => {
    res.status(200).json(res.locals);
  });


// route to add new appointment 
app.post('/appointments/post', controller.getAppointments, controller.postAppointment, controller.getAppointments,  (req, res, next) => {
    res.status(200).json(res.locals);
  });


/**
 * 404 handler
 */
 app.use('*', (req, res) => {
    res.status(404).send('Not Found');
  });
  
  /**
   * Global error handler
   */
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });

//start server 
app.listen(PORT, () => {
    console.log (`Server listening on port ${PORT}...`)
}  )
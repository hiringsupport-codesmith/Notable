const db = require('./dbModel')

const controller = {};


// fetch doctors 

controller.getDoctors= (req, res, next) => {
  
    const query = `SELECT * FROM doctors`;
    db.query(query)
      .then(doctors => {
        res.locals.doctors = doctors.rows;
        return next();
      })
      .catch(err => {
        next({
          log: `controller.getDoctors: ERROR: ${err}`,
          message: { err: `Error in controller.getDoctors` }
        });
      });
  }

// fetch all appointments that belong to a particular doctor on a particular day. 

controller.getAppointments = (req, res, next) => {
    let doctorId;
    const { _id } = res.locals.doctors;
    doctorId = _id;
    const {date} = req.body.date;
    
    const query = `SELECT * FROM appointment WHERE doctorId = $1 AND date = $2`;
    const params = [ doctorId, date];
    db.query(query, params)
      .then(appointments => {
        res.locals.appointments = appointments.rows;
        return next();
      })
      .catch(err => {
        next({
          log: `controller.getAppointments: ERROR: ${err}`,
          message: { err: `Error in controller.getAppointments` }
        });
      });
  }

  // delete an existing appointment 

  controller.deleteAppointment = (req, res, next) => {
    const remove = `DELETE FROM appointment WHERE id=$1;`;
    const deleteId = [req.params.id];
  
    db.query(remove, deleteId)
      .then(() => {
        return next();
      })
      .catch((err) => {
      console.log("Error found in controller.deleteAppointment");
      return next(err);
      });
  };

  // add a new appointment 

  controller.postAppointment = (req, res, next) => {
    
    // manipulate time to 15 min interval 
    let time;
    const {date} = req.body.date;
    const minutes = 15; 
    const ms = 1000 * 60 * minutes 

    time = date(Math.ceil(date.getTime()/ms) *ms)


    const addAppointmentQuery = `INSERT INTO appointment (firstName, lastName, time, kind) VALUES ($1, $2, $3, $4)`;
    const params = [req.body.firstName, req.body.lastName, time, req.body.kind];
    db.query(addAppointmentQuery, params)
      .then(() => {
        return next();
      })
      .catch((err) => {
        console.log("Error found in controller.postAppointment");
        return next(err);
      });
    };



  module.exports = controller;
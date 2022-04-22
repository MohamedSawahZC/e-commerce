module.exports=(err, req, res, next) => {
    for (let e in err.errors) {
      res.status(500).send("Internat Server Error");
    }
   }
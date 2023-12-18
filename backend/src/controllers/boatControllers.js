const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await tables.boat.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const coordX = req.body.coord_x;
  const coordY = req.body.coord_y;

  try {
    const updateBoat = await tables.boat.update();
    if (
      id === 0 &&
      updateBoat.affectedRows === 0 &&
      coordX === 0 &&
      coordY === 0
    ) {
      res.sendStatus(404);
    } else {
      res.status(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  edit,
};

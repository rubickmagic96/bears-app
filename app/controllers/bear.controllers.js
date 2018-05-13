var Bear = require('../models/bear.model.js');

exports.create = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(404).send({
      message: "Name and age cannot be empty"
    });
  }

  var bear = new Bear();
  bear.name = req.body.name;
  bear.age = req.body.age;

  /* another way to define a model with request value */
  /*
  const bear = new Bear({
    name: req.body.name,
    age: req.body.age
  });
  */

  bear.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occur when create a bear"
    });
  });

  /* another way to save the bear that has bean define */
  /*
  bear.save((err) => {
    if (err)
      res.send(err);
    res.json({message: "Bear created!"});
  });
  */
}

exports.getAll = (req, res) => {
  Bear.find().then(bears => {
    res.send(bears);
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occur when show all the bear"
    })
  });

  /* another way to get all the bears */
  /*
  Bear.find((err, bears) {
    if (err)
      res.send(err);
    res.json(bears);
  });
  */
}

exports.get = (req, res) => {
  Bear.findById(req.params.bearId).then(bear => {
    if (!bear) {
      return res.status(404).send({
        message: "Bear not found with id "+req.params.bearId
      });
    }
    res.send(bear);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Bear not found with id "+req.params.bearId
      });
    }
    return res.status(500).send({
      message: "Error getting a bear with id "+req.params.bearId
    });
  });

  /* another way to get a bear */
  /*
  Bear.findById(req.params.bearId, (err, bear) => {
    if (err)
      res.send(err);
    res.json(bear);
  });
  */
}

exports.update = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(404).send({
      message: "Name and age of bear cannot be empty. Try again!"
    });
  }

  Bear.findByIdAndUpdate(req.params.bearId, {
    name: req.body.name,
    age: req.body.age
  }, {new: true}).then(bear => {
    if (!bear) {
      return res.status(404).send({
        message: "Bear not found with id "+req.params.bearId
      });
    }
    res.send(bear);
  }).catch(err => {
    if (err === 'ObjectId') {
      return res.status(404).send({
        message: "Bear not found with id "+req.params.bearId
      });
    }
    return res.status(500).send({
      message: "An error occur when updating the bear with id"+req.params.bearId
    });
  });

  /* another way to update the bear */
  /*
  Bear.findById(req.params.bearId, (err, bear) => {
    if (err)
      res.send(err);

    bear.name = req.body.name;
    bear.age = req.body.age;

    bear.save((err) => {
      if (err)
        res.send(err);
      res.json({message: "Bear updated!"});
    });
  });
  */
}

exports.delete = (req, res) => {
  Bear.findByIdAndRemove(req.params.bearId).then(bear => {
    if (!bear) {
      return res.status(404).send({
        message: "Bear not found with id "+req.params.bearId
      });
    }
    res.send({message: "The bear is deleted!"})
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name ==='NotFound') {
      return res.status(404).send({
        message: "Bear not found with id "+req.params.bearId
      });
    }
    return res.status(500).send({
      message: "Some error occur when delete a bear with id "+req.params.bearId
    });
  });

  /* another way to delete the bear */
  /*
  Bear.remove({
    _id: req.params.bearId
  }, (err, bear) => {
    if (err)
      res.send(err);
    res.json({message: "Successfully deleted"});
  });
  */
}

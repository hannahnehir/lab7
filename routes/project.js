var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);


  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newProject = new models.Project({
    "title": form_data["project_title"],
    "date": form_data["date"],
    "summary": form_data["summary"],
    "image": form_data["image_url"]
  });

  newProject.save(afterSaving);

  function afterSaving(err) {
    if(err) console.log(err);
    res.send();
  }  
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterDelete);

  function afterDelete(err) {
    if(err) console.log(err);
    res.send();
  }
}
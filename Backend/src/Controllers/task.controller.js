import taskModel from "../Models/task";

const taskCtrl = {};

taskCtrl.getTasks = async (req, res) => {
  let tasks = await taskModel.find({user: req.params.id});
  res.status(200).json(tasks);
};

taskCtrl.getTaskById = async (req, res) => {
  let task = await taskModel.findById(req.params.id);
  res.status(200).json(task);
};

taskCtrl.changeSate = async (req, res) => {
  console.log(req.body)
  await taskModel.update({_id: req.params.id}, req.body)
  res.status(200).json({
    msg: "Tarea actualizada",
  });
}

taskCtrl.register = async (req, res) => {
  const { name, description, user } = req.body;
  const newTask = new taskModel({
    name,
    description,
    state: false,
    user,
  });
  await newTask.save();
  res.status(200).json({
    msg: "Tarea registrado",
  });
};

export default taskCtrl;

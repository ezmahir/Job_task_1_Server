const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const count = await Task.countDocuments({ category: category });
    const task = new Task({ title, description, category, order: count });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({category: 1, order: 1});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, category, order } = req.body;
    const task = await Task.findById(req.params.id);

    if(!task){
      return res.status(404).json({message: "Task not found"});
    }

    if(category && category !== task.category){
        await Task.updateMany(
            { category: task.category, order: { $gt: task.order } },
            { $inc: { order: -1 } }
        );

        const count = await Task.countDocuments({ category: category });
        await Task.findByIdAndUpdate(req.params.id, {order: count});

        task.category = category;
    }

    if(order !== undefined && task.category === category){
        if(order > task.order){
            await Task.updateMany(
                { category: task.category, order: { $gt: task.order, $lte: order } },
                { $inc: { order: -1 } }
            );
        } else if (order < task.order){
            await Task.updateMany(
                { category: task.category, order: { $gte: order, $lt: task.order } },
                { $inc: { order: 1 } }
            );
        }
        task.order = order;
    }

    if(title) task.title = title;
    if(description) task.description = description;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.updateMany(
        { category: task.category, order: { $gt: task.order } },
        { $inc: { order: -1 } }
    );
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const db              = require('../core/db');
const Op              = db.Sequelize.Op;

exports.getAllPost    = async (req, res) => {
  const title = req.query.title;

  try {
    const results = await db.posts.findAll({
      where: title ? { title: { [Op.like]: `%${title}%`}} : null
    });
    console.log(results);
    res.status(200).json({
      message: 'berhasil',
      results
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: err.message ? err.message : 'Server Error'
    });
  }
}

exports.createPost    = async (req, res) => {
  const {
    title,
    description,
    published
  } = req.body;

  if(!title || !description) {
    return res.status(400).json({
      message: "Form can't be empty"
    });
  }

  const data = {
    title,
    description,
    published: published ? true : false
  };

  try {
    const result = await db.posts.create(data);
    console.log(result);
    return res.status(200).json({
      message: 'berhasil'
    })
  } catch(err) {
    throw new Error(err);
  }
}

exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    // const result = await db.posts.findOne({ where: { id } });
    const result = await db.posts.findByPk(id);
    res.status(200).json({
      message: 'berhasil',
      result
    });
  } catch(err) {
    res.status(500).json({
      message: err.message ? err.message : 'Server Error'
    });
  }
}
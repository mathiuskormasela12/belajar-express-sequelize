const db              = require('../core/db');

exports.getAllPost    = (req, res) => {
  res.json({
    message: "Hello World"
  });
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
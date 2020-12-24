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

exports.updatePost   = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.posts.update(req.body, { where: { id }});
    
    if(result[0] === 1) {
      res.json({
        message: `Berhasil update post dengan id ${id}`
      });
    } else {
      res.status(200).json({
        message: `Gagal update post dengan id ${id}`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error update post dengan id ${id}`
    });
  }
}

exports.deleteAllPost = async (req, res) => {
  /* 
    truncate berfungsi untuk mengarit index
    dari data yg akan dihapus akan dimulai dari 
    berapa ketika kita menambah data baru.

    contoh sebelum dihapus table user punya
    data sbb :
    [
      {
        id: 1,
        nama: "Mathius"
      },
      {
        id: 2,
        nama: "Arka"
      }
    ]

    lalu ketika semua data pada table usernya dihapus
    dengan menggunakan truncate true dan saat 
    kita menambah data baru lagi kedalam
    table user dengan data sbb :
    [
      {
        nama: "Reza"
      },
      {
        nama: "Kiko"
      }
    ]

    ketika masuk kedalam database jadinya seperti ini :
    [
      {
        id: 1,
        nama: "Reza"
      },
      {
        id: 2,
        nama: "Kiko"
      }
    ]

    kali di hapus dengan truncate false, maka hasil dari
    penambahan data baru lagi adalah sbb :
    [
      {
        id: 3,
        nama: "Reza"
      },
      {
        id: 4,
        nama: "Kiko"
      }
    ]
  */
  try {
    const result = await db.posts.destroy({
      where: {},
      truncate: true
    });
    
    if(result == 0) {
      res.json({
        message: `Berhasil hapus semua post`
      });
    } else {
      res.json({
        message: `Gagal hapus semua post`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error hapus semua post`
    });
  }
}

exports.getAllPublished = async (req, res) => {
  console.log('masuk')
  try {
    const result = await db.posts.findAll({
      where: { published: true }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: 'server error'
    })
  }
}

exports.deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.posts.destroy({
      where: { id }
    });
    console.log(result)
    if(result === 1) {
      res.json({
        message: `Berhasil hapus post dengan id ${id}`
      });     
    } else {
      res.json({
        message: `Gagal hapus post`
      });
    }
  } catch (error) {
    res.json({
      message: `Error hapus post`
    });
    
  }
}
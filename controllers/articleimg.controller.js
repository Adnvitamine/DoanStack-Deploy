const db = require("../models");
const Articleimg = db.articleimg;
const Op = db.Sequelize.Op;

// Function create a new article image

// CREATE AND SAVE a article image
exports.create = (req, res) => {
    // Validate request


// Create a articleimg
const articleimg = {
  path: req.body.path,
  author_id: req.body.author_id,
  article_id: req.body.article_id
};

// Save articleimg in the database
    Articleimg.create(articleimg)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Articleimg."
        });
    });

};

// FIND A SINGLE PRODUCTIMG WITH AN ID
exports.findOne = (req, res) =>{
    const id = req.params.id;

    Articleimg.findByPk(id).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || `Error retrieving a articleimg with the specified id = ${id}`
        });
    });
};


// RETRIEVE ALL PRODUCTS FROM DATABASE
exports.findAll = (req,res) =>{

    const name = req.query.name;
    var condition = name ? { name: {[Op.iLike]: `%${name}`}} : null;
  
    
    Articleimg.findAll({ 
                where: condition
            })
            .then(data => {
                res.send(data);
                
            })
            .catch(err=>{
                res.status(500).send({
                     message: err.message || "Some error occured while retrieving articleimgs!"
                });
            });
};


//FIND ALL PRODUCT WITH A SPECIFIED Author Id
exports.findAllByAuthorId = (req, res)=>{

    const author = req.params.id;

    Articleimg.findAll({
        where: { author_id: author_id}
    }).then(data=>{
        res.send(data);
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Error retrieving all the articleimgs with Vendor_id=${vendor_id}`
        });
    });
};

//FIND ALL PRODUCT WITH A SPECIFIED article Id
exports.findAllByArticleId = (req, res)=>{

    const article_id = req.params.id;

    Articleimg.findAll({
        where: { article_id: article_id}
    }).then(data=>{
        res.send(data);
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Error retrieving all the articleimgs with Vendor_id=${vendor_id}`
        });
    });
};

// UPDATE A PRODUCT WITH A SPECIFIED ID
exports.update = (req, res) =>{

    const id = req.params.id;

    Articleimg.update(req.body, {
        where: { id: id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message: "Articleimg was updated succesfully"
            });
        }
        else{
            res.send({
                message: `Cannot update Articleimg with id=${id}`
            });
        }
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Could not delete Articleimg with id ${id}`
        });
    });
    
};


// DELETE A PRODUCT WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) =>{
    const id = req.params.id;

    Articleimg.destroy({
        where:  { id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Articleimg was deleted successfully"
            });
        }
        else{
            res.send({
                message: `Cannot delete Articleimg with the specified id=${id}`
            });
        }
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Could not delete Articleimg with id=${id}`
        });
    });
};

// DELETE ALL PRODUCTS FROM DATABASE
exports.deleteAll = (req, res) =>{
    Articleimg.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} Articleimg were deleted successfully`
        });
    }).catch(err=>{
        res.status(300).send({
            message: err.message || `Some errors occured when deleting all the articleimgs`
        });
    });
};